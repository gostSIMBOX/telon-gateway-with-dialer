package one.telefon;

import android.app.Service;
import android.app.Activity;
import android.content.Intent;
import android.content.Context;

import android.util.Log;

import com.facebook.react.bridge.*;

import one.telefon.TeleManager;


public class TeleModule extends ReactContextBaseJavaModule {

    private static String LOG_TAG = "LOG_telefon.one[TeleModule]";

    //private static TeleBroadcastReceiver receiver;
    public static ReactApplicationContext currentContext;

    public TeleModule(ReactApplicationContext context) {
        super(context);
        currentContext=context;
        // Module could be started several times, but we have to register receiver only once.
        /*
        if (receiver == null) {
            receiver = new TeleBroadcastReceiver(context);
            this.getReactApplicationContext().registerReceiver(receiver, receiver.getFilter());
        } else {
            receiver.setContext(context);
        }*/

    }

    @Override
    public String getName() {
        return "TeleModule";
    }

    @ReactMethod
    public void getCurrentCall() {
        Log.d(LOG_TAG, "getCurrentCall()"); 
        TeleManager.getCurrentCall();
    }

    //incoming
    @ReactMethod
    public void declineCall() {
        Log.d(LOG_TAG, "declineCall()"); 
        TeleManager.reject();
    }

    @ReactMethod
    public void answerCall() {
        Log.d(LOG_TAG, "answerCall()");
        TeleManager.answer(); 
    }

    //outgoing
    @ReactMethod
    public void hangupCall() {
        Log.d(LOG_TAG, "hangupCall()"); 
        TeleManager.disconnect();
    }



}
