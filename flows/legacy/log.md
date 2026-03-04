# Legacy Analysis Log

## Session: 2026-03-04 - BFS from Project Root

**Mode:** BFS
**Target:** Project root (full analysis)

### Iteration 5: Call UI Presentation Analysis
**Analyzed:**
- src/screens/CallScreen/index.js - CallScreen component (722 lines)
- src/screens/CallScreen/anim.js - Animation logic
- src/containers/AppViewport.android.js - App container
- src/components/call/* - 13 call UI subcomponents

**Discoveries:**
- CallScreen with animated state transitions (INCOMING → ACTIVE → DISCONNECTED)
- Layout: Percent-based (avatar 30%, info 12%, state 8%, actions 40%, buttons 64px)
- Animation: React Native Animated API with parallel transitions
- Components: CallInfo, CallAvatar, CallState, CallControls, CallActions, CallParallelInfo
- Modals: IncomingCallModal, DtmfModal, TransferModal, DialerModal
- Visual: Linear gradient background (#2a5743 → #14456f)
- Redux integration: Call data from store, callbacks passed as props
- Advanced features: DTMF, call transfer, add call, hold/mute/speaker

**Created:**
- VDD-call-ui-presentation: Visual call interface (DRAFT)
  - 01-requirements.md (12 visual, 4 interaction, 2 responsive, 2 accessibility, 3 non-functional)
  - components/02-component-catalog.md (10 component specifications)

**UI States:**
| State | Avatar | Info | Actions | Buttons |
|-------|--------|------|---------|---------|
| INCOMING | visible | visible | hidden | answer/decline |
| ACTIVE | hidden | visible | visible | hangup |
| DISCONNECTED | hidden | visible | hidden | minimal |

### Iteration 4: Call State Machine Analysis
**Analyzed:**
- src/modules/call.js - Call data model (280 lines)
- src/modules/tele_endpoint.js - State mapping logic (partial)

**Discoveries:**
- Unified Call model for both Tele and Pjsip paths
- PJSIP state machine (7 states): NULL → CALLING/INCOMING → EARLY → CONNECTING → CONFIRMED → DISCONNECTED
- Live duration calculation using timestamp offsets (avoids state sync issues)
- URI parsing for multiple formats: sip:, tel:, with/without display names
- Formatted duration output: "MM:SS" or "HH:MM:SS"
- Boolean state checks: isHeld(), isMuted(), isSpeaker(), isTerminated()
- Pure JavaScript, no external dependencies

**Created:**
- TDD-call-state-machine: Call lifecycle and state machine (DRAFT)
  - 01-requirements.md (8 functional, 4 non-functional requirements)
  - tests/02-test-specifications.md (comprehensive test suite)

**Test Coverage:**
- URI parsing: 7 test cases (all formats + edge cases)
- Duration calculation: 4 test cases (connected, disconnected, negative)
- Duration formatting: 6 test cases (zero, seconds, minutes, hours, invalid)
- State checks: 3 test cases (all 7 states)
- Media state: 3 test cases (held, muted, speaker)
- Integration: 1 test case (full lifecycle)

### Iteration 3: SIP Signaling Analysis
**Analyzed:**
- src/modules/pjsip.js - Complete Pjsip class implementation
- src/modules/pjsip_old.js - Legacy/dead code fragment

**Discoveries:**
- SIP/VoIP integration via react-native-sip (PJSIP wrapper)
- Account registration with configurable SIP servers
- STUN configuration for NAT traversal (Google public STUN)
- Network-type filtering (WiFi, 3G, EDGE, GPRS, roaming)
- Event-driven: registration_changed, connectivity_changed, call_* events
- **Bug found:** call_changed event calls onCallTerminated() instead of onCallChanged()
- **Security issue:** Hardcoded SIP credentials (username: 50363, password: pass50363)
- **Dead code:** pjsip_old.js should be removed

**Created:**
- SDD-sip-signaling: SIP/VoIP integration layer (DRAFT)
  - 01-requirements.md (7 functional, 4 non-functional requirements)
- ADR-001-dual-path-architecture: Tele + Pjsip parallel architecture (DRAFT)
  - context.md (decision, consequences, alternatives)

**Issues Identified:**
1. Hardcoded credentials → Move to secure storage
2. Dead code (pjsip_old.js) → Remove file
3. Event handler bug → Fix callback mapping
4. Missing cleanup → Add componentWillUnmount

### Iteration 2: Root Analysis
**Analyzed:**
- package.json: React Native 0.61.5, custom native modules
- src/modules/: tele.js, tele_endpoint.js, pjsip.js, call.js
- src/screens/CallScreen/: UI component structure
- src/index.js: App entry point, Tele instantiation

**Discoveries:**
- React Native telephony gateway application
- Dual-path architecture: Native Android Telephony + SIP (PJSIP)
- Event-driven design with EventEmitter pattern
- Call state machine: NULL → CALLING → INCOMING → EARLY → CONFIRMED → DISCONNECTED
- Android state mapping to PJSIP states for UI consistency

**Created:**
- SDD-telephony-endpoint: Native telephony integration layer (DRAFT)
  - 01-requirements.md
  - specification/02-specifications.md

### Iteration 1: Workspace Initialization
- Initialized flows/legacy/ from flows/.templates/legacy/
- No existing flows found (fresh start)

**Next depth:**
- call-ui-presentation domain (CallScreen UI, animations, controls)
- native-bridge domain (React Native bridge patterns)

---

*Append new entries at the top.*
