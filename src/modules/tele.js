import React, { Component } from 'react'

import { Endpoint } from 'react-native-tele'
import { ReplaceDialer } from 'react-native-replace-dialer'

export default class Tele extends Component {
  constructor() {
    console.log("tele.js.constructor")
    super();

    let tReplaceDialer = new ReplaceDialer();

    if (!tReplaceDialer.isDefault()) {
      console.log('Is NOT default dialer, try to set.');
      if (tReplaceDialer.setDefault()) {
        console.log('Default dialer sucessfully set.');
      } else {
        console.log('Default dialer NOT set');
      }
    }


    let tEndpoint = new Endpoint();
    console.log(tEndpoint);

    let state = await tEndpoint.start(); // List of calls when RN context is started, could not be empty because Background service is working on Android
    let { calls, settings } = state;
    console.log("calls",calls);
    console.log("settings",settings);

    // Subscribe to endpoint events
    // tEndpoint.on("registration_changed", (account) => {}); // TODO
    // tEndpoint.on("connectivity_changed", (online) => {}); // TODO
    //tEndpoint.on("call_received", (call) => { console.log("call_received",call); });
    //tEndpoint.on("call_changed", (call) => { console.log("call_changed",call);  });
    //tEndpoint.on("call_terminated", (call) => { console.log("call_terminated",call);  });
    // tEndpoint.on("call_screen_locked", (call) => {  console.log("call_screen_locked",call);  }); // Android only


    let options = {
      headers: {
        "sim": "1" // TODO
      }
    }

    //let call = await tEndpoint.makeCall(destination, options);



    this.tEndpoint=new TeleEndpoint();
    this.Rec=this.tEndpoint.Rec;

    this.tEndpoint.on("call_received", (call) => {
      console.log("tele.call_received", call);
      //dispatch(onCallReceived(call));
      //dispatch({type: CALL_RECEIVED, call});
      this.parent.onCallReceived(call);
    });

    this.tEndpoint.on("call_terminated", (call) => {
      console.log("tele.call_terminated", call);
      //dispatch({type: CALL_TERMINATED, call});
      this.parent.onCallTerminated(call);
    });

    this.tEndpoint.on("call_changed", (call) => {
      console.log("tele.call_changed", call);
      this.parent.onCallChanged(call);
    });

    /*
    export function hangupCall(call) {
      return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        endpoint.hangupCall(call)
      }
    }
    */


  };

    //outgoing
    hangupCall=(call)=>{this.tEndpoint.hangupCall(call)};  

    //incoming
    answerCall=(call)=>{this.tEndpoint.answerCall(call)};
    declineCall=(call)=>{this.tEndpoint.declineCall(call)};

/*
  Rec = async (data) => {
    console.log("Rec",data);

  }*/
}




