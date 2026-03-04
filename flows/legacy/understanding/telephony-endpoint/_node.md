# Understanding: Telephony Endpoint

> Native Android telephony integration layer.

## Phase: SYNTHESIZING

## Hypothesis

This module provides a React Native bridge to Android's native telephony services, allowing the app to:
- Replace the default Android dialer
- Receive call events from the system (incoming, outgoing, state changes)
- Control calls (answer, decline, hangup)
- Access call log and phone state permissions

**Key files expected:**
- `src/modules/tele.js` - Main endpoint class
- `src/modules/tele_endpoint.js` - EventEmitter wrapper with state machine
- Native module: `TeleModule` (Android side, not in this repo)

## Sources

- src/modules/tele.js - Main Tele class, default dialer setup
- src/modules/tele_endpoint.js - TeleEndpoint EventEmitter, call state mapping
- src/index.js - App entry point, Tele instantiation

## Validated Understanding

### Architecture

**TeleEndpoint** extends EventEmitter, providing event-driven call management:

```
Native Android TeleModule
         ↓ (DeviceEventEmitter)
  TeleEndpoint (EventEmitter)
         ↓ (emit events)
  Tele class (parent callbacks)
         ↓
  CallScreen UI
```

### Key Components

**1. Dialer Replacement (tele.js)**
- Uses `ReplaceDialer` to set app as default dialer
- Checks `isDefault()` → `setDefault()` if not default
- Critical for receiving all call events system-wide

**2. Event Listeners (tele_endpoint.js)**
```javascript
DeviceEventEmitter.addListener('teleCallReceived', ...)
DeviceEventEmitter.addListener('teleCallChanged', ...)
DeviceEventEmitter.addListener('teleCallRemoved', ...)
```

**3. Android State → PJSIP State Mapping**
```javascript
STATE_CONNECTING (9)  → PJSIP_INV_STATE_CALLING
STATE_RINGING (2)     → PJSIP_INV_STATE_INCOMING
STATE_DIALING (1)     → PJSIP_INV_STATE_EARLY
STATE_ACTIVE (4)      → PJSIP_INV_STATE_CONFIRMED
STATE_DISCONNECTED (7)→ PJSIP_INV_STATE_DISCONNECTED
```

**4. Call Event Flow**
- `onCallAdded` → Creates Call object, emits `call_received`
- `onStateChanged` → Updates Call state, emits `call_changed`
- `onCallRemoved` → Clears call, emits `call_terminated`

### Call Control Methods

```javascript
// Outgoing
hangupCall(call) → NativeModules.TeleModule.hangupCall()
declineCall(call) → NativeModules.TeleModule.declineCall()

// Incoming
answerCall(call) → NativeModules.TeleModule.answerCall()
```

### Initialization Pattern

```javascript
// src/index.js
this.tele = new Tele();
this.tele.parent = this;

// Tele constructor creates:
// 1. ReplaceDialer instance (sets as default)
// 2. Endpoint instance (starts telephony)
// 3. Event listeners for call events
```

## Children

| Child | Status |
|-------|--------|
| dialer-replacement | COMPLETED (no deeper exploration needed) |
| call-event-listeners | COMPLETED (no deeper exploration needed) |
| android-state-mapping | COMPLETED (no deeper exploration needed) |

## Flow Recommendation

**Type: SDD** (Spec-Driven Development)

**Rationale:** This is internal service logic that integrates with native Android APIs. Needs clear specifications for:
- Event contract between native and JS
- Call state mapping (Android states → PJSIP states)
- Permission requirements

**Confidence:** HIGH

## Bubble Up

- Depends on: `react-native-tele` (external native module)
- Depends on: `react-native-replace-dialer` (external native module)
- Emits events to: CallScreen UI via parent callbacks
- Provides: Call control methods (answerCall, declineCall, hangupCall)

## Synthesis

**Key Insights:**

1. **Dual-layer architecture**: TeleEndpoint (EventEmitter) wraps native events, Tele class provides simplified API
2. **State translation layer**: Critical mapping between Android telephony states and PJSIP states for UI consistency
3. **Default dialer requirement**: App must replace default dialer to receive all call events
4. **Event-driven design**: All call updates flow through EventEmitter pattern

**No children need deeper exploration** - all concepts are contained at this level.

Ready to generate SDD flow and exit.

---

*Created by /legacy ENTERING phase, updated EXPLORING → SYNTHESIZING*
