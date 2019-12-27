import React, { Component } from 'react'
import { Call } from './call'

const STATE_DIALING = 1;
const STATE_ACTIVE = 4;
const STATE_DISCONNECTED = 7;

let callDate;

/*     private static int STATE_DIALING = 1 ;
    private static int STATE_ACTIVE = 4 ;
    private static int STATE_DISCONNECTED = 7;


    STATE_CONNECTING 9
    STATE_DISCONNECTING 10
    STATE_HOLDING 3
    STATE_NEW 0
    STATE_PULLING_CALL 11
    STATE_RINGING 2
    STATE_SELECT_PHONE_ACCOUNT 8

    */

    
 export default class TeleEndpoint extends Component {
    constructor() {
      super();
      //this.call=new Call();
      this.state = {
        state: "state",
        formattedConnectDuration: (()=>{return "00:00"}),
        remoteName:"remotename",
        remoteNumber:"79000000000",
        remoteFormattedNumber: "+7900 000 0000",
        id:123,
        held:false,
        muted:false,
        speaker:false,
    };
    }

    //async componentDidMount() {
    Rec = async (data) => {
      console.log("Rec",data);
  
      if (data.state === 'extra_state_out_dialing') {
          pjsip.progress();
      }
      
      if (data.state === 'extra_state_out_active') {
          pjsip.answer();
      }
  
      if (data.state === 'extra_state_out_disconnected') {
          pjsip.hangup();
      }
  
      if (data.state === 'extra_state_in_ringing') {
      }
  
      if (data.state === 'extra_state_in_answer') {
      }
  
      if (data.state === 'extra_state_in_hangup') {
      }
  
   
    }

    

        /*
          let call={
            getState: (()=>{return "state"}),
            getFormattedConnectDuration: (()=>{return "00:00"}),
            getRemoteName: (()=>{return "remotename"}),
            getRemoteNumber: (()=>{return "79000000000"}),
            getRemoteFormattedNumber: (()=>{return "+7900 000 0000"}),
            getId: (()=>{return 123}),
            isHeld: ()=>{return false},
            isMuted: ()=>{return false},
            isSpeaker: ()=>{return false}
          }
    */
}
      