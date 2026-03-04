# Understanding: Call UI Presentation

> Visual call interface with animations and user interactions.

## Phase: SYNTHESIZING

## Hypothesis

This domain covers the CallScreen UI component and its visual presentation, including:
- Animated call state transitions (incoming → active → terminated)
- Call information display (caller info, duration, state)
- Call controls (answer, hangup, mute, speaker, hold, DTMF, transfer)
- Modal dialogs (DTF, transfer, dialer, incoming call)
- Responsive layout using Animated API

**Key files:**
- `src/screens/CallScreen/index.js` - Main CallScreen component
- `src/screens/CallScreen/anim.js` - Animation calculations
- `src/components/call/*` - Reusable call UI components

## Sources

- src/screens/CallScreen/index.js - CallScreen component (722 lines)
- src/screens/CallScreen/anim.js - Animation logic
- src/containers/AppViewport.android.js - App container
- src/components/call/* - Call UI subcomponents

## Validated Understanding

### Component Architecture

```
CallScreen (main container)
├── CallParallelInfo (simultaneous calls)
├── CallInfo (animated - caller details)
├── CallAvatar (animated - caller avatar)
├── CallState (animated - call status)
├── CallActions (animated - mute, hold, speaker, etc.)
├── CallControls (answer/hangup buttons)
├── DialerModal (add call)
├── TransferModal (call transfer)
├── DtmfModal (keypad)
└── IncomingCallModal (incoming call popup)
```

### Animation System

**Layout Calculation:**
```javascript
// Screen proportions
infoHeight: 12%    // Caller info section
avatarHeight: 30%  // Avatar section
stateHeight: 8%    // Call state text
actionsHeight: 40% // Action buttons
buttonsHeight: 64px // Answer/hangup buttons
```

**State-Based Animations:**

| Call State | Info | Avatar | State | Actions | Buttons |
|------------|------|--------|-------|---------|---------|
| INCOMING | visible | visible (opaque) | visible | hidden | answer/hangup |
| ACTIVE | visible | hidden | visible | visible | hangup/redirect |
| DISCONNECTED | visible | hidden | visible | hidden | minimal |

**Animation Triggers:**
```javascript
animateCallState(props, call, callback)
  → Calculates target positions based on call.getState()
  → Runs Animated.parallel() on all components
  → Smooth transitions between states
```

### Call Control Handlers

**Basic Controls:**
- `_onCallAnswer()` - Answer incoming call
- `_onCallHangup()` - Terminate call
- `_onCallMutePress()` / `_onCallUnMutePress()` - Toggle mute
- `_onCallSpeakerPress()` / `_onCallEarpiecePress()` - Toggle audio output
- `_onCallHoldPress()` / `_onCallUnHoldPress()` - Toggle hold

**Advanced Features:**
- `_onCallDtmfPress()` - Open DTMF keypad modal
- `_onCallTransferPress()` - Open call transfer modal
- `_onCallAddPress()` - Open dialer to add call
- `_onCallRedirectPress()` - Blind transfer/redirect

### Modal Components

| Modal | Purpose | Trigger |
|-------|---------|---------|
| `IncomingCallModal` | Show incoming call with answer/decline | `call.getState() === 'INCOMING'` |
| `DtmfModal` | DTMF keypad for IVR navigation | DTMF button press |
| `TransferModal` | Attendant/blind transfer | Transfer button |
| `DialerModal` | Add new call to conference | Add call button |

### State Management

**Component State:**
```javascript
this.state = {
  call,                    // Current call object
  incomingCall: null,      // Incoming call (for modal)
  isAddModalVisible: false,
  isRedirectModalVisible: false,
  isDtmfModalVisible: false,
  isTransferModalVisible: false,
  screenHeight, screenWidth,
  error: null,
  ...animatedValues
}
```

**Props from Redux:**
```javascript
call: store.navigation.current.call  // Current call from navigation
calls: store.pjsip.calls             // All active calls
```

### Visual Layout

```
┌─────────────────────────────────┐
│  [CallParallelInfo] (if >1 call)│
│                                 │
│  ┌───────────────────────────┐  │
│  │      [CallAvatar]         │  │ ← Animated (fade/slide)
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │       [CallInfo]          │  │ ← Caller name/number
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │      [CallState]          │  │ ← "00:45" duration
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │     [CallActions]         │  │ ← Mute, Hold, Speaker, etc.
│  └───────────────────────────┘  │
│                                 │
│         [CallControls]          │ ← Answer/Hangup (fixed bottom)
└─────────────────────────────────┘
```

### Gradient Background

```javascript
<LinearGradient colors={['#2a5743', '#14456f']}>
```

**Purpose:** Visual polish with teal-to-blue gradient background.

## Children

| Child | Status |
|-------|--------|
| animation-system | COMPLETED (no deeper exploration needed) |
| call-components | COMPLETED (no deeper exploration needed) |
| modal-dialogs | COMPLETED (no deeper exploration needed) |

## Flow Recommendation

**Type: VDD** (Visual-Driven Development)

**Rationale:** Primary focus is user experience with:
- Animated state transitions
- Visual feedback for call states
- Modal interactions
- Responsive layout

**Confidence:** HIGH

## Bubble Up

- Depends on: call-state-machine (Call object for display)
- Depends on: telephony-endpoint / sip-signaling (call control callbacks)
- Provides: Visual call interface for users

## Synthesis

**Key Insights:**

1. **Animation-driven UX**: CallScreen uses React Native Animated API for smooth state transitions
2. **Component composition**: 13+ reusable call components for modularity
3. **State-based layout**: Component positions calculated from call state
4. **Modal architecture**: 4 modals for advanced features (DTMF, transfer, add call, incoming)
5. **Redux integration**: Call data from Redux store, callbacks passed as props
6. **Responsive design**: Percent-based layout adapts to screen size

**No children need deeper exploration** - all concepts are contained at this level.

**VDD Justification:**
- Visual presentation is primary concern
- Animated transitions define user experience
- Component structure driven by visual layout
- Modal dialogs for user interactions

Ready to generate VDD flow, then exit.

---

*Created by /legacy ENTERING phase, updated EXPLORING → SYNTHESIZING*
