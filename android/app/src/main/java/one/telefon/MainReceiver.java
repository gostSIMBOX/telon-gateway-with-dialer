package one.telefon;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import one.telefon.MainService;

import com.facebook.react.HeadlessJsTaskService;
import android.telephony.TelephonyManager;

import android.util.Log;


//import android.Manifest;
//import androidx.appcompat.app.AppCompatActivity;
//import androidx.appcompat.app.AppCompatContext;


public final class MainReceiver extends BroadcastReceiver {
    private static String LOG_TAG = "telefon.one[MainReceiver]";


    private static boolean incomingCall = false;

    public final void onReceive(Context context, Intent intent) {
       //permissions
  /*      if (AppCompatContext.checkSelfPermission(MainReceiver.this, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission(MainReceiver.this, Manifest.permission.SYSTEM_ALERT_WINDOW) != PackageManager.PERMISSION_GRANTED) {
            AppCompatActivity.requestPermissions(MainReceiver.this,
                    new String[]{Manifest.permission.READ_PHONE_STATE, Manifest.permission.SYSTEM_ALERT_WINDOW},
                    1);
        }

        if (AppCompatContext.checkSelfPermission(MainReceiver.this, Manifest.permission.READ_CALL_LOG) != PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission(MainReceiver.this, Manifest.permission.SYSTEM_ALERT_WINDOW) != PackageManager.PERMISSION_GRANTED) {
            AppCompatActivity.requestPermissions(MainReceiver.this,
                    new String[]{Manifest.permission.READ_CALL_LOG, Manifest.permission.SYSTEM_ALERT_WINDOW},
                    1);
        }*/
        //permissions

        Log.w(LOG_TAG,"onReceive");
        Intent recIntent = new Intent(context, MainService.class);
        Log.w(LOG_TAG,"action="+intent.getAction());
        Log.w(LOG_TAG,"state="+intent.getStringExtra("state"));
        if (intent.getAction().equals("android.intent.action.PHONE_STATE")) {
            recIntent.putExtra("action", "phone_state");
            String phoneState = intent.getStringExtra("state");
            if (phoneState.equals(TelephonyManager.EXTRA_STATE_RINGING)) {
                String phoneNumber = intent.getStringExtra("incoming_number");
                incomingCall = true;
                recIntent.putExtra("state", "extra_state_ringing");
                recIntent.putExtra("incoming_call", true);
                recIntent.putExtra("number", phoneNumber);
            } else if (phoneState.equals(TelephonyManager.EXTRA_STATE_OFFHOOK)) {
                if (incomingCall) {
                    incomingCall = false;
                }
                recIntent.putExtra("state", "extra_state_offhook");
                recIntent.putExtra("incoming_call", false);
            } else if (phoneState.equals(TelephonyManager.EXTRA_STATE_IDLE)) {
                if (incomingCall) {
                    incomingCall = false;
                }
                recIntent.putExtra("state", "extra_state_idle");
                recIntent.putExtra("incoming_call", false);
            }
        } else {
            recIntent.putExtra("action", "new_outgoing_call");
        }
        context.startService(recIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }
}