// ============================================================
// Abacus Studio — Collaborative Backend Server
// Real-time room-based synchronization via Socket.IO
// ============================================================

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    pingInterval: 10000,
    pingTimeout: 5000
});

// Serve static files from the project root (index.html, app.js, style.css)
app.use(cors());
app.use(express.static(path.join(__dirname, '..')));

// ---- Room Storage ----
const rooms = new Map();
// Room structure:
// {
//   code: string,
//   teacherId: string | null,
//   teacherName: string,
//   students: Map<socketId, { name }>,
//   state: {
//     beadsState: [],
//     rodCount: 7,
//     abacusValue: 0,
//     sessionState: null,     // full session info broadcast by teacher
//     scrollPercent: 0
//   },
//   createdAt: number,
//   lastActivity: number
// }

// ---- Helper: Generate 6-char room code ----
function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No O/0/1/I to avoid confusion
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Ensure uniqueness
    if (rooms.has(code)) return generateRoomCode();
    return code;
}

// ---- Cleanup expired rooms (every 10 mins) ----
const ROOM_TTL = 2 * 60 * 60 * 1000; // 2 hours
setInterval(() => {
    const now = Date.now();
    for (const [code, room] of rooms) {
        if (now - room.lastActivity > ROOM_TTL) {
            // Disconnect everyone in the room
            io.in(code).emit('room-expired', { message: 'Room expired due to inactivity.' });
            io.in(code).socketsLeave(code);
            rooms.delete(code);
            console.log(`[Cleanup] Room ${code} expired.`);
        }
    }
}, 10 * 60 * 1000);

