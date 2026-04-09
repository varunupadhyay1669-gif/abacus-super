// ============================================================
// Abacus Studio — Complete Application Logic
// Interactive soroban abacus with level-based question generation,
// step-by-step practice, scoring, streaks, timer, and confetti.
// ============================================================

// --- 1. Data Layer: Complete Levels & All 34 Formulas ---
const ABACUS_LEVELS = [
    {
        id: 1, name: "Level 1: Direct (No Formula)",
        description: "Basic bead movements without any formula",
        tricks: [
            { id: "l1_direct", name: "Direct Add/Sub", hint: "Move beads directly — no formula needed" }
        ]
    },
    {
        id: 2, name: "Level 2: Small Friend (+)",
        description: "Complement of 5 — Addition",
        tricks: [
            { id: "l2_add1", name: "+1 = +5 − 4", formula: "+1 = +5 − 4", hint: "Pull down 5-bead, push away 4 earth beads", addend: 1 },
            { id: "l2_add2", name: "+2 = +5 − 3", formula: "+2 = +5 − 3", hint: "Pull down 5-bead, push away 3 earth beads", addend: 2 },
            { id: "l2_add3", name: "+3 = +5 − 2", formula: "+3 = +5 − 2", hint: "Pull down 5-bead, push away 2 earth beads", addend: 3 },
            { id: "l2_add4", name: "+4 = +5 − 1", formula: "+4 = +5 − 1", hint: "Pull down 5-bead, push away 1 earth bead", addend: 4 }
        ]
    },
    {
        id: 3, name: "Level 3: Small Friend (−)",
        description: "Complement of 5 — Subtraction",
        tricks: [
            { id: "l3_sub1", name: "−1 = −5 + 4", formula: "−1 = −5 + 4", hint: "Push up 5-bead, pull up 4 earth beads", addend: -1 },
            { id: "l3_sub2", name: "−2 = −5 + 3", formula: "−2 = −5 + 3", hint: "Push up 5-bead, pull up 3 earth beads", addend: -2 },
            { id: "l3_sub3", name: "−3 = −5 + 2", formula: "−3 = −5 + 2", hint: "Push up 5-bead, pull up 2 earth beads", addend: -3 },
            { id: "l3_sub4", name: "−4 = −5 + 1", formula: "−4 = −5 + 1", hint: "Push up 5-bead, pull up 1 earth bead", addend: -4 }
        ]
    },
    {
        id: 4, name: "Level 4: Big Friend (+)",
        description: "Complement of 10 — Addition",
        tricks: [
            { id: "l4_add1", name: "+1 = +10 − 9", formula: "+1 = +10 − 9", addend: 1 },
            { id: "l4_add2", name: "+2 = +10 − 8", formula: "+2 = +10 − 8", addend: 2 },
            { id: "l4_add3", name: "+3 = +10 − 7", formula: "+3 = +10 − 7", addend: 3 },
            { id: "l4_add4", name: "+4 = +10 − 6", formula: "+4 = +10 − 6", addend: 4 },
            { id: "l4_add5", name: "+5 = +10 − 5", formula: "+5 = +10 − 5", addend: 5 },
            { id: "l4_add6", name: "+6 = +10 − 4", formula: "+6 = +10 − 4", addend: 6 },
            { id: "l4_add7", name: "+7 = +10 − 3", formula: "+7 = +10 − 3", addend: 7 },
            { id: "l4_add8", name: "+8 = +10 − 2", formula: "+8 = +10 − 2", addend: 8 },
            { id: "l4_add9", name: "+9 = +10 − 1", formula: "+9 = +10 − 1", addend: 9 }
        ]
    },
    {
        id: 5, name: "Level 5: Big Friend (−)",
        description: "Complement of 10 — Subtraction",
        tricks: [
            { id: "l5_sub1", name: "−1 = −10 + 9", formula: "−1 = −10 + 9", addend: -1 },
            { id: "l5_sub2", name: "−2 = −10 + 8", formula: "−2 = −10 + 8", addend: -2 },
            { id: "l5_sub3", name: "−3 = −10 + 7", formula: "−3 = −10 + 7", addend: -3 },
            { id: "l5_sub4", name: "−4 = −10 + 6", formula: "−4 = −10 + 6", addend: -4 },
            { id: "l5_sub5", name: "−5 = −10 + 5", formula: "−5 = −10 + 5", addend: -5 },
            { id: "l5_sub6", name: "−6 = −10 + 4", formula: "−6 = −10 + 4", addend: -6 },
            { id: "l5_sub7", name: "−7 = −10 + 3", formula: "−7 = −10 + 3", addend: -7 },
            { id: "l5_sub8", name: "−8 = −10 + 2", formula: "−8 = −10 + 2", addend: -8 },
            { id: "l5_sub9", name: "−9 = −10 + 1", formula: "−9 = −10 + 1", addend: -9 }
        ]
    },
    {
        id: 6, name: "Level 6: Mix Friend (+)",
        description: "Combination formulas — Addition",
        tricks: [
            { id: "l6_add6", name: "+6 = +10 − 5 + 1", formula: "+6 = +10 − 5 + 1", addend: 6 },
            { id: "l6_add7", name: "+7 = +10 − 5 + 2", formula: "+7 = +10 − 5 + 2", addend: 7 },
            { id: "l6_add8", name: "+8 = +10 − 5 + 3", formula: "+8 = +10 − 5 + 3", addend: 8 },
            { id: "l6_add9", name: "+9 = +10 − 5 + 4", formula: "+9 = +10 − 5 + 4", addend: 9 }
        ]
    },
    {
        id: 7, name: "Level 7: Mix Friend (−)",
        description: "Combination formulas — Subtraction",
        tricks: [
            { id: "l7_sub6", name: "−6 = −10 + 5 − 1", formula: "−6 = −10 + 5 − 1", addend: -6 },
            { id: "l7_sub7", name: "−7 = −10 + 5 − 2", formula: "−7 = −10 + 5 − 2", addend: -7 },
            { id: "l7_sub8", name: "−8 = −10 + 5 − 3", formula: "−8 = −10 + 5 − 3", addend: -8 },
            { id: "l7_sub9", name: "−9 = −10 + 5 − 4", formula: "−9 = −10 + 5 − 4", addend: -9 }
        ]
    },
    {
        id: 8, name: "Level 8: 2-Digit All Mixed",
        description: "Multi-digit practice using all formulas",
        tricks: [
            { id: "l8_all", name: "Mixed 2-Digit Practice", formula: "All formulas combined", hint: "Use all your formula knowledge!" }
        ]
    }
];

// --- 2. Smart Question Generation Engine ---
// Each generator creates a sequence of numbers where the student MUST use the target formula.

/**
 * For Small Friend Addition (+n = +5 - complement):
 * Need rod state where adding n directly is impossible (lower beads full for direct),
 * but the 5-bead is available. Rod value before must be in [5-n+1 ... 4] range,
 * meaning lower beads show (5-n) to 4, and upper bead is DOWN (not active).
 * Actually: we need lower count >= (5-n+1). So if formula is +4=+5-1, we need >=1 lower bead active, and upper NOT active.
 * Simplified: start from a value where adding the number requires the small friend.
 */
function generateSmallFriendAdd(addend, count) {
    const questions = [];
    const complement = 5 - addend; // What we subtract from 5
    for (let i = 0; i < count; i++) {
        const seq = [];
        // Start: need lower beads to be between (5-addend+1) and 4, upper bead not set
        // i.e., current ones-digit must be in range [complement+1, 4] so direct +addend overflows past 4
        const startVal = complement + 1 + Math.floor(Math.random() * (4 - complement));
        seq.push(startVal);
        // Now add the target value — forces formula
        seq.push(addend);
        // Add a few more direct operations to make it interesting
        const remaining = 2 + Math.floor(Math.random() * 2);
        let running = startVal + addend;
        for (let j = 0; j < remaining; j++) {
            const maxSub = Math.min(running, 3);
            if (maxSub <= 0) break;
            const sub = -(1 + Math.floor(Math.random() * maxSub));
            seq.push(sub);
            running += sub;
        }
        questions.push(seq);
    }
    return questions;
}

function generateSmallFriendSub(addend, count) {
    // addend is negative, e.g. -1 means -1 = -5 + 4
    const absVal = Math.abs(addend);
    const complement = 5 - absVal;
    const questions = [];
    for (let i = 0; i < count; i++) {
        const seq = [];
        // Need: upper bead active, lower beads <= complement (so can't do direct subtraction)
        // Start value 5 + random(0..complement)
        const startLowers = Math.floor(Math.random() * (complement + 1));
        const startVal = 5 + startLowers;
        seq.push(startVal);
        seq.push(addend); // the forced formula step
        let running = startVal + addend;
        const remaining = 2 + Math.floor(Math.random() * 2);
        for (let j = 0; j < remaining; j++) {
            const add = 1 + Math.floor(Math.random() * Math.min(3, 9 - running));
            if (add <= 0 || running + add > 9) break;
            seq.push(add);
            running += add;
        }
        questions.push(seq);
    }
    return questions;
}

function generateBigFriendAdd(addend, count) {
    // +n = +10 - (10-n). Need: ones digit = (10-addend) or more on that rod, can't directly add.
    const complement = 10 - addend;
    const questions = [];
    for (let i = 0; i < count; i++) {
        const seq = [];
        // Start with ones-digit in [complement+1 ... 9] so adding addend crosses 10
        const startOnes = complement + Math.floor(Math.random() * (9 - complement)) + 1;
        // Clamp to valid range
        const start = Math.min(startOnes, 9);
        seq.push(start);
        seq.push(addend);
        let running = start + addend;
        // A couple more moves
        const extra = 1 + Math.floor(Math.random() * 2);
        for (let j = 0; j < extra; j++) {
            if (running <= 1) break;
            const sub = -(1 + Math.floor(Math.random() * Math.min(3, running - 1)));
            seq.push(sub);
            running += sub;
        }
        questions.push(seq);
    }
    return questions;
}

function generateBigFriendSub(addend, count) {
    const absVal = Math.abs(addend);
    const complement = 10 - absVal;
    const questions = [];
    for (let i = 0; i < count; i++) {
        const seq = [];
        // Need tens digit available. Start with 10 + random(0..complement)
        const startOnes = Math.floor(Math.random() * (complement + 1));
        const start = 10 + startOnes;
        seq.push(start);
        seq.push(addend);
        let running = start + addend;
        const extra = 1 + Math.floor(Math.random() * 2);
        for (let j = 0; j < extra; j++) {
            if (running >= 18) break;
            const add = 1 + Math.floor(Math.random() * Math.min(3, 18 - running));
            seq.push(add);
            running += add;
        }
        questions.push(seq);
    }
    return questions;
}

function generateMixFriendAdd(addend, count) {
    // +n = +10 - 5 + (n-5). Need: ones digit has 5-bead down AND lower beads make direct impossible.
    // The rod needs 5+(5-addend+1)..9 active but that interpretation is complex.
    // Simpler: start from 5,6,7,8,9 minus small values to force mix friend.
    const questions = [];
    for (let i = 0; i < count; i++) {
        const seq = [];
        // For mix friend +6 = +10-5+1: we need ones 5..9 and can't use big friend alone.
        // Actually mix friend is used when ones >= 5 and (ones + addend) >= 10.
        // ones in [10-addend+1 ... 9] AND ones >= 5. Since addend >= 6, 10-addend <= 4, so ones >= 5 works.
        const startOnes = 5 + Math.floor(Math.random() * (addend - 5));
        const start = Math.max(5, Math.min(startOnes, 9));
        seq.push(start);
        seq.push(addend);
        let running = start + addend;
        const extra = 1 + Math.floor(Math.random() * 2);
        for (let j = 0; j < extra; j++) {
            if (running <= 1) break;
            const sub = -(1 + Math.floor(Math.random() * Math.min(4, running - 1)));
            seq.push(sub);
            running += sub;
        }
        questions.push(seq);
    }
    return questions;
}

function generateMixFriendSub(addend, count) {
    const absVal = Math.abs(addend);
    const questions = [];
    for (let i = 0; i < count; i++) {
        const seq = [];
        // Need: tens available, ones < 5 (so removing also requires giving back 5-bead)
        // Start: 10 + random(0 .. absVal-6)
        const startOnes = Math.floor(Math.random() * (absVal - 5));
        const start = 10 + startOnes;
        seq.push(start);
        seq.push(addend);
        let running = start + addend;
        const extra = 1 + Math.floor(Math.random() * 2);
        for (let j = 0; j < extra; j++) {
            if (running >= 18) break;
            const add = 1 + Math.floor(Math.random() * Math.min(4, 18 - running));
            seq.push(add);
            running += add;
        }
        questions.push(seq);
    }
    return questions;
}

function generateDirectQuestions(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        const seq = [];
        const len = 3 + Math.floor(Math.random() * 3);
        let running = 0;
        for (let j = 0; j < len; j++) {
            if (j === 0) {
                const v = 1 + Math.floor(Math.random() * 4);
                seq.push(v);
                running = v;
            } else {
                // Keep values small and in direct range
                const canAdd = Math.min(4, 9 - running);
                const canSub = Math.min(4, running);
                const isAdd = canAdd > 0 && (canSub === 0 || Math.random() > 0.4);
                if (isAdd && canAdd > 0) {
                    const v = 1 + Math.floor(Math.random() * canAdd);
                    seq.push(v);
                    running += v;
                } else if (canSub > 0) {
                    const v = -(1 + Math.floor(Math.random() * canSub));
                    seq.push(v);
                    running += v;
                }
            }
        }
        if (seq.length >= 2) questions.push(seq);
    }
    return questions;
}

function generateMixed2Digit(count) {
    const questions = [];
    for (let i = 0; i < count; i++) {
        const seq = [];
        const len = 3 + Math.floor(Math.random() * 3);
        let running = 0;
        for (let j = 0; j < len; j++) {
            if (j === 0) {
                const v = 10 + Math.floor(Math.random() * 40);
                seq.push(v);
                running = v;
            } else {
                const maxAdd = Math.min(50, 99 - running);
                const maxSub = Math.min(50, running - 1);
                const isAdd = maxAdd > 5 && (maxSub < 5 || Math.random() > 0.45);
                if (isAdd) {
                    const v = 1 + Math.floor(Math.random() * maxAdd);
                    seq.push(v);
                    running += v;
                } else if (maxSub > 0) {
                    const v = -(1 + Math.floor(Math.random() * maxSub));
                    seq.push(v);
                    running += v;
                }
            }
            if (running < 0) running = 0;
            if (running > 99) running = 99;
        }
        if (seq.length >= 2) questions.push(seq);
    }
    return questions;
}

function generateQuestionsForTrick(trickId, count) {
    // Route to correct generator
    if (trickId === "l1_direct") return generateDirectQuestions(count);
    if (trickId === "l8_all") return generateMixed2Digit(count);

    // Find the trick data
    const trick = ABACUS_LEVELS.flatMap(l => l.tricks).find(t => t.id === trickId);
    if (!trick || trick.addend === undefined) {
        // Fallback
        return generateDirectQuestions(count);
    }

    const addend = trick.addend;

    if (trickId.startsWith("l2_")) return generateSmallFriendAdd(addend, count);
    if (trickId.startsWith("l3_")) return generateSmallFriendSub(addend, count);
    if (trickId.startsWith("l4_")) return generateBigFriendAdd(addend, count);
    if (trickId.startsWith("l5_")) return generateBigFriendSub(addend, count);
    if (trickId.startsWith("l6_")) return generateMixFriendAdd(addend, count);
    if (trickId.startsWith("l7_")) return generateMixFriendSub(addend, count);

    return generateDirectQuestions(count);
}


// --- 3. State ---
let state = {
    rodCount: 7,
    abacusValue: 0,
    beadsState: [],

    // Session
    allQuestions: [],      // Array of arrays (sequences)
    currentQIndex: 0,      // Which question set we're on
    currentStepIndex: 0,   // Which number in the sequence we're at
    runningTotal: 0,       // Cumulative value student should have
    expectedAnswer: 0,     // Expected value for current step

    correctCount: 0,
    totalCount: 0,
    streak: 0,
    bestStreak: 0,
    totalQuestionCount: 10,

    // Timer
    sessionStart: null,
    timerInterval: null,

    // Current trick info
    currentTrickId: null,
    currentHint: "",

    isCustom: false,

    // Collaboration
    socket: null,
    roomCode: null,
    role: null,           // 'teacher' | 'student' | null
    isInRoom: false,
    suppressRemoteUpdate: false  // prevent echo loops
};

// --- 4. DOM Cache ---
const DOM = {};
function cacheDom() {
    DOM.frame = document.getElementById('abacus-frame');
    DOM.valueDisplay = document.getElementById('current-abacus-value');
    DOM.rodSelect = document.getElementById('rod-count');
    DOM.resetBtn = document.getElementById('reset-abacus');

    DOM.levelSelect = document.getElementById('level-select');
    DOM.trickSelect = document.getElementById('trick-select');
    DOM.questionCount = document.getElementById('question-count');
    DOM.generateBtn = document.getElementById('generate-questions');

    DOM.customInput = document.getElementById('custom-sequence');
    DOM.playCustomBtn = document.getElementById('play-custom');

    DOM.qCounter = document.getElementById('q-counter');
    DOM.qDisplay = document.getElementById('question-display');
    DOM.hintDisplay = document.getElementById('hint-display');
    DOM.showHintBtn = document.getElementById('show-hint');
    DOM.skipBtn = document.getElementById('skip-question');
    DOM.checkBtn = document.getElementById('check-answer');
    DOM.nextBtn = document.getElementById('next-question');
    DOM.feedbackMsg = document.getElementById('feedback-message');
    DOM.scoreDisplay = document.getElementById('score-display');

    DOM.streakPill = document.getElementById('streak-pill');
    DOM.streakDisplay = document.getElementById('streak-display');
    DOM.timerDisplay = document.getElementById('timer-display');

    DOM.stepLabel = document.getElementById('step-label');
    DOM.stepProgressBar = document.getElementById('step-progress-bar');

    DOM.welcomeState = document.getElementById('welcome-state');
    DOM.questionState = document.getElementById('question-state');
    DOM.summaryState = document.getElementById('summary-state');

    DOM.summaryIcon = document.getElementById('summary-icon');
    DOM.summaryTitle = document.getElementById('summary-title');
    DOM.summaryCorrect = document.getElementById('summary-correct');
    DOM.summaryTotal = document.getElementById('summary-total');
    DOM.summaryAccuracy = document.getElementById('summary-accuracy');
    DOM.summaryTime = document.getElementById('summary-time');
    DOM.accuracyBar = document.getElementById('accuracy-bar');
    DOM.restartBtn = document.getElementById('restart-session');

    DOM.toggleFormula = document.getElementById('toggle-formula-ref');
    DOM.formulaSidebar = document.getElementById('formula-sidebar');
    DOM.formulaOverlay = document.getElementById('formula-overlay');
    DOM.closeFormula = document.getElementById('close-formula-ref');
    DOM.formulaList = document.getElementById('formula-list');

    DOM.confettiCanvas = document.getElementById('confetti-canvas');

    // Room collaboration DOM
    DOM.roomBarIdle = document.getElementById('room-bar-idle');
    DOM.roomBarConnected = document.getElementById('room-bar-connected');
    DOM.createRoomBtn = document.getElementById('create-room-btn');
    DOM.joinRoomInput = document.getElementById('join-room-input');
    DOM.joinRoomBtn = document.getElementById('join-room-btn');
    DOM.roomCodeDisplay = document.getElementById('room-code-display');
    DOM.roomCodeValue = document.getElementById('room-code-value');
    DOM.roomRoleBadge = document.getElementById('room-role-badge');
    DOM.connectionDot = document.getElementById('connection-dot');
    DOM.roomUserCount = document.getElementById('room-user-count');
    DOM.forceSyncBtn = document.getElementById('force-sync-btn');
    DOM.leaveRoomBtn = document.getElementById('leave-room-btn');
    DOM.toastContainer = document.getElementById('toast-container');
}


// --- 5. Initialization ---
function init() {
    cacheDom();
    populateSidebar();
    populateLevels();
    resetAbacusState(state.rodCount);
    renderAbacus();
    setupEventListeners();
    setupCollaboration();
    showScreen('welcome');
}

function resetAbacusState(rods) {
    state.rodCount = rods;
    state.beadsState = Array.from({ length: rods }, () => ({
        upper: false,
        lowers: [false, false, false, false]
    }));
    state.abacusValue = 0;
    if (DOM.valueDisplay) DOM.valueDisplay.textContent = '0';
}


// --- 6. Abacus Rendering & Logic ---
function renderAbacus() {
    DOM.frame.innerHTML = '';
    DOM.frame.setAttribute('data-rods', state.rodCount);

    for (let i = 0; i < state.rodCount; i++) {
        const reversedIndex = state.rodCount - 1 - i;
        const placeValue = Math.pow(10, reversedIndex);

        let label = placeValue.toString();
        if (placeValue >= 1000000) label = (placeValue / 1000000) + 'M';
        else if (placeValue >= 1000) label = (placeValue / 1000) + 'k';

        const rodDiv = document.createElement('div');
        rodDiv.className = 'abacus-rod';
        rodDiv.dataset.rodIndex = i;
        rodDiv.dataset.placeValue = placeValue;

        // Upper bead
        const upperGroup = document.createElement('div');
        upperGroup.className = 'bead-group upper-beads';
        const upperBead = document.createElement('div');
        upperBead.className = 'bead';
        upperBead.dataset.active = state.beadsState[i].upper;
        upperBead.addEventListener('click', () => toggleUpperBead(i));
        upperBead.addEventListener('touchend', (e) => { e.preventDefault(); toggleUpperBead(i); });
        upperGroup.appendChild(upperBead);

        // Lower beads (top to bottom = bead index 3,2,1,0)
        const lowerGroup = document.createElement('div');
        lowerGroup.className = 'bead-group lower-beads';
        for (let b = 3; b >= 0; b--) {
            const lowerBead = document.createElement('div');
            lowerBead.className = 'bead';
            lowerBead.dataset.active = state.beadsState[i].lowers[b];
            lowerBead.addEventListener('click', () => handleLowerBeadClick(i, b));
            lowerBead.addEventListener('touchend', (e) => { e.preventDefault(); handleLowerBeadClick(i, b); });
            lowerGroup.appendChild(lowerBead);
        }

        const labelDiv = document.createElement('div');
        labelDiv.className = 'rod-label';
        labelDiv.textContent = label;

        rodDiv.appendChild(upperGroup);
        rodDiv.appendChild(lowerGroup);
        rodDiv.appendChild(labelDiv);
        DOM.frame.appendChild(rodDiv);
    }
}

function toggleUpperBead(rodIndex) {
    state.beadsState[rodIndex].upper = !state.beadsState[rodIndex].upper;
    renderAbacus();
    updateAbacusValue();
    emitBeadUpdate();
}

function handleLowerBeadClick(rodIndex, beadIndex) {
    const currentState = state.beadsState[rodIndex].lowers[beadIndex];
    if (!currentState) {
        // Turn ON this bead and all below
        for (let i = 0; i <= beadIndex; i++) {
            state.beadsState[rodIndex].lowers[i] = true;
        }
    } else {
        // Turn OFF this bead and all above
        for (let i = beadIndex; i < 4; i++) {
            state.beadsState[rodIndex].lowers[i] = false;
        }
    }
    renderAbacus();
    updateAbacusValue();
    emitBeadUpdate();
}

function updateAbacusValue() {
    let total = 0;
    for (let i = 0; i < state.rodCount; i++) {
        const reversedIndex = state.rodCount - 1 - i;
        const placeValue = Math.pow(10, reversedIndex);
        let rodValue = 0;
        if (state.beadsState[i].upper) rodValue += 5;
        for (let b = 0; b < 4; b++) {
            if (state.beadsState[i].lowers[b]) rodValue += 1;
        }
        total += rodValue * placeValue;
    }
    state.abacusValue = total;

    // Animate value change
    const display = DOM.valueDisplay;
    display.textContent = total.toLocaleString();
    display.style.transform = 'scale(1.1)';
    setTimeout(() => { display.style.transform = 'scale(1)'; }, 150);
}


