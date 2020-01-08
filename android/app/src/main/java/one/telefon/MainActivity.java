package one.telefon;

import com.facebook.react.ReactActivity;

import android.view.Window;
import android.view.WindowManager;
import android.os.Bundle;

import android.util.Log;

//for default dialer
import android.telecom.TelecomManager;
import android.content.Context;
import android.content.Intent;
////

import com.codegulp.invokeapp.RNInvokeApp;




/*
import com.facebook.react.ReactActivity;





import android.telecom.Call;

import com.facebook.react.bridge.Callback;


*/
//import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;

public class MainActivity extends ReactActivity {

  // for default dialer
  private TelecomManager telecomManager;
  private static final int RC_DEFAULT_PHONE = 3289;
  private static final int RC_PERMISSION = 3810;

  private static final int REQUEST_CODE_SET_DEFAULT_DIALER = 123;

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "telefon";
  }


}
