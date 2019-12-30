package one.telefon;

import one.telefon.MainService;
import one.telefon.TeleManager;

import android.os.Bundle;

import android.util.Log;

import android.content.Context;
import android.content.Intent;

import com.facebook.react.HeadlessJsTaskService;

import android.telecom.Call;
import android.telecom.InCallService;



public class TeleService extends InCallService {
    private static String LOG_TAG = "LOG_telefon.one[TeleService]";
    

    /*
    private boolean isAppOnForeground(Context context) {
        
         // We need to check if app is in foreground otherwise the app will crash.
         // http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND
                    && appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }
    */

    private void sendHeadless(String action, String extra1s, String extra2s, String extra3s, int extra1i, int extra2i,
            long extra1l, long extra2l) {
        //if (!isAppOnForeground((context))) {
            Context context = getApplicationContext();
            Intent recIntent = new Intent(context, MainService.class);

            recIntent.putExtra("action", action);
            recIntent.putExtra("extra1s", extra1s);
            recIntent.putExtra("extra2s", extra2s);
            recIntent.putExtra("extra3s", extra3s);

            recIntent.putExtra("extra1i", extra1i);
            recIntent.putExtra("extra2i", extra2i);

            recIntent.putExtra("extra1l", extra1l);
            recIntent.putExtra("extra2l", extra2l);

            context.startService(recIntent);
            HeadlessJsTaskService.acquireWakeLockNow(context);
        //}
    }

    @Override
    public void onCallAdded(Call call) {
        Log.d(LOG_TAG, "onCallAdded");
        super.onCallAdded(call);
        
        TeleManager.updateCall(call);

        Call.Details details = call.getDetails();

        String num = details.getHandle().toString();
        String name = details.getCallerDisplayName();

        long creationTimeMillis = details.getCreationTimeMillis();

        int state = call.getState();

        int direction;

        if (android.os.Build.VERSION.SDK_INT >= 29) {
            direction = details.getCallDirection();

        } else {
            direction = 0;
        }

        sendHeadless("TeleService", "onCallAdded", name, num, state, direction, creationTimeMillis, 0);

        /* DisconnectCause getDisconnectCause() */

        call.registerCallback(new Call.Callback() {
            @Override
            public void onCallDestroyed(Call call) {
                Log.d(LOG_TAG, "onCallAdded");
                super.onCallDestroyed(call);
                sendHeadless("TeleService", "onCallDestroyed", "", "", 0, 0, 0, 0);
            }

            @Override
            public void onDetailsChanged(Call call, Call.Details details) {
                Log.d(LOG_TAG, "onDetailsChanged " + call.getRemainingPostDialSequence() + ":"
                        + details.getCallerDisplayName());
                super.onDetailsChanged(call, details);
                String num = details.getHandle().toString();
                String name = details.getCallerDisplayName();
                sendHeadless("TeleService", "onDetailsChanged", name, num, 0, 0, 0, 0);
            }

            @Override
            public void onStateChanged(Call call, int state) {
                Log.d(LOG_TAG, "onStateChanged state=" + state);
                super.onStateChanged(call, state);
                long connectTimeMillis = details.getConnectTimeMillis();

                sendHeadless("TeleService", "onStateChanged", "", "", state, 0, 0, connectTimeMillis);
            }

            @Override
            public void onConnectionEvent(Call call, String event, Bundle extras) {
                Log.d(LOG_TAG, "onConnectionEvent event=" + event);
                Log.d(LOG_TAG, "getDisconnect code: " + call.getDetails().getDisconnectCause().getCode());
                Log.d(LOG_TAG, "getDisconnect reason: " + call.getDetails().getDisconnectCause().getReason());
                Log.d(LOG_TAG, "getDisconnect description: " + call.getDetails().getDisconnectCause().getDescription());
                Log.d(LOG_TAG, "event : " + event);
                super.onConnectionEvent(call, event, extras);
                sendHeadless("TeleService", "onConnectionEvent", event, "", 0, 0, 0, 0);
            }

            @Override
            public void onRttRequest(Call call, int id) {
                Log.d(LOG_TAG, "onRttRequest");
                super.onRttRequest(call, id);
                sendHeadless("TeleService", "onRttRequest", "", "", id, 0, 0, 0);
            }

        });

    }

    @Override
    public void onCallRemoved(Call call) {
        Log.w(LOG_TAG, "onCallRemoved");
        super.onCallRemoved(call);

        TeleManager.updateCall(call);

        // ADD: call.unregisterCallback(callCallback);
        sendHeadless("TeleService", "onCallRemoved", "", "", 0, 0, 0, 0);
    }

}