// --- 7. Event Listeners ---
function setupEventListeners() {
    DOM.rodSelect.addEventListener('change', (e) => {
        resetAbacusState(parseInt(e.target.value));
        renderAbacus();
    });

    DOM.resetBtn.addEventListener('click', () => {
        resetAbacusState(state.rodCount);
        renderAbacus();
    });

    DOM.levelSelect.addEventListener('change', (e) => {
        populateTricks(parseInt(e.target.value));
    });

    DOM.trickSelect.addEventListener('change', () => {
        DOM.generateBtn.disabled = !DOM.trickSelect.value;
    });

    DOM.generateBtn.addEventListener('click', () => {
        startSession();
    });

    DOM.playCustomBtn.addEventListener('click', () => {
        const val = DOM.customInput.value.trim();
        if (val) {
            const arr = val.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
            if (arr.length > 0) {
                state.isCustom = true;
                state.allQuestions = [arr];
                state.currentQIndex = 0;
                state.correctCount = 0;
                state.totalCount = 0;
                state.streak = 0;
                state.totalQuestionCount = 1;
                state.currentHint = "Custom sequence";
                startTimer();
                showScreen('question');
                loadQuestion(0);
            }
        }
    });

    DOM.checkBtn.addEventListener('click', checkAnswer);

    DOM.nextBtn.addEventListener('click', () => {
        advanceStep();
    });

    DOM.showHintBtn.addEventListener('click', () => {
        DOM.hintDisplay.classList.toggle('hidden');
    });

    DOM.skipBtn.addEventListener('click', () => {
        // Skip to next question
        state.totalCount++;
        updateScoreDisplay();
        if (state.currentQIndex + 1 < state.allQuestions.length) {
            state.currentQIndex++;
            loadQuestion(state.currentQIndex);
        } else {
            showSessionSummary();
        }
    });

    // Formula sidebar
    DOM.toggleFormula.addEventListener('click', () => {
        DOM.formulaSidebar.classList.remove('hidden');
        DOM.formulaOverlay.classList.remove('hidden');
    });
    const closeFormulaSidebar = () => {
        DOM.formulaSidebar.classList.add('hidden');
        DOM.formulaOverlay.classList.add('hidden');
    };
    DOM.closeFormula.addEventListener('click', closeFormulaSidebar);
    DOM.formulaOverlay.addEventListener('click', closeFormulaSidebar);

    // Restart
    DOM.restartBtn.addEventListener('click', () => {
        showScreen('welcome');
        resetAbacusState(state.rodCount);
        renderAbacus();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (!DOM.checkBtn.classList.contains('hidden') && !DOM.checkBtn.disabled) {
                checkAnswer();
            } else if (!DOM.nextBtn.classList.contains('hidden')) {
                advanceStep();
            }
        }
    });
}


// --- 8. Control Panel Logic ---
function populateLevels() {
    DOM.levelSelect.innerHTML = '<option value="">— Select Level —</option>';
    ABACUS_LEVELS.forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.id;
        opt.textContent = l.name;
        DOM.levelSelect.appendChild(opt);
    });
}

function populateTricks(levelId) {
    DOM.trickSelect.innerHTML = '<option value="">— Select Trick —</option>';
    DOM.generateBtn.disabled = true;
    if (!levelId) { DOM.trickSelect.disabled = true; return; }

    const level = ABACUS_LEVELS.find(l => l.id === levelId);
    if (!level) return;
    level.tricks.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.name;
        DOM.trickSelect.appendChild(opt);
    });
    DOM.trickSelect.disabled = false;
}

function populateSidebar() {
    DOM.formulaList.innerHTML = '';
    ABACUS_LEVELS.forEach(level => {
        if (level.id === 1 || level.id === 8) return;

        const catDiv = document.createElement('div');
        catDiv.className = 'formula-category';
        const h4 = document.createElement('h4');
        h4.textContent = level.name;
        catDiv.appendChild(h4);

        level.tricks.forEach(t => {
            const item = document.createElement('div');
            item.className = 'formula-item';
            item.textContent = t.formula || t.name;
            catDiv.appendChild(item);
        });

        DOM.formulaList.appendChild(catDiv);
    });
}


// --- 9. Session Flow ---
function startSession() {
    const trickId = DOM.trickSelect.value;
    if (!trickId) return;

    const count = parseInt(DOM.questionCount.value) || 10;
    const trick = ABACUS_LEVELS.flatMap(l => l.tricks).find(t => t.id === trickId);

    state.isCustom = false;
    state.currentTrickId = trickId;
    state.currentHint = trick ? (trick.hint || trick.formula || "Direct practice") : "";
    state.totalQuestionCount = count;
    state.correctCount = 0;
    state.totalCount = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.currentQIndex = 0;

    // Generate all questions
    state.allQuestions = generateQuestionsForTrick(trickId, count);

    startTimer();
    showScreen('question');
    loadQuestion(0);
}

function loadQuestion(index) {
    const seq = state.allQuestions[index];
    if (!seq) return;

    state.currentStepIndex = 0;
    state.runningTotal = 0;

    // Reset abacus for each question
    resetAbacusState(state.rodCount);
    renderAbacus();

    // Update header
    DOM.qCounter.textContent = `(${index + 1} / ${state.allQuestions.length})`;
    DOM.showHintBtn.classList.remove('hidden');
    DOM.skipBtn.classList.remove('hidden');

    // Set hint
    DOM.hintDisplay.textContent = state.currentHint ? `💡 ${state.currentHint}` : "No specific formula hint.";
    DOM.hintDisplay.classList.add('hidden');

    // Render the step-by-step question
    renderQuestionSteps(seq);
    highlightCurrentStep();

    DOM.checkBtn.disabled = false;
    DOM.checkBtn.classList.remove('hidden');
    DOM.nextBtn.classList.add('hidden');
    DOM.feedbackMsg.textContent = '';
    DOM.feedbackMsg.className = 'feedback-message';
}

function renderQuestionSteps(seq) {
    DOM.qDisplay.innerHTML = '';
    seq.forEach((num, idx) => {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.id = `q-step-${idx}`;

        const sign = num > 0 && idx > 0 ? '+' : '';
        div.textContent = `${sign}${num}`;

        if (idx < state.currentStepIndex) div.classList.add('completed');
        else if (idx === state.currentStepIndex) div.classList.add('active');
        else div.classList.add('upcoming');

        DOM.qDisplay.appendChild(div);
    });

    // Update progress
    const seq2 = state.allQuestions[state.currentQIndex];
    if (seq2) {
        const progress = ((state.currentStepIndex + 1) / seq2.length) * 100;
        DOM.stepLabel.textContent = `Step ${state.currentStepIndex + 1} of ${seq2.length}`;
        DOM.stepProgressBar.style.width = `${progress}%`;
    }
}

function highlightCurrentStep() {
    const seq = state.allQuestions[state.currentQIndex];
    if (!seq) return;

    // Calculate running total up to current step (inclusive)
    state.runningTotal = 0;
    for (let i = 0; i <= state.currentStepIndex; i++) {
        state.runningTotal += seq[i];
    }
    state.expectedAnswer = state.runningTotal;

    // Update step classes
    seq.forEach((_, idx) => {
        const el = document.getElementById(`q-step-${idx}`);
        if (!el) return;
        el.classList.remove('completed', 'active', 'upcoming');
        if (idx < state.currentStepIndex) el.classList.add('completed');
        else if (idx === state.currentStepIndex) el.classList.add('active');
        else el.classList.add('upcoming');
    });

    // Update progress bar
    const progress = ((state.currentStepIndex + 1) / seq.length) * 100;
    DOM.stepLabel.textContent = `Step ${state.currentStepIndex + 1} of ${seq.length}`;
    DOM.stepProgressBar.style.width = `${progress}%`;
}

function checkAnswer() {
    const isCorrect = state.abacusValue === state.expectedAnswer;
    DOM.feedbackMsg.className = 'feedback-message';

    if (isCorrect) {
        DOM.feedbackMsg.textContent = '🎉 Correct! Well done!';
        DOM.feedbackMsg.classList.add('feedback-success');

        // Move to next step or next question
        const seq = state.allQuestions[state.currentQIndex];
        if (state.currentStepIndex < seq.length - 1) {
            // Auto-advance to next step after delay
            DOM.checkBtn.disabled = true;
            setTimeout(() => {
                state.currentStepIndex++;
                highlightCurrentStep();
                DOM.checkBtn.disabled = false;
                DOM.feedbackMsg.textContent = '';
                DOM.feedbackMsg.className = 'feedback-message';
            }, 600);
            return;
        }

        // Question complete!
        state.correctCount++;
        state.streak++;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;

        // Show streak
        if (state.streak >= 2) {
            DOM.streakPill.classList.remove('hidden');
            DOM.streakDisplay.textContent = state.streak;
        }

        // Confetti for streaks of 3+
        if (state.streak >= 3) {
            launchConfetti();
        }

        DOM.feedbackMsg.textContent = `🎉 Perfect! Question ${state.currentQIndex + 1} complete!`;
    } else {
        DOM.feedbackMsg.textContent = `✗ Expected ${state.expectedAnswer}, your abacus shows ${state.abacusValue}. Try again or skip.`;
        DOM.feedbackMsg.classList.add('feedback-error');
        state.streak = 0;
        DOM.streakPill.classList.add('hidden');
        // Don't advance — let them try again
        return;
    }

    state.totalCount++;
    updateScoreDisplay();

    DOM.checkBtn.classList.add('hidden');
    DOM.nextBtn.classList.remove('hidden');
    DOM.nextBtn.focus();
}

function advanceStep() {
    if (state.currentQIndex + 1 < state.allQuestions.length) {
        state.currentQIndex++;
        loadQuestion(state.currentQIndex);
    } else {
        showSessionSummary();
    }
}

function updateScoreDisplay() {
    DOM.scoreDisplay.textContent = `${state.correctCount} / ${state.totalCount}`;
}


// --- 10. Screen Management ---
function showScreen(screen) {
    DOM.welcomeState.classList.add('hidden');
    DOM.questionState.classList.add('hidden');
    DOM.summaryState.classList.add('hidden');

    if (screen === 'welcome') {
        DOM.welcomeState.classList.remove('hidden');
        DOM.showHintBtn.classList.add('hidden');
        DOM.skipBtn.classList.add('hidden');
        stopTimer();
    } else if (screen === 'question') {
        DOM.questionState.classList.remove('hidden');
    } else if (screen === 'summary') {
        DOM.summaryState.classList.remove('hidden');
    }
}

function showSessionSummary() {
    stopTimer();
    showScreen('summary');

    const accuracy = state.totalCount > 0 ? Math.round((state.correctCount / state.totalCount) * 100) : 0;
    const elapsed = state.sessionStart ? Math.floor((Date.now() - state.sessionStart) / 1000) : 0;
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

    DOM.summaryCorrect.textContent = state.correctCount;
    DOM.summaryTotal.textContent = state.totalCount;
    DOM.summaryAccuracy.textContent = `${accuracy}%`;
    DOM.summaryTime.textContent = timeStr;

    // Animate accuracy bar
    setTimeout(() => {
        DOM.accuracyBar.style.width = `${accuracy}%`;
    }, 300);

    // Icon & title based on performance
    if (accuracy >= 90) {
        DOM.summaryIcon.textContent = '🏆';
        DOM.summaryTitle.textContent = 'Outstanding Performance!';
        launchConfetti();
    } else if (accuracy >= 70) {
        DOM.summaryIcon.textContent = '🌟';
        DOM.summaryTitle.textContent = 'Great Job!';
    } else if (accuracy >= 50) {
        DOM.summaryIcon.textContent = '💪';
        DOM.summaryTitle.textContent = 'Good Effort!';
    } else {
        DOM.summaryIcon.textContent = '📚';
        DOM.summaryTitle.textContent = 'Keep Practicing!';
    }
}


// --- 11. Timer ---
function startTimer() {
    stopTimer();
    state.sessionStart = Date.now();
    state.timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

function updateTimer() {
    if (!state.sessionStart) return;
    const elapsed = Math.floor((Date.now() - state.sessionStart) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    DOM.timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


// --- 12. Confetti ---
function launchConfetti() {
    const canvas = DOM.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#6366f1', '#a78bfa', '#f472b6', '#22c55e', '#eab308', '#f59e0b', '#3b82f6', '#ec4899'];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.3 - canvas.height * 0.1,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 3,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
    }

    let frame = 0;
    const maxFrames = 120;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.12; // gravity
            p.rotation += p.rotationSpeed;
            p.opacity = Math.max(0, 1 - frame / maxFrames);

            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        if (frame < maxFrames) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}


// --- 13. Collaboration Layer ---

function emitBeadUpdate() {
    if (!state.isInRoom || !state.socket || state.suppressRemoteUpdate) return;
    state.socket.emit('bead-update', {
        beadsState: JSON.parse(JSON.stringify(state.beadsState)),
        abacusValue: state.abacusValue,
        rodCount: state.rodCount
    });
}

function emitSessionUpdate() {
    if (!state.isInRoom || !state.socket) return;
    state.socket.emit('session-update', {
        allQuestions: state.allQuestions,
        currentQIndex: state.currentQIndex,
        currentStepIndex: state.currentStepIndex,
        runningTotal: state.runningTotal,
        expectedAnswer: state.expectedAnswer,
        correctCount: state.correctCount,
        totalCount: state.totalCount,
        streak: state.streak,
        bestStreak: state.bestStreak,
        totalQuestionCount: state.totalQuestionCount,
        currentTrickId: state.currentTrickId,
        currentHint: state.currentHint,
        isCustom: state.isCustom,
        screen: getCurrentScreen()
    });
}

function getCurrentScreen() {
    if (!DOM.welcomeState.classList.contains('hidden')) return 'welcome';
    if (!DOM.questionState.classList.contains('hidden')) return 'question';
    if (!DOM.summaryState.classList.contains('hidden')) return 'summary';
    return 'welcome';
}

function applyRemoteBeadState(data) {
    state.suppressRemoteUpdate = true;

    if (data.rodCount && data.rodCount !== state.rodCount) {
        state.rodCount = data.rodCount;
        DOM.rodSelect.value = data.rodCount;
    }

    if (data.beadsState) {
        state.beadsState = JSON.parse(JSON.stringify(data.beadsState));
    }

    renderAbacus();
    updateAbacusValue();
    state.suppressRemoteUpdate = false;
}

function applyRemoteSession(data) {
    if (!data) return;

    state.allQuestions = data.allQuestions || [];
    state.currentQIndex = data.currentQIndex || 0;
    state.currentStepIndex = data.currentStepIndex || 0;
    state.runningTotal = data.runningTotal || 0;
    state.expectedAnswer = data.expectedAnswer || 0;
    state.correctCount = data.correctCount || 0;
    state.totalCount = data.totalCount || 0;
    state.streak = data.streak || 0;
    state.bestStreak = data.bestStreak || 0;
    state.totalQuestionCount = data.totalQuestionCount || 10;
    state.currentTrickId = data.currentTrickId || null;
    state.currentHint = data.currentHint || '';
    state.isCustom = data.isCustom || false;

    updateScoreDisplay();

    if (data.streak >= 2) {
        DOM.streakPill.classList.remove('hidden');
        DOM.streakDisplay.textContent = data.streak;
    } else {
        DOM.streakPill.classList.add('hidden');
    }

    if (data.screen) {
        showScreen(data.screen);
        if (data.screen === 'question' && state.allQuestions.length > 0) {
            const seq = state.allQuestions[state.currentQIndex];
            if (seq) {
                DOM.qCounter.textContent = `(${state.currentQIndex + 1} / ${state.allQuestions.length})`;
                DOM.showHintBtn.classList.remove('hidden');
                DOM.skipBtn.classList.remove('hidden');
                DOM.hintDisplay.textContent = state.currentHint ? `\ud83d\udca1 ${state.currentHint}` : "No specific formula hint.";
                DOM.hintDisplay.classList.add('hidden');
                renderQuestionSteps(seq);
                highlightCurrentStep();

                DOM.checkBtn.disabled = false;
                DOM.checkBtn.classList.remove('hidden');
                DOM.nextBtn.classList.add('hidden');
                DOM.feedbackMsg.textContent = '';
                DOM.feedbackMsg.className = 'feedback-message';
            }
        }
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = message;
    DOM.toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('toast-visible'));

    setTimeout(() => {
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ---- Scroll sync (debounced) ----
let scrollSyncTimeout = null;
function setupScrollSync() {
    window.addEventListener('scroll', () => {
        if (!state.isInRoom || !state.socket || state.suppressRemoteUpdate) return;
        clearTimeout(scrollSyncTimeout);
        scrollSyncTimeout = setTimeout(() => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            state.socket.emit('scroll-sync', { scrollPercent });
        }, 100);
    });
}

function applyRemoteScroll(scrollPercent) {
    state.suppressRemoteUpdate = true;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: scrollPercent * maxScroll, behavior: 'smooth' });
    setTimeout(() => { state.suppressRemoteUpdate = false; }, 500);
}

// ---- Detect server URL ----
// DEPLOYMENT: Replace the placeholder below with your actual Render URL
// after deploying the backend. e.g. 'https://abacus-studio-server.onrender.com'
const RENDER_BACKEND_URL = 'YOUR_RENDER_URL_HERE';

function getServerUrl() {
    // Local file:// testing → use local Node server
    if (window.location.protocol === 'file:') {
        return 'http://localhost:3001';
    }
    // GitHub Pages (*.github.io) → use Render backend
    if (window.location.hostname.includes('github.io')) {
        return RENDER_BACKEND_URL;
    }
    // Served by the Node backend directly (localhost:3001) → same origin
    return window.location.origin;
}

// ---- Main collaboration setup ----
function setupCollaboration() {
    const serverUrl = getServerUrl();

    try {
        state.socket = io(serverUrl, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000
        });
    } catch (e) {
        console.warn('Socket.IO connection failed:', e);
        return;
    }

    const socket = state.socket;

    // ---- Connection events ----
    socket.on('connect', () => {
        console.log('[Collab] Connected:', socket.id);
        if (DOM.connectionDot) DOM.connectionDot.className = 'connection-dot connected';
        if (state.roomCode && state.isInRoom) {
            // Reconnect to room
            const event = state.role === 'teacher' ? 'create-room' : 'join-room';
            if (state.role === 'student') {
                socket.emit('join-room', { code: state.roomCode, name: 'Student' }, (res) => {
                    if (res.success) {
                        showToast('\u2705 Reconnected to room', 'success');
                    }
                });
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('[Collab] Disconnected');
        if (DOM.connectionDot) DOM.connectionDot.className = 'connection-dot disconnected';
    });

    socket.on('connect_error', (err) => {
        console.warn('[Collab] Connection error:', err.message);
        if (DOM.connectionDot) DOM.connectionDot.className = 'connection-dot disconnected';
    });

    // ---- Room events ----
    socket.on('bead-update', (data) => {
        applyRemoteBeadState(data);
    });

    socket.on('scroll-sync', (data) => {
        applyRemoteScroll(data.scrollPercent);
    });

    socket.on('session-update', (data) => {
        applyRemoteSession(data);
        showToast('\ud83d\udcca Session updated by ' + (data.fromRole === 'teacher' ? 'teacher' : 'a classmate'), 'info');
    });

    socket.on('force-sync', (data) => {
        if (data.beadsState) applyRemoteBeadState(data);
        if (data.sessionState) applyRemoteSession(data.sessionState);
        if (data.scrollPercent !== undefined) applyRemoteScroll(data.scrollPercent);
        showToast('\u27f2 State synced by teacher', 'info');
    });

    socket.on('rod-change', (data) => {
        state.suppressRemoteUpdate = true;
        DOM.rodSelect.value = data.rodCount;
        resetAbacusState(data.rodCount);
        renderAbacus();
        state.suppressRemoteUpdate = false;
    });

    socket.on('abacus-reset', () => {
        state.suppressRemoteUpdate = true;
        resetAbacusState(state.rodCount);
        renderAbacus();
        state.suppressRemoteUpdate = false;
        showToast('\u21ba Abacus reset', 'info');
    });

    socket.on('student-joined', (data) => {
        showToast(`\ud83d\udc4b ${data.name} joined the room`, 'success');
    });

    socket.on('student-left', (data) => {
        showToast(`\ud83d\udc4b ${data.name} left the room`, 'warning');
    });

    socket.on('teacher-left', () => {
        showToast('\u26a0\ufe0f Teacher has left the room', 'warning');
    });

    socket.on('user-count-update', (data) => {
        DOM.roomUserCount.textContent = data.count;
    });

    socket.on('room-expired', (data) => {
        showToast('\u23f0 ' + data.message, 'warning');
        resetRoomUI();
    });

    // ---- Room UI events ----
    DOM.createRoomBtn.addEventListener('click', () => {
        socket.emit('create-room', { name: 'Teacher' }, (res) => {
            if (res.success) {
                state.roomCode = res.roomCode;
                state.role = 'teacher';
                state.isInRoom = true;
                showConnectedUI(res.roomCode, 'Teacher');
                showToast(`\u2726 Room created! Code: <strong>${res.roomCode}</strong>`, 'success');
            }
        });
    });

    DOM.joinRoomBtn.addEventListener('click', () => {
        const code = DOM.joinRoomInput.value.toUpperCase().trim();
        if (!code || code.length < 4) {
            showToast('\u26a0\ufe0f Please enter a valid room code', 'warning');
            return;
        }
        socket.emit('join-room', { code, name: 'Student' }, (res) => {
            if (res.success) {
                state.roomCode = res.roomCode;
                state.role = 'student';
                state.isInRoom = true;
                showConnectedUI(res.roomCode, 'Student');
                showToast(`\u2705 Joined room! Teacher: ${res.teacherName}`, 'success');

                // Apply current state from teacher
                if (res.currentState) {
                    if (res.currentState.beadsState) {
                        applyRemoteBeadState(res.currentState);
                    }
                    if (res.currentState.sessionState) {
                        applyRemoteSession(res.currentState.sessionState);
                    }
                    if (res.currentState.scrollPercent !== undefined) {
                        setTimeout(() => applyRemoteScroll(res.currentState.scrollPercent), 500);
                    }
                }
            } else {
                showToast(`\u274c ${res.error}`, 'error');
            }
        });
    });

    // Enter key on join input
    DOM.joinRoomInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') DOM.joinRoomBtn.click();
    });

    // Auto-uppercase room code input
    DOM.joinRoomInput.addEventListener('input', () => {
        DOM.joinRoomInput.value = DOM.joinRoomInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    });

    // Copy room code
    DOM.roomCodeDisplay.addEventListener('click', () => {
        if (state.roomCode) {
            navigator.clipboard.writeText(state.roomCode).then(() => {
                showToast('\ud83d\udccb Room code copied!', 'success');
            }).catch(() => {
                showToast(`Room code: ${state.roomCode}`, 'info');
            });
        }
    });

    // Force sync
    DOM.forceSyncBtn.addEventListener('click', () => {
        if (!state.isInRoom) return;
        socket.emit('force-sync', {
            beadsState: JSON.parse(JSON.stringify(state.beadsState)),
            abacusValue: state.abacusValue,
            rodCount: state.rodCount,
            sessionState: {
                allQuestions: state.allQuestions,
                currentQIndex: state.currentQIndex,
                currentStepIndex: state.currentStepIndex,
                runningTotal: state.runningTotal,
                expectedAnswer: state.expectedAnswer,
                correctCount: state.correctCount,
                totalCount: state.totalCount,
                streak: state.streak,
                bestStreak: state.bestStreak,
                totalQuestionCount: state.totalQuestionCount,
                currentTrickId: state.currentTrickId,
                currentHint: state.currentHint,
                isCustom: state.isCustom,
                screen: getCurrentScreen()
            },
            scrollPercent: window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        });
        showToast('\u27f2 Force sync sent to all users', 'info');
    });

    // Leave room
    DOM.leaveRoomBtn.addEventListener('click', () => {
        socket.emit('leave-room');
        resetRoomUI();
        showToast('\ud83d\udc4b Left the room', 'info');
    });

    // ---- Hook existing events to emit sync ----
    // Override rod select change to also emit
    const origRodHandler = () => {
        if (!state.isInRoom || !state.socket || state.suppressRemoteUpdate) return;
        state.socket.emit('rod-change', { rodCount: state.rodCount });
    };
    DOM.rodSelect.addEventListener('change', origRodHandler);

    // Override reset button to also emit
    DOM.resetBtn.addEventListener('click', () => {
        if (!state.isInRoom || !state.socket || state.suppressRemoteUpdate) return;
        state.socket.emit('abacus-reset');
    });

    setupScrollSync();
}

function showConnectedUI(roomCode, role) {
    DOM.roomBarIdle.classList.add('hidden');
    DOM.roomBarConnected.classList.remove('hidden');
    DOM.roomCodeValue.textContent = roomCode;
    DOM.roomRoleBadge.textContent = role;
    DOM.roomRoleBadge.className = `room-role-badge role-${role.toLowerCase()}`;
    DOM.connectionDot.className = 'connection-dot connected';
    DOM.roomUserCount.textContent = '1';
}

function resetRoomUI() {
    state.roomCode = null;
    state.role = null;
    state.isInRoom = false;
    DOM.roomBarIdle.classList.remove('hidden');
    DOM.roomBarConnected.classList.add('hidden');
    DOM.joinRoomInput.value = '';
}

// ---- Patch startSession to emit session sync ----
const _originalStartSession = startSession;
startSession = function() {
    _originalStartSession();
    emitSessionUpdate();
};

// ---- Patch advanceStep to emit session sync ----
const _originalAdvanceStep = advanceStep;
advanceStep = function() {
    _originalAdvanceStep();
    emitSessionUpdate();
};

// ---- Patch checkAnswer to emit sync ----
const _originalCheckAnswer = checkAnswer;
checkAnswer = function() {
    _originalCheckAnswer();
    emitSessionUpdate();
    emitBeadUpdate();
};


// --- Boot ---
window.addEventListener('DOMContentLoaded', init);
