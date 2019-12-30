import React, { Component } from 'react'
import { NativeModules } from 'react-native'
import { EventEmitter } from 'events'

import Call from './call'

const STATE_CONNECTING = 9;
const STATE_RINGING = 2;
const STATE_DIALING = 1;
const STATE_ACTIVE = 4;
const STATE_DISCONNECTED = 7;

/*   
    STATE_DISCONNECTING 10
    STATE_HOLDING 3
    STATE_NEW 0
    STATE_PULLING_CALL 11
    STATE_SELECT_PHONE_ACCOUNT 8
*/


export default class TeleEndpoint extends EventEmitter {

  constructor() {
    super();
    //this.call=new Call();
    
    this.currentCall=null;

    this.state = {
      //DeviceEventEmitter.addListener('pjSipCallTerminated', this._onCallTerminated.bind(this));
    };
  }

      //outgoing
      declineCall=(call)=>{
        NativeModules.TeleModule.declineCall()};

      //incoming
      answerCall=(call)=>{ NativeModules.TeleModule.answerCall()};
      hangupCall=(call)=>{ NativeModules.TeleModule.hangupCall()};

      /*
      hangupCall(call) {
        // TODO: Add possibility to pass code and reason for hangup.
        return new Promise((resolve, reject) => {
            NativeModules.PjSipModule.hangupCall(call.getId(), (successful, data) => {
                if (successful) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    }*/


  //async componentDidMount() {
  Rec = async (data) => {
    console.log("Rec!!!", data);

    if (data.action === 'TeleService') {
      console.log("->TeleService");
      if (data.extra1s === 'onCallAdded') {
        console.log("->onCallAdded");
        this.currentCall=new Call({remoteUri:data.extra3s,creationTime:data.extra1l});
        this.currentCall.state='PJSIP_INV_STATE_NULL';
      }

      if (data.extra1s === 'onCallRemoved') {
        this.currentCall=null;
        this.emit("call_terminated", this.currentCall);
      }

      if ((data.extra1s === 'onStateChanged')||(data.extra1s === 'onCallAdded')) {
        if (data.extra1i === STATE_CONNECTING) {
          this.currentCall.state='PJSIP_INV_STATE_CALLING';
          this.currentCall.incoming=false;
        }
        if (data.extra1i === STATE_RINGING) {
          this.currentCall.state='PJSIP_INV_STATE_INCOMING';
          this.currentCall.incoming=true;
        }

        if (data.extra1i === STATE_DIALING) {
          this.currentCall.state='PJSIP_INV_STATE_EARLY';
        }
        if (data.extra1i === STATE_ACTIVE) {
          this.currentCall.connectTime=data.extra2l;
          this.currentCall.state='PJSIP_INV_STATE_CONFIRMED';
        }
        if (data.extra1i === STATE_DISCONNECTED) {
          this.currentCall.state='PJSIP_INV_STATE_DISCONNECTED';
          this._lastReason='PJSIP_SC_OK';
        }

        if (data.extra1s === 'onCallAdded') {
          console.log("->onCallAdded->emit");
          this.emit("call_received", this.currentCall);
        }  

      }
    }

  }

}











    /*
    if (data.state === 'extra_state_out_dialing') {
        pjsip.progress();
    }
    
    if (data.state === 'extra_state_out_active') {
        pjsip.answer();
    }
 
    if (data.state === 'extra_state_out_disconnected') {
        pjsip.hangup();
    }
    */

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
/*
Outgoing BUSY

9->1 -> 4 -> 7
 LOG  Rec {"action": "CallService", "extra1i": 9, "extra1l": 1577437262895, "extra1s": "onCallAdded", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:89006367756"}
 LOG  Rec {"action": "new_outgoing_call"}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:89006367756"}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:89006367756"}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:89006367756"}
 LOG  Rec {"action": "CallService", "extra1i": 1, "extra1l": 0, "extra1s": "onStateChanged", "extra2i": 0, "extra2l": 0, "extra2s": "", "extra3s": ""}
 LOG  Rec {"action": "phone_state", "incoming_call": false, "state": "extra_state_offhook"}
 LOG  Rec {"action": "phone_state", "incoming_call": false, "state": "extra_state_offhook"}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:89006367756"}
 LOG  Rec {"action": "CallService", "extra1i": 7, "extra1l": 0, "extra1s": "onStateChanged", "extra2i": 0, "extra2l": 0, "extra2s": "", "extra3s": ""}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:89006367756"}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onCallDestroyed", "extra2i": 0, "extra2l": 0, "extra2s": "", "extra3s": ""}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onCallRemoved", "extra2i": 0, "extra2l": 0, "extra2s": "", "extra3s": ""}
 LOG  Rec {"action": "phone_state", "incoming_call": false, "state": "extra_state_idle"}
 LOG  Rec {"action": "phone_state", "incoming_call": false, "state": "extra_state_idle"}


//ICNOMING
G  Rec {"action": "CallService", "extra1i": 2, "extra1l": 1577437382193, "extra1s": "onCallAdded", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:%2B79219542499"}
 LOG  Rec {"action": "phone_state", "incoming_call": true, "number": null, "state": "extra_state_ringing"}
 LOG  Rec {"action": "phone_state", "incoming_call": true, "number": "+79219542499", "state": "extra_state_ringing"}



 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:%2B79219542499"}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:%2B79219542499"}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:%2B79219542499"}
 LOG  Rec {"action": "CallService", "extra1i": 7, "extra1l": 0, "extra1s": "onStateChanged", "extra2i": 0, "extra2l": 0, "extra2s": "", "extra3s": ""}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onDetailsChanged", "extra2i": 0, "extra2l": 0, "extra2s": null, "extra3s": "tel:%2B79219542499"}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onCallDestroyed", "extra2i": 0, "extra2l": 0, "extra2s": "", "extra3s": ""}
 LOG  Rec {"action": "CallService", "extra1i": 0, "extra1l": 0, "extra1s": "onCallRemoved", "extra2i": 0, "extra2l": 0, "extra2s": "", "extra3s": ""}
 LOG  Rec {"action": "phone_state", "incoming_call": false, "state": "extra_state_idle"}
 LOG  Rec {"action": "phone_state", "incoming_call": false, "state": "extra_state_idle"}


	displayName = details.handle.schemeSpecificPart
 */

 /*

    //FIX
    //const call = this.state.call
    let call = {
      getState: (() => { return "state" }),
      getFormattedConnectDuration: (() => { return "00:00" }),
      getRemoteName: (() => { return "remotename" }),
      getRemoteNumber: (() => { return "79000000000" }),
      getRemoteFormattedNumber: (() => { return "+7900 000 0000" }),
      getId: (() => { return 123 }),
      isHeld: () => { return false },
      isMuted: () => { return false },
      isSpeaker: () => { return false }
    }

    let calls = { c1: call };
    //





        let call = {
          state: "state",
          _remoteName: data.extra2s,
          _remoteNumber: data.extra3s,
          _remoteUri: data.extra3s,
          _constructionTime: data.extra1l,
          id: 123,
          held: false,
          muted: false,
          speaker: false,

          getState: (() => { return 5 }),
          getFormattedConnectDuration: (() => { return "00:00" }),
          getRemoteName: (() => { return this._remoteNumber }),
          getRemoteNumber: (() => { return this._remoteNumber }),
          getRemoteFormattedNumber: (() => { return this._remoteNumber }),
          getRemoteUri: (() => { return this._remoteNumber }),
          getId: (() => { return this.id }),
          isHeld: () => { return this.held },
          isMuted: () => { return this.muted },
          isSpeaker: () => { return this.speaker }
        };


        call._remoteNumber = call._remoteNumber;

        if (call._remoteUri) {
          match = call._remoteUri.match(/tel:([^@]+)/);
          if (match) {
            call._remoteNumber = match[1];
          }
        }


        call.getFormattedConnectDuration = (() => (new Date() - this._constructionTime));
        call.getRemoteName = (() => { return this._remoteName; });
        call.getRemoteNumber = (() => { return this._remoteNumber; });
        call.getRemoteFormattedNumber = (() => { return this._remoteNumber; });
*/
        //call._remoteName=data.extra2s;
        //call._remoteNumber=data.extra3s;
        //call._constructionTime=data.extra1l;