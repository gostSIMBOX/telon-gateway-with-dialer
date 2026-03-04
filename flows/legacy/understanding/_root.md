# Understanding: Project Root

> Entry point for recursive understanding. Children are top-level logical domains.

## Project Overview

**React Native Telephony Gateway** - A mobile dialer application that integrates with native Android telephony services and SIP (Session Initiation Protocol) for VoIP calls.

**Key Technologies:**
- React Native 0.61.5
- Custom native modules: `react-native-tele`, `react-native-replace-dialer`, `react-native-sip`
- Redux for state management
- PJSIP protocol for SIP calls

**Core Functionality:**
1. Incoming/outgoing call management via native Android telephony
2. SIP account registration and call handling
3. Call state machine (NULL → CALLING → INCOMING → EARLY → CONNECTING → CONFIRMED → DISCONNECTED)
4. Call operations: answer, decline, hangup, hold, mute, speaker, DTMF, transfer

## Identified Domains

> Logical domains discovered. Each becomes a child directory for deeper exploration.

| Domain | Hypothesis | Priority | Status |
|--------|------------|----------|--------|
| telephony-endpoint | Native Android telephony integration via TeleModule | HIGH | PENDING |
| sip-signaling | SIP protocol handling via PjSipModule/Endpoint | HIGH | PENDING |
| call-state-machine | Call lifecycle and state transitions | HIGH | PENDING |
| call-ui-presentation | CallScreen UI, animations, controls | MEDIUM | PENDING |
| native-bridge | React Native bridge to native Android services | HIGH | PENDING |

## Source Mapping

> Which source paths map to which logical domains

| Source Path | -> Domain |
|-------------|----------|
| src/modules/tele.js | telephony-endpoint |
| src/modules/tele_endpoint.js | telephony-endpoint, call-state-machine |
| src/modules/pjsip.js | sip-signaling |
| src/modules/call.js | call-state-machine |
| src/screens/CallScreen/ | call-ui-presentation |
| src/containers/ | call-ui-presentation |
| src/index.js | native-bridge (app entry) |

## Cross-Cutting Concerns

> Things that span multiple domains (may become ADRs)

1. **Event-driven architecture**: EventEmitter pattern for call events (call_received, call_changed, call_terminated)
2. **State synchronization**: Native Android state → React Native state → UI updates
3. **Dual-path support**: Both native telephony (Tele) and SIP (PjSip) paths exist

## Children Spawned

```
1. telephony-endpoint
2. sip-signaling
3. call-state-machine
4. call-ui-presentation
5. native-bridge
```

## Flow Recommendations

Based on initial analysis:

| Domain | Recommended Flow | Rationale |
|--------|-----------------|-----------|
| telephony-endpoint | SDD | Internal service logic, native integration |
| sip-signaling | SDD | Internal service logic, protocol implementation |
| call-state-machine | TDD | Correctness-critical state transitions |
| call-ui-presentation | VDD | User experience primary, visual interactions |
| native-bridge | ADR | Architectural decisions on bridge patterns |

## Synthesis

> Updated after all children complete

[pending children completion]

---

*Created by /legacy ENTERING phase, updated EXPLORING*
