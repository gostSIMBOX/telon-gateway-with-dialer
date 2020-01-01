import React, { Component } from 'react'
import TeleEndpoint from './tele_endpoint'

export default class Tele extends Component {
  constructor() {
    console.log("tele.js.constructor")
    super();
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




