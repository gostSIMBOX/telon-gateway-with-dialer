# Understanding: SIP Signaling

> SIP (Session Initiation Protocol) integration via PJSIP library.

## Phase: SYNTHESIZING

## Hypothesis

This module provides VoIP call capabilities via the PJSIP library through `react-native-sip`. It handles:
- SIP account registration with SIP servers
- SIP-based call signaling (INVITE, ACK, BYE, etc.)
- STUN/TURN configuration for NAT traversal
- Network-aware connectivity management

**Key files:**
- `src/modules/pjsip.js` - Main Pjsip component class
- `src/modules/pjsip_old.js` - Deprecated/legacy code (fragment only)

## Sources

- src/modules/pjsip.js - Complete Pjsip class implementation
- src/modules/pjsip_old.js - Legacy code fragment (incomplete, mostly comments)

## Validated Understanding

### Architecture

**Pjsip Class** extends React Component, providing SIP endpoint management:

```
react-native-sip (Native Module)
         ↓
    Endpoint (JavaScript wrapper)
         ↓
    Pjsip Component
         ↓ (callbacks)
    Parent Component / UI
```

### Key Components

**1. SIP Endpoint Initialization**
```javascript
this.endpoint = new Endpoint()
await this.endpoint.start()
```

**2. Account Configuration**
```javascript
{
  "name": "MyUserName",
  "username": "50363",
  "password": "pass50363",
  "domain": "172.16.104.17",  // SIP server
  "regServer": "",            // Empty = use domain
  "transport": "UDP",         // Default TCP
  "regTimeout": 3600,         // Registration refresh
  "regOnAdd": true,           // Auto-register
  service: {
    ua: "siptest",
    stun: ['stun.l.google.com:19302', ...]
  },
  network: {
    useAnyway: true,
    useWifi: true,
    use3g: true,
    // ...
  }
}
```

**3. Event Subscriptions**
```javascript
endpoint.on("registration_changed", (account) => {})
endpoint.on("connectivity_changed", (online) => {})
endpoint.on("call_received", (call) => {})
endpoint.on("call_changed", (call) => {})
endpoint.on("call_terminated", (call) => {})
endpoint.on("call_screen_locked", (call) => {})  // Android only
```

**4. Call Control Methods**
```javascript
progress()  // Answer with progress (early media)
answer()    // Answer incoming call
hangup()    // Terminate call
destroy()   // Shutdown endpoint
```

### Comparison: Tele vs Pjsip

| Aspect | Tele (Native) | Pjsip (VoIP) |
|--------|---------------|--------------|
| **Source** | Android TelephonyManager | PJSIP library |
| **Network** | Cellular (GSM/3G/4G) | Internet (WiFi/Data) |
| **Protocol** | Standard telephony | SIP/RTP |
| **Account** | SIM card | SIP account |
| **Events** | DeviceEventEmitter | Endpoint.on() |
| **Call Control** | NativeModules.TeleModule | endpoint.answerCall(), etc. |

### Code Issues Identified

**pjsip.js:**
1. ⚠️ **Hardcoded credentials** - SIP account credentials in source code
2. ⚠️ **Hardcoded domain** - `172.16.104.17` (private IP, likely test server)
3. ⚠️ **Inconsistent event handling** - `call_changed` calls `onCallTerminated()` (wrong callback)
4. ⚠️ **Component-based but used as service** - Extends Component but no lifecycle/render

**pjsip_old.js:**
1. ⚠️ **Fragment only** - Incomplete file, mostly commented code
2. ⚠️ **Dead code** - Contains `if (1 == 0)` blocks (never executed)
3. ⚠️ **Should be removed** - No clear purpose, confusing for maintainers

### Network Configuration

```javascript
network: {
  useAnyway: true,      // Use any available network
  useWifi: true,        // Allow WiFi
  use3g: true,          // Allow 3G
  useEdge: true,        // Allow EDGE (2G)
  useGprs: true,        // Allow GPRS (2G)
  useInRoaming: true,   // Allow while roaming
  useOtherNetworks: true // Allow other network types
}
```

**Purpose:** Fine-grained control over which network types are acceptable for SIP calls.

### STUN Configuration

```javascript
stun: ['stun.l.google.com:19302', 'stun4.l.google.com:19302']
```

**Purpose:** NAT traversal for SIP calls behind firewalls/routers.

## Children

| Child | Status |
|-------|--------|
| account-registration | COMPLETED (no deeper exploration needed) |
| sip-event-handling | COMPLETED (no deeper exploration needed) |
| network-management | COMPLETED (no deeper exploration needed) |

## Flow Recommendation

**Type: SDD** (Spec-Driven Development)

**Rationale:** Internal service logic for SIP protocol handling. No stakeholder-facing documentation needed.

**Confidence:** HIGH

## Bubble Up

- Depends on: `react-native-sip` (external native module wrapping PJSIP)
- Depends on: STUN servers (Google public STUN)
- Parallel to: telephony-endpoint (dual-path architecture)
- Provides: VoIP call capabilities via SIP protocol

## Synthesis

**Key Insights:**

1. **Dual-path architecture confirmed**: Pjsip provides VoIP calls while Tele provides native telephony
2. **Security concern**: Hardcoded SIP credentials should be moved to secure storage
3. **Code quality issue**: pjsip_old.js is dead code that should be removed
4. **Bug**: `call_changed` event incorrectly calls `onCallTerminated()` instead of `onCallChanged()`
5. **Design smell**: Pjsip extends Component but doesn't use React lifecycle

**No children need deeper exploration** - all concepts are contained at this level.

**Architectural Decision Identified:** The dual-path architecture (Tele + Pjsip) should be documented as an ADR.

Ready to generate SDD flow and ADR, then exit.

---

*Created by /legacy ENTERING phase, updated EXPLORING → SYNTHESIZING*
