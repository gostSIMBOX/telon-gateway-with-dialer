import React, { Component } from 'react'
import { Endpoint } from 'react-native-sip'



class Pjsip extends Component {
  constructor() {
    super();
    this.call={};
  }
    

  init = async () => {
    console.log("pjsip->init");
    this.endpoint = new Endpoint;

    let configuration = {
      "name": "MyUserName",

      //"username": "50363",
      //"password": "pass50363",
      //"domain": "sip.zadarma.com",
      //"regServer": "sip.zadarma.com", // Default wildcard

      "username": "50363",
      "password": "pass50363",
      "domain": "172.16.104.17",
      "regServer": "",
      //"regServer": "172.16.104.17", // Default wildcard


      "proxy": null,
      "transport": "UDP",//null, // Default TCP
      
      "regTimeout": 3600, // Default 3600
      "regHeaders": {
        //"X-Custom-Header": "Value"
      },
      //"regContactParams": ";unique-device-token-id=XXXXXXXXX",
      "regOnAdd": true,  // Default true, use false for manual REGISTRATION

      service: {
        ua: "siptest",
        stun: ['stun.l.google.com:19302', 'stun4.l.google.com:19302']
      },

      network: {
        useAnyway: true,           // Default: true
        useWifi: true,              // Default: true
        use3g: true,                // Default: false
        useEdge: true,             // Default: false
        useGprs: true,             // Default: false
        useInRoaming: true,        // Default: false
        useOtherNetworks: true      // Default: false
      }
    };

    let state = await this.endpoint.start();

    console.log("Endpoint started");

    let { accounts, calls, settings, connectivity } = state;

    try {
      console.log("endpoint.createAccount");
      this.account = await this.endpoint.createAccount(configuration);
      console.log("account created", this.account);
    } catch (err) {
      console.log("err");
      console.error(err);
    }

    console.log("accounts:\n", accounts);
    console.log("calls:\n", calls);
    console.log("settings:\n", settings);
    console.log("connectivity:\n", connectivity);

    // Subscribe to endpoint events
    this.endpoint.on("registration_changed", (account) => {
      console.log("registration_changed", account);
    });
    this.endpoint.on("connectivity_changed", (online) => {
      console.log("connectivity_changed", online);
    });
    this.endpoint.on("call_received", (call) => {
      console.log("call_received", call);
      this.call=call;
      this.onCallReceived(call)
    });
    this.endpoint.on("call_changed", (call) => {
      console.log("call_changed", call);
      this.onCallTerminated(call);
      //Если из SIP пришел сигнал повесить трубку - шлем intent в наш Dialer
    });
    this.endpoint.on("call_terminated", (call) => {
      console.log("call_terminated", call);
      this.onCallTerminated(call);
      //Если из SIP пришел сигнал повесить трубку - шлем intent в наш Dialer
    });
    this.endpoint.on("call_screen_locked", (call) => {
      console.log("call_screen_locked", call);
    }); // Android only


  }

  progress = () => {
    console.log("pjsip->progress");
  }

  answer = () => {
    console.log("pjsip->answer");
    let options = {};
    let promise = this.endpoint.answerCall(this.call, options);
    promise.then(() => {
      console.log('Answer complete');
    }).catch((e) => {
      console.error('Answer failed, show error', e);
    });
  }

  hangup = () => {
    console.log("pjsip->hangup");
    this.endpoint.hangup();
  }

  destroy = () => {
    this.endpoint.destroy();
  }
}

//}

export default Pjsip;


/*

            epConfig.getMedConfig().setHasIoqueue(true);
            epConfig.getMedConfig().setClockRate(48000); // def 8000
            epConfig.getMedConfig().setQuality(4);
            epConfig.getMedConfig().setEcOptions(0); // def 0
            epConfig.getMedConfig().setEcTailLen(0); // def 200
            epConfig.getMedConfig().setThreadCnt(2);

*/