# Abacus Studio — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** April 9, 2026  
**Author:** Varun (MathEinstein)  
**Stakeholder:** Nehu (Abacus Teacher & Champion)

---

## 1. Problem Statement

Nehu teaches abacus one-on-one to kids online (via Preply). Her current workflow is broken in three ways:

**Pain 1 — Screen-share swapping:** She shares her screen to demonstrate on a digital abacus. When she wants the student to show their work, she must stop her screen-share, ask the child to start theirs, and guide them through it. Kids get confused, time is wasted, and the flow breaks.

**Pain 2 — Fragmented tools:** Questions go on a whiteboard, mental math happens verbally, and the abacus is a separate link. Switching between three surfaces creates cognitive load for young learners.

**Pain 3 — Student drop-off:** Most abacus students quit within 3–4 months. The root causes are boredom and lack of smooth interaction. The current tooling makes lessons feel effortful rather than engaging.

**Market gap observed by Nehu:** No existing digital abacus platform combines an interactive abacus + level-based question generation + real-time teacher-student collaboration in a single interface.

---

## 2. Vision

A single interactive web tool where teacher and student see the same abacus, manipulate it together in real-time, and work through auto-generated questions — all without ever switching tabs, sharing screens, or breaking flow.

**One-liner:** "The Google Docs of abacus teaching — one shared abacus, both hands on it."

---

## 3. Users & Personas

| Persona | Description | Primary Need |
|---|---|---|
| **Teacher (Nehu)** | Abacus expert, teaches 1-on-1 online, manages multiple students across levels | Configure abacus, select level/trick, generate questions, monitor student's bead movements, intervene/assist in real-time |
| **Student (Age 5–12)** | Beginner to intermediate abacus learner, limited tech comfort | Simple UI, see one question at a time, move beads, get instant feedback |
| **Parent (observer)** | May sit alongside younger kids | See progress, understand what the child is learning |

---

## 4. Feature Requirements

### 4.1 Interactive Abacus (Core)

| # | Requirement | Priority | Status |
|---|---|---|---|
| 4.1.1 | Soroban-style abacus: 1 upper bead (value 5), 4 lower beads (value 1 each) per rod | P0 | ✅ Built |
| 4.1.2 | Configurable number of rods: minimum 3, maximum 13 | P0 | ✅ Built |
| 4.1.3 | Teacher can set rod count before/during session (e.g., "just give me a 5-rod abacus") | P0 | ✅ Built |
| 4.1.4 | Beads are clickable/tappable to move up and down | P0 | ✅ Built |
| 4.1.5 | Current numeric value displayed below abacus | P0 | ✅ Built |
| 4.1.6 | Rod labels showing place value (1s, 10s, 100s…) | P1 | ✅ Built |
| 4.1.7 | Reset button to clear abacus to zero | P0 | ✅ Built |
| 4.1.8 | Enlarged/zoomed view when fewer rods are selected (Nehu: "enlarged view hoga") | P1 | ✅ Built |

### 4.2 Real-Time Collaboration (Phase 2)

| # | Requirement | Priority | Status |
|---|---|---|---|
| 4.2.1 | Shareable room/session link — teacher sends link, student joins | P0 | 🔲 Planned |
| 4.2.2 | Both teacher and student see the same abacus state in real-time | P0 | 🔲 Planned |
| 4.2.3 | Both can manipulate beads simultaneously — changes sync instantly | P0 | 🔲 Planned |
| 4.2.4 | Teacher can "lock" abacus (student view-only) for demonstrations | P1 | 🔲 Planned |
| 4.2.5 | Teacher can "unlock" for student to attempt | P1 | 🔲 Planned |
| 4.2.6 | Visual indicator showing who moved which bead (color-coded cursors) | P2 | 🔲 Planned |

### 4.3 Level System

| # | Requirement | Priority | Status |
|---|---|---|---|
| 4.3.1 | 8 levels following standard abacus curriculum | P0 | ✅ Built |
| 4.3.2 | Level 1: Direct addition & subtraction (no formula) | P0 | ✅ Built |
| 4.3.3 | Level 2: Small Friend formulas (complement of 5) — 8 formulas | P0 | ✅ Built |
| 4.3.4 | Level 3: Big Friend formulas (complement of 10) — 18 formulas | P0 | ✅ Built |
| 4.3.5 | Level 4: Combination/Mix Friend formulas — 8 formulas | P0 | ✅ Built |
| 4.3.6 | Level 5–8: Multi-digit extensions of all above | P0 | ✅ Built |
| 4.3.7 | Teacher selects student's level; only relevant tricks appear | P0 | ✅ Built |

### 4.4 Trick-Based Question Generation

| # | Requirement | Priority | Status |
|---|---|---|---|
| 4.4.1 | Teacher selects a specific trick (e.g., "Small Friend Addition") | P0 | ✅ Built |
| 4.4.2 | System auto-generates 10 questions targeting that trick | P0 | ✅ Built |
| 4.4.3 | One question displayed at a time (Nehu: "bas ek question display ho") | P0 | ✅ Built |
| 4.4.4 | "Next" button to advance to next question | P0 | ✅ Built |
| 4.4.5 | Questions are contextually correct — they force the student to actually use the selected formula | P0 | ✅ Built |
| 4.4.6 | Configurable question count per session (5, 10, 15, 20) | P1 | 🔲 Planned |
| 4.4.7 | Difficulty scaling within a trick (simple → complex within same formula) | P2 | 🔲 Planned |

### 4.5 Answer Checking & Feedback

| # | Requirement | Priority | Status |
|---|---|---|---|
| 4.5.1 | "Check Answer" button compares abacus value to correct answer | P0 | ✅ Built |
| 4.5.2 | Visual feedback: green celebration for correct, red for incorrect | P0 | ✅ Built |
| 4.5.3 | Show correct answer on wrong attempt | P0 | ✅ Built |
| 4.5.4 | Running score counter (correct/total) | P0 | ✅ Built |
| 4.5.5 | Session summary at end of question set | P1 | ✅ Built |

### 4.6 Formula Reference

| # | Requirement | Priority | Status |
|---|---|---|---|
| 4.6.1 | Complete formula reference sheet: all 34 formulas across 4 categories | P0 | ✅ Built |
| 4.6.2 | In-practice "Show Formula Hint" toggle | P0 | ✅ Built |
| 4.6.3 | Formulas grouped by category with visual distinction | P1 | ✅ Built |

### 4.7 Custom Questions (Teacher-Added)

| # | Requirement | Priority | Status |
|---|---|---|---|
| 4.7.1 | Teacher can manually input custom number sequences as questions | P0 | ✅ Built |
| 4.7.2 | Custom questions stored in session and playable as a practice set | P0 | ✅ Built |
| 4.7.3 | Delete individual custom questions | P0 | ✅ Built |
| 4.7.4 | Save custom question sets for reuse across sessions (persistent storage) | P1 | 🔲 Planned |

### 4.8 Layout & UX

| # | Requirement | Priority | Status |
|---|---|---|---|
| 4.8.1 | Abacus positioned at TOP of the screen (Nehu: "top sahi rahega") | P0 | ✅ Built |
| 4.8.2 | Question displayed BELOW the abacus | P0 | ✅ Built |
| 4.8.3 | Mobile-responsive (students often join from phones/tablets) | P1 | ✅ Built |
| 4.8.4 | Large, touch-friendly bead targets for young children | P0 | ✅ Built |
| 4.8.5 | Minimal UI — no clutter, child-friendly colors | P0 | ✅ Built |
| 4.8.6 | No login required for student (just open link and start) | P1 | 🔲 Planned |

---

## 5. Abacus Domain Knowledge (Built Into System)

### 5.1 Standard Soroban Structure
- Each rod has 1 upper bead (heaven bead, value = 5) and 4 lower beads (earth beads, value = 1 each)
- Rods represent place values: ones, tens, hundreds, thousands, etc.
- Beads are "activated" by pushing them toward the horizontal bar

### 5.2 The 34 Standard Formulas

**Small Friend (complement of 5) — 8 formulas:**
- Addition: +1=+5−4, +2=+5−3, +3=+5−2, +4=+5−1
- Subtraction: −1=−5+4, −2=−5+3, −3=−5+2, −4=−5+1

**Big Friend (complement of 10) — 18 formulas:**
- Addition: +1=+10−9, +2=+10−8, +3=+10−7, +4=+10−6, +5=+10−5, +6=+10−4, +7=+10−3, +8=+10−2, +9=+10−1
- Subtraction: −1=−10+9, −2=−10+8, −3=−10+7, −4=−10+6, −5=−10+5, −6=−10+4, −7=−10+3, −8=−10+2, −9=−10+1

**Combination/Mix Friend — 8 formulas:**
- Addition: +6=+10−5+1, +7=+10−5+2, +8=+10−5+3, +9=+10−5+4
- Subtraction: −6=−10+5−1, −7=−10+5−2, −8=−10+5−3, −9=−10+5−4

### 5.3 Level Progression (Standard Curriculum)
1. Direct (no formula)
2. Small Friend
3. Big Friend
4. Combination
5. 2-digit Direct
6. 2-digit Small Friend
7. 2-digit Big Friend
8. 2-digit All formulas combined

---

## 6. Architecture & Tech (Current & Planned)

### Phase 1 — Current (Standalone Artifact)
- **Stack:** React (single-file JSX artifact in Claude)
- **State:** Local React state, no persistence
- **Deployment:** Runs inside Claude artifact viewer
- **Limitation:** Single-user only (no real-time sync)

### Phase 2 — Deployed App (Planned)
- **Frontend:** React / Next.js
- **Real-time sync:** WebSocket (Socket.io) or Firebase Realtime Database
- **Session management:** Room codes — teacher creates room, student joins via link/code
- **Backend:** Node.js or serverless (Firebase Cloud Functions)
- **Database:** Firestore (session data, custom question sets, student progress)
- **Auth:** Google Sign-In for teacher, no auth for students (join via link)
- **Hosting:** Vercel or Firebase Hosting

---

## 7. Success Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Screen-share switches per lesson | 0 (down from 3–5) | Core pain point eliminated |
| Average lesson prep time | < 2 min (select level + trick) | Teacher efficiency |
| Student retention beyond 4 months | > 60% | Addresses drop-off problem |
| Student engagement (questions completed per session) | 15–20 | Smooth flow = more practice |
| Time wasted on tool-switching per lesson | < 30 sec (down from 5–8 min) | Direct time savings |

---

## 8. Roadmap

| Phase | Scope | Timeline |
|---|---|---|
| **Phase 1 (MVP)** | Interactive abacus + levels + tricks + question gen + custom Qs — single user | ✅ Done |
| **Phase 2** | Real-time collaboration (shared room, WebSocket sync) | 2–3 weeks |
| **Phase 3** | Student progress tracking, saved question banks, session history | 2 weeks |
| **Phase 4** | Timer mode, speed drills, gamification (streaks, badges) | 2 weeks |
| **Phase 5** | Multiplication & division support (Levels 9–10) | 1–2 weeks |

---

## 9. Open Questions (Nehu to Confirm)

1. Are the 8 levels and trick names exactly right, or does her curriculum use different naming?
2. How many questions per session is ideal? (Currently 10, configurable later)
3. Should the student see the formula hints, or only the teacher?
4. Does she want a "demo mode" where she controls and student watches?
5. Any specific question formats beyond addition/subtraction chains?
6. Does she need multiplication/division tables on the abacus?
7. Preferred color scheme or branding?
8. "Nehu mentioned details will be sent later" — pending input on additional requirements.

---

*This PRD is a living document. Updates will be made as Nehu provides additional details on tricks, levels, and workflow preferences.*