// ---- Socket.IO Events ----
io.on('connection', (socket) => {
    console.log(`[Connect] ${socket.id}`);
    let currentRoom = null;
    let currentRole = null;

    // ---- CREATE ROOM ----
    socket.on('create-room', ({ name }, callback) => {
        // Leave any existing room first
        if (currentRoom) leaveCurrentRoom(socket);

        const code = generateRoomCode();
        const room = {
            code,
            teacherId: socket.id,
            teacherName: name || 'Teacher',
            students: new Map(),
            state: {
                beadsState: null,
                rodCount: 7,
                abacusValue: 0,
                sessionState: null,
                scrollPercent: 0
            },
            createdAt: Date.now(),
            lastActivity: Date.now()
        };

        rooms.set(code, room);
        socket.join(code);
        currentRoom = code;
        currentRole = 'teacher';

        console.log(`[Room Created] ${code} by ${name || 'Teacher'} (${socket.id})`);

        if (typeof callback === 'function') {
            callback({
                success: true,
                roomCode: code,
                role: 'teacher'
            });
        }
    });

    // ---- JOIN ROOM ----
    socket.on('join-room', ({ code, name }, callback) => {
        const roomCode = (code || '').toUpperCase().trim();
        const room = rooms.get(roomCode);

        if (!room) {
            if (typeof callback === 'function') {
                callback({ success: false, error: 'Room not found. Check the code and try again.' });
            }
            return;
        }

        // Leave any existing room first
        if (currentRoom) leaveCurrentRoom(socket);

        const studentName = name || `Student ${room.students.size + 1}`;
        room.students.set(socket.id, { name: studentName });
        room.lastActivity = Date.now();

        socket.join(roomCode);
        currentRoom = roomCode;
        currentRole = 'student';

        console.log(`[Join] ${studentName} (${socket.id}) joined room ${roomCode}`);

        // Send current state to the new student
        if (typeof callback === 'function') {
            callback({
                success: true,
                roomCode,
                role: 'student',
                teacherName: room.teacherName,
                currentState: room.state,
                userCount: room.students.size + 1 // +1 for teacher
            });
        }

        // Notify everyone in the room
        io.in(roomCode).emit('user-count-update', {
            count: room.students.size + (room.teacherId ? 1 : 0),
            students: Array.from(room.students.values()).map(s => s.name)
        });

        // Notify teacher
        socket.to(roomCode).emit('student-joined', { name: studentName });
    });

    // ---- BEAD UPDATE (from teacher OR student) ----
    socket.on('bead-update', (data) => {
        if (!currentRoom) return;
        const room = rooms.get(currentRoom);
        if (!room) return;

        room.lastActivity = Date.now();

        // Store authoritative state
        room.state.beadsState = data.beadsState;
        room.state.abacusValue = data.abacusValue;
        room.state.rodCount = data.rodCount;

        // Broadcast to everyone else in the room
        socket.to(currentRoom).emit('bead-update', {
            beadsState: data.beadsState,
            abacusValue: data.abacusValue,
            rodCount: data.rodCount,
            fromRole: currentRole,
            fromId: socket.id
        });
    });

    // ---- SCROLL SYNC ----
    socket.on('scroll-sync', (data) => {
        if (!currentRoom) return;
        const room = rooms.get(currentRoom);
        if (!room) return;

        room.lastActivity = Date.now();
        room.state.scrollPercent = data.scrollPercent;

        // Broadcast to everyone else
        socket.to(currentRoom).emit('scroll-sync', {
            scrollPercent: data.scrollPercent,
            fromRole: currentRole
        });
    });

    // ---- SESSION UPDATE (teacher broadcasts question state) ----
    socket.on('session-update', (data) => {
        if (!currentRoom) return;
        const room = rooms.get(currentRoom);
        if (!room) return;

        room.lastActivity = Date.now();
        room.state.sessionState = data;

        // Broadcast to everyone else
        socket.to(currentRoom).emit('session-update', data);
    });

    // ---- FORCE SYNC (teacher pushes full state to all) ----
    socket.on('force-sync', (data) => {
        if (!currentRoom || currentRole !== 'teacher') return;
        const room = rooms.get(currentRoom);
        if (!room) return;

        room.lastActivity = Date.now();
        room.state = { ...room.state, ...data };

        // Broadcast to all including sender
        io.in(currentRoom).emit('force-sync', {
            ...room.state,
            fromTeacher: true
        });
    });

    // ---- ROD COUNT CHANGE ----
    socket.on('rod-change', (data) => {
        if (!currentRoom) return;
        const room = rooms.get(currentRoom);
        if (!room) return;

        room.lastActivity = Date.now();
        room.state.rodCount = data.rodCount;

        socket.to(currentRoom).emit('rod-change', {
            rodCount: data.rodCount
        });
    });

    // ---- ABACUS RESET ----
    socket.on('abacus-reset', () => {
        if (!currentRoom) return;
        const room = rooms.get(currentRoom);
        if (!room) return;

        room.lastActivity = Date.now();

        socket.to(currentRoom).emit('abacus-reset', {
            fromRole: currentRole
        });
    });

    // ---- LEAVE ROOM ----
    socket.on('leave-room', () => {
        leaveCurrentRoom(socket);
    });

    // ---- DISCONNECT ----
    socket.on('disconnect', () => {
        console.log(`[Disconnect] ${socket.id}`);
        leaveCurrentRoom(socket);
    });

    // ---- Helper: Leave current room ----
    function leaveCurrentRoom(sock) {
        if (!currentRoom) return;
        const room = rooms.get(currentRoom);
        if (!room) { currentRoom = null; currentRole = null; return; }

        if (currentRole === 'teacher') {
            room.teacherId = null;
            // Notify students that teacher left
            sock.to(currentRoom).emit('teacher-left', { message: 'Teacher has left the room.' });
            console.log(`[Leave] Teacher left room ${currentRoom}`);
        } else {
            const student = room.students.get(sock.id);
            const studentName = student ? student.name : 'Student';
            room.students.delete(sock.id);
            sock.to(currentRoom).emit('student-left', { name: studentName });
            console.log(`[Leave] ${studentName} left room ${currentRoom}`);
        }

        // Update user count
        io.in(currentRoom).emit('user-count-update', {
            count: room.students.size + (room.teacherId ? 1 : 0),
            students: Array.from(room.students.values()).map(s => s.name)
        });

        // If room is empty, schedule deletion
        if (!room.teacherId && room.students.size === 0) {
            setTimeout(() => {
                const r = rooms.get(currentRoom);
                if (r && !r.teacherId && r.students.size === 0) {
                    rooms.delete(currentRoom);
                    console.log(`[Cleanup] Empty room ${currentRoom} deleted.`);
                }
            }, 60000); // 1 min grace period
        }

        sock.leave(currentRoom);
        currentRoom = null;
        currentRole = null;
    }
});

// ---- Health check endpoint ----
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        rooms: rooms.size,
        connections: io.engine.clientsCount
    });
});

// ---- Start Server ----
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`\n🧮 Abacus Studio Server running on http://localhost:${PORT}\n`);
    console.log(`   Open this URL in your browser to use the app.`);
    console.log(`   Share the room code with your student!\n`);
});
