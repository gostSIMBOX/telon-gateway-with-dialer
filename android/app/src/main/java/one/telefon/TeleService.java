package one.telefon;


import one.telefon.MainService;
import one.telefon.TeleManager;
//import one.telefon.utils.ArgumentUtils;


import android.os.Bundle;

import android.util.Log;


import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioManager;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.Looper;
import android.os.PowerManager;
import android.os.Process;
import android.os.Bundle;
import android.telephony.TelephonyManager;


import android.content.Context;
import android.content.Intent;

import com.facebook.react.HeadlessJsTaskService;

import android.telecom.Call;
import android.telecom.InCallService;



public class TeleService extends InCallService {
    private static String LOG_TAG = "LOG_telefon.one[TeleService]";
    
    private boolean mInitialized;

    private HandlerThread mWorkerThread;

    private Handler mHandler;

    private AudioManager mAudioManager;

    private PowerManager mPowerManager;

    private PowerManager.WakeLock mIncallWakeLock;

    private WifiManager mWifiManager;

    private WifiManager.WifiLock mWifiLock;

/*
    @Override
    public IBinder onBind(Intent intent) {
        Log.d(LOG_TAG, "onBind()");        
        init(intent,0,0);
        return null;
    }
*/
    @Override
    public int onStartCommand(final Intent intent, int flags, int startId) {
        Log.d(LOG_TAG, "onStartCommand()");
        //init(intent, flags, startId);
        return 1;
    }

    private int init(final Intent intent, int flags, int startId)
    {
        Log.d(LOG_TAG, "init");
        if (!mInitialized) {
            Log.d(LOG_TAG, "!mInitialized");
            //if (intent != null && intent.hasExtra("service")) {
            //    mServiceConfiguration = ServiceConfigurationDTO.fromMap((Map) intent.getSerializableExtra("service"));
            //}

            mWorkerThread = new HandlerThread(getClass().getSimpleName(), Process.THREAD_PRIORITY_FOREGROUND);
            mWorkerThread.setPriority(Thread.MAX_PRIORITY);
            mWorkerThread.start();
            mHandler = new Handler(mWorkerThread.getLooper());
            //mEmitter = new PjSipBroadcastEmiter(this);
            
            mAudioManager = (AudioManager) getApplicationContext().getSystemService(AUDIO_SERVICE);
            mPowerManager = (PowerManager) getApplicationContext().getSystemService(POWER_SERVICE);
            mWifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            mWifiLock = mWifiManager.createWifiLock(WifiManager.WIFI_MODE_FULL_HIGH_PERF, this.getPackageName()+"-wifi-call-lock");
            mWifiLock.setReferenceCounted(false);
            /*
            mTelephonyManager = (TelephonyManager) getApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
            mGSMIdle = mTelephonyManager.getCallState() == TelephonyManager.CALL_STATE_IDLE;
            IntentFilter phoneStateFilter = new IntentFilter(TelephonyManager.ACTION_PHONE_STATE_CHANGED);
            registerReceiver(mPhoneStateChangedReceiver, phoneStateFilter);
            */
            mInitialized = true;

            job(new Runnable() {
                @Override
                public void run() {
                    load();
                }
            });
        }

        if (intent != null) {
            job(new Runnable() {
                @Override
                public void run() {
                    handle(intent);
                }
            });
        }

        return START_NOT_STICKY;
    }

    private void job(Runnable job) {
        //mHandler.post(job);
    }

    private void load() {
    }

    private void handle(Intent intent) {
        if (intent == null || intent.getAction() == null) {
            return;
        }

        //Log.d(LOG_TAG, "Handle \""+ intent.getAction() +"\" action ("+ ArgumentUtils.dumpIntentExtraParameters(intent) +")");
        Log.d(LOG_TAG, "Handle \""+ intent.getAction() +"\" action ");
    }

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

    private void showApp() {    
        Log.d(LOG_TAG, "showApp()");    
        // Automatically start application when incoming call received.
        
        /*
        PowerManager.WakeLock wl = mPowerManager.newWakeLock(
            PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.ON_AFTER_RELEASE | PowerManager.FULL_WAKE_LOCK,
            "incoming_call"
        );
        wl.acquire(10000);
        */
        

        Boolean mAppHidden=true;
        if (mAppHidden) {
            try {
                String ns = getApplicationContext().getPackageName();
                String cls = ns + ".MainActivity";

                Intent intent = new Intent(getApplicationContext(), Class.forName(cls));
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.EXTRA_DOCK_STATE_CAR);
                intent.addCategory(Intent.CATEGORY_LAUNCHER);
                intent.putExtra("foreground", true);

                startActivity(intent);
            } catch (Exception e) {
                Log.w(LOG_TAG, "Failed to open application on received call", e);
            }
        }

        job(new Runnable() {
            @Override
            public void run() {
                // Brighten screen at least 10 seconds
                PowerManager.WakeLock wl = mPowerManager.newWakeLock(
                    PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.ON_AFTER_RELEASE | PowerManager.FULL_WAKE_LOCK,
                    "incoming_call"
                );
                wl.acquire(10000);

            }
        });

        
    }



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

        showApp();

        Call.Details details = call.getDetails();

        String num = details.getHandle().toString();
        String name = details.getCallerDisplayName();

        long creationTimeMillis;
        
        //if (android.os.Build.VERSION.SDK_INT >= 26) {
        //if (Build.VERSION.SDK_INT >= 26) {
        //    creationTimeMillis = details.getCreationTimeMillis();
        //} else {
            creationTimeMillis=0;
        //}

        int state = call.getState();

        int direction;

        
        //if (android.os.Build.VERSION.SDK_INT >= 29) {
        //    direction = details.getCallDirection();

        //} else {
            direction = 0;
        //}

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

            /* API
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
            */

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