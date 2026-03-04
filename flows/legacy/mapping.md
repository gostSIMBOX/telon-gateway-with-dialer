# Code to Flow Mapping

## Overview

Maps analyzed code modules to generated flows.

## Flow Type Detection Rules

| Indicator | Flow Type |
|-----------|-----------|
| `*.test.*`, `*.spec.*`, `__tests__/` | TDD |
| `components/`, `*.tsx`, `*.vue`, `templates/` | VDD |
| `README.md`, public exports, API docs | DDD |
| Internal logic, no UI, no public API | SDD |

## Mapping Table

| Code Path | Flow | Type | Action | Status | Notes |
|-----------|------|------|--------|--------|-------|
| src/modules/tele.js | sdd-telephony-endpoint | SDD | CREATED | DRAFT | Native telephony integration |
| src/modules/tele_endpoint.js | sdd-telephony-endpoint | SDD | CREATED | DRAFT | Event-driven endpoint |
| src/modules/call.js | tdd-call-state-machine | TDD | CREATED | DRAFT | Call data model, state machine |
| src/index.js (Tele init) | sdd-telephony-endpoint | SDD | CREATED | DRAFT | App entry, Tele instantiation |
| src/modules/pjsip.js | sdd-sip-signaling | SDD | CREATED | DRAFT | SIP/VoIP integration |
| src/modules/pjsip_old.js | sdd-sip-signaling | SDD | CREATED | DRAFT | Dead code (marked for removal) |
| src/screens/CallScreen/ | vdd-call-ui-presentation | VDD | CREATED | DRAFT | Call UI, animations, modals |
| src/containers/AppViewport.android.js | vdd-call-ui-presentation | VDD | CREATED | DRAFT | App container |
| src/components/call/* | vdd-call-ui-presentation | VDD | CREATED | DRAFT | Call UI components |

## ADR Mapping

| Code Pattern | ADR | Type | Status |
|--------------|-----|------|--------|
| Dual-path: Tele + Pjsip | adr-001-dual-path-architecture | enabling | DRAFT | Tele (native) + Pjsip (VoIP) parallel architecture |

## Unmapped (needs manual review)

| Code Path | Reason |
|-----------|--------|
| src/modules/navigation.js | Navigation logic - may need SDD |
| src/modules/configureStore.js | Redux store setup - may need SDD |
| src/modules/event-handler.js | Event handling stub - needs review |
| src/assets/ | Static assets - out of scope |

---

*Auto-generated. Update as analysis progresses.*
