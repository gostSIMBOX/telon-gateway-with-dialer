# Understanding: Call State Machine

> Call lifecycle management and state transitions.

## Phase: SYNTHESIZING

## Hypothesis

This domain covers the Call data model and state machine that represents call lifecycle from initiation to termination. The state machine is based on PJSIP states but is used uniformly for both native telephony and SIP calls.

**Key files:**
- `src/modules/call.js` - Call class with state management
- `src/modules/tele_endpoint.js` - State transition logic (Android → PJSIP)

## Sources

- src/modules/call.js - Call data model (280 lines)
- src/modules/tele_endpoint.js - State mapping logic
- src/modules/pjsip.js - SIP call events

## Validated Understanding

### Call States (PJSIP-based)

```
PJSIP_INV_STATE_NULL           → Initial state (before INVITE sent/received)
PJSIP_INV_STATE_CALLING        → After INVITE sent (outgoing call)
PJSIP_INV_STATE_INCOMING       → After INVITE received (incoming call)
PJSIP_INV_STATE_EARLY          → After response with To tag (early media)
PJSIP_INV_STATE_CONNECTING     → After 2xx sent/received
PJSIP_INV_STATE_CONFIRMED      → After ACK sent/received (call established)
PJSIP_INV_STATE_DISCONNECTED   → Session terminated
```

### State Transitions

**Outgoing Call:**
```
NULL → CALLING → EARLY → CONNECTING → CONFIRMED → DISCONNECTED
                  ↑
              (ringing)
```

**Incoming Call:**
```
NULL → INCOMING → EARLY → CONNECTING → CONFIRMED → DISCONNECTED
```

### Call.js Class Structure

**Constructor Parameters:**
- Call identification: `id`, `callId`, `accountId`
- URI information: `localContact`, `localUri`, `remoteContact`, `remoteUri`
- State: `state`, `stateText`, `held`, `muted`, `speaker`
- Timing: `connectDuration`, `totalDuration`, `creationTime`, `connectTime`
- Media: `remoteOfferer`, `remoteAudioCount`, `remoteVideoCount`, `audioCount`, `videoCount`
- Status: `lastStatusCode`, `lastReason`, `media`, `provisionalMedia`

**Parsed Fields:**
- `remoteNumber` - Extracted from remoteUri (tel: or sip: URI)
- `remoteName` - Extracted from remoteUri (quoted string)

**Key Methods:**
- `getId()`, `getCallId()`, `getAccountId()` - Identification
- `getState()`, `getStateText()` - State accessors
- `getRemoteName()`, `getRemoteNumber()`, `getRemoteFormattedNumber()` - Caller info
- `getTotalDuration()`, `getConnectDuration()` - Live duration calculation
- `getFormattedTotalDuration()`, `getFormattedConnectDuration()` - MM:SS format
- `isHeld()`, `isMuted()`, `isSpeaker()`, `isTerminated()` - Boolean state checks

### Duration Calculation

**Live calculation using timestamps:**
```javascript
getTotalDuration() {
  const time = Math.round(new Date().getTime() / 1000);
  const offset = time - this._constructionTime;
  return this._totalDuration + offset;
}

getConnectDuration() {
  if (this._connectDuration < 0 || 
      this._state == "PJSIP_INV_STATE_DISCONNECTED") {
    return this._connectDuration;
  }
  const time = Math.round(new Date().getTime() / 1000);
  const offset = time - this._constructionTime;
  return offset; // Connected duration
}
```

**Rationale:** Avoids continuous state updates from native layer. UI calls this on each render for real-time display.

### Android State → PJSIP State Mapping

**From tele_endpoint.js:**
```javascript
STATE_CONNECTING (9)    → PJSIP_INV_STATE_CALLING
STATE_RINGING (2)       → PJSIP_INV_STATE_INCOMING
STATE_DIALING (1)       → PJSIP_INV_STATE_EARLY
STATE_ACTIVE (4)        → PJSIP_INV_STATE_CONFIRMED
STATE_DISCONNECTED (7)  → PJSIP_INV_STATE_DISCONNECTED
STATE_DISCONNECTING (10)→ PJSIP_INV_STATE_DISCONNECTED
```

### URI Parsing

**Remote URI formats:**
```javascript
// SIP URI with name
"John Doe" <sip:12345@sip.example.com>
→ remoteName = "John Doe"
→ remoteNumber = "12345"

// SIP URI without name
sip:12345@sip.example.com
→ remoteName = null
→ remoteNumber = "12345"

// Tel URI
tel:+79001234567
→ remoteName = null
→ remoteNumber = "+79001234567"

// Tel URI with encoding
tel:%2B79219542499
→ remoteNumber = "+79219542499" (after decodeURIComponent)
```

## Children

| Child | Status |
|-------|--------|
| state-transitions | COMPLETED (no deeper exploration needed) |
| duration-calculation | COMPLETED (no deeper exploration needed) |
| uri-parsing | COMPLETED (no deeper exploration needed) |

## Flow Recommendation

**Type: TDD** (Test-Driven Development)

**Rationale:** State machine is correctness-critical. Incorrect state transitions can cause:
- Call duration calculation errors
- UI showing wrong call status
- Missed call events
- Memory leaks (calls not properly terminated)

**Confidence:** HIGH

## Bubble Up

- Depends on: None (pure JavaScript data model)
- Used by: telephony-endpoint, sip-signaling, call-ui-presentation
- Provides: Unified call representation for both Tele and Pjsip

## Synthesis

**Key Insights:**

1. **Unified model**: Call class is used by both Tele and Pjsip paths, providing consistent API
2. **Live duration**: Duration calculated on-demand, not stored (avoids state sync issues)
3. **PJSIP state adoption**: Native Android states mapped to PJSIP for UI consistency
4. **URI parsing complexity**: Handles multiple URI formats (sip:, tel:, with/without names)
5. **No external dependencies**: Pure JavaScript, no native module dependencies

**No children need deeper exploration** - all concepts are contained at this level.

**TDD Justification:**
- State machine has 7 distinct states with specific transitions
- Duration calculation must handle edge cases (disconnected, negative values)
- URI parsing has multiple formats to handle correctly
- Boolean state checks (held, muted, speaker) must be accurate for UI

Ready to generate TDD flow, then exit.

---

*Created by /legacy ENTERING phase, updated EXPLORING → SYNTHESIZING*
