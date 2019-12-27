import React, { Component } from 'react'
import { AppRegistry } from 'react-native';

import invokeApp from 'react-native-invoke-app';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import AppScreen from './containers/AppScreen'

//import modules from './modules';
import Tele from './modules/tele.js'
import Pjsip from './modules/pjsip';
import Call from './modules/call'

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.tele = new Tele();
    //this.pjsip=new Pjsip();

    this.state={
      call:null,
      calls:null,
    }

  }


  async componentDidMount() {
    //request(PERMISSIONS.ANDROID.READ_CALL_LOG).then(result => {console.log("READ_CALL_LOG");});
    //request(PERMISSIONS.ANDROID.READ_PHONE_STATE).then(result => {console.log("READ_PHONE_STATE");});
    this.tele.parent = this;
    Rec = this.tele.Rec;

    //let call=new Call({remoteUri:"sip:s11s@sss11"});
    //let call=new Call({remoteUri:"tel:222"});
    //this.setState({ call: call });
  }

  onCallReceived = (call) => {
    console.log("index->onCallReceived");
    this.AppScreen1.setState({ call: call },invokeApp);
    //invokeApp();
  }

  onCallTerminated = (call) => {
    console.log("index->onCallTerminated");
    this.AppScreen1.setState({ call: call });
  }



  render() {
    const call=this.state.call;
    const calls = (call?{call1:call}:{}); //this.props.calls;

    return (
      <AppScreen call={call} calls={calls} ref={(c) => {
        this.AppScreen1 = c
      }} />
    )
  }
}