/*
 * @Override public void onConnectionEvent(Call call, String event, Bundle
 * extras) { Log.d(LOG_TAG, "onConnectionEvent"); super.onConnectionEvent(call,
 * event, extras); sendHeadless("TeleService","onConnectionEvent_"+event); }
 */
// private Call OngoingCall;

/*
 * 
 * 
 * 
 * // Override // public void onCallAudioStateChanged(CallAudioState
 * callAudioState) {
 * 
 * // Override // public void onConnectionEvent /* public void
 * onHandoverFailed(String callId, int error) {
 * mHandler.obtainMessage(MSG_ON_HANDOVER_FAILED, error, 0,
 * callId).sendToTarget(); } Override public void onHandoverComplete(String
 * callId) { mHandler.obtainMessage(MSG_ON_HANDOVER_COMPLETE,
 * callId).sendToTarget(); }
 * 
 * 
 * 
 */

/*
 * Исходящий LOG Rec {"action": "new_outgoing_call"} LOG Rec {"action":
 * "phone_state", "incoming_call": false, "state": "extra_state_offhook"} LOG
 * Rec {"action": "phone_state", "incoming_call": false, "state":
 * "extra_state_idle"}
 * 
 * нет события поднятой трубки. Входящий -> RINGING LOG Rec {"action":
 * "phone_state", "incoming_call": true, "number": null, "state":
 * "extra_state_ringing"} -> ПОДНЯЛ LOG Rec {"action": "phone_state",
 * "incoming_call": false, "state": "extra_state_offhook"} -> ПОВЕСИЛ LOG Rec
 * {"action": "phone_state", "incoming_call": false, "state":
 * "extra_state_idle"}
 * 
 * Номер не определяется
 * 
 * if (data.state === 'extra_state_offhook') {
 * AudioRecorder.prepareRecordingAtPath(audioPath, { SampleRate: 22050,
 * Channels: 1, AudioQuality: "Low", AudioEncoding: "aac" })
 * 
 * await AudioRecorder.startRecording() } else if (data.state ===
 * 'extra_state_idle') { await AudioRecorder.stopRecording() }
 */

/*
 * 
 * if (state==STATE_DIALING) { recIntent.putExtra("action", "call_service");
 * recIntent.putExtra("state", "extra_state_out_dialing");
 * context.startService(recIntent);
 * HeadlessJsTaskService.acquireWakeLockNow(context); } if (state==STATE_ACTIVE)
 * { recIntent.putExtra("action", "call_service"); recIntent.putExtra("state",
 * "extra_state_out_active"); context.startService(recIntent);
 * HeadlessJsTaskService.acquireWakeLockNow(context); } if
 * (state==STATE_DISCONNECTED) { recIntent.putExtra("action", "call_service");
 * recIntent.putExtra("state", "extra_state_out_disconnected");
 * context.startService(recIntent);
 * HeadlessJsTaskService.acquireWakeLockNow(context); }
 * 
 * 
 * 
 * 
 * out 1 -> 4 -> 7 onStateChanged in onCallAdded
 * 
 * // call.registerCallback(callCallback); // super.onCallAdded(call); //
 * OngoingCall.call = call; // MainActivity.startCall();
 * 
 * // Intent intent = new Intent(this,MainActivity); //
 * intent.putExtra(Intent.FLAG_ACTIVITY_NEW_TASK, getPackageName()); //
 * startActivityForResult(intent, call.details.handle); //
 * MainActivity.startCall(call);
 */

/*
 * 
 * import com.carusto.ReactNativePjSip.utils.ArgumentUtils;
 * 
 * DeviceEmittor
 * 
 * https://github.com/florindumitru/react-native-sip/blob/
 * 6afec9c1d8cde94421fd409d1fee116ea7d4e6f8/android/src/main/java/com/carusto/
 * ReactNativePjSip/PjSipBroadcastReceiver.java Object params =
 * ArgumentUtils.fromJson(json); emit("pjSipCallReceived", params);
 * 
 * 
 * private void emit(String eventName, @Nullable Object data) { Log.d(TAG,
 * "emit " + eventName + " / " + data);
 * 
 * context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).
 * emit(eventName, data);
 * 
 * 
 * import android.content.BroadcastReceiver; }
 * 
 * public class PjSipBroadcastReceiver extends BroadcastReceiver {
 * 
 */