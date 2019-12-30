import React, { Component } from 'react'
import TeleEndpoint from './tele_endpoint'

export default class Tele extends Component {
  constructor() {
    super();
    this.tEndpoint=new TeleEndpoint();
    this.Rec=this.tEndpoint.Rec;

    this.tEndpoint.on("call_received", (call) => {
      console.log("call_received", call);
      //dispatch(onCallReceived(call));
      //dispatch({type: CALL_RECEIVED, call});
      this.parent.onCallReceived(call);
    });

    this.tEndpoint.on("call_terminated", (call) => {
      //console.log("call_terminated", call);
      //dispatch({type: CALL_TERMINATED, call});
      this.parent.onCallTerminated(call);
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
  async componentDidMount() {
    Rec=this.tEndpoint.Rec;
  }*/
/*
  Rec = async (data) => {
    console.log("Rec",data);

  }*/
}




