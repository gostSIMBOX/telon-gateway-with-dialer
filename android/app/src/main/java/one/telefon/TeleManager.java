package one.telefon;

import android.os.Bundle;
import android.util.Log;

import android.telecom.Call;

public class TeleManager {
    private static String LOG_TAG = "LOG_telefon.one[TeleManager]";

    private static Call currentCall;

    public static void updateCall(Call call) {
        currentCall = call;
    }

    /*
    public static void cancel() {
        if (currentCall.getDetails().getState() == Call.STATE_RINGING)
            rejectCall();
        else
            disconnectCall();
    }*/

    // incoming
    public static void reject() {
        Log.d(LOG_TAG, "reject()");
        currentCall.reject(false, "");
    }

    public static void answer() {
        Log.d(LOG_TAG, "answer()");
        currentCall.answer(currentCall.getDetails().getVideoState());
    }

    // outgoing
    public static void disconnect() {
        Log.d(LOG_TAG, "disconnect()");
        currentCall.disconnect();
    }

}
