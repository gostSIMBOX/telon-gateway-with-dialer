import React, { Component } from 'react'
import { AppRegistry } from 'react-native';

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


  }


  async componentDidMount() {
    //request(PERMISSIONS.ANDROID.READ_CALL_LOG).then(result => {console.log("READ_CALL_LOG");});
    //request(PERMISSIONS.ANDROID.READ_PHONE_STATE).then(result => {console.log("READ_PHONE_STATE");});
    this.tele.parent = this;
    Rec = this.tele.Rec;

    //let call=new Call({remoteUri:"sip:s11s@sss11"});
    //let call=new Call({remoteUri:"tel:222"});
    //this.AppScreen1.setState({ call: call });
  }

  onCallReceived = (call) => {
    console.log("index->onCallReceived");
    this.AppScreen1.setState({ call: call });
  }

  onCallTerminated = (call) => {
    console.log("index->onCallTerminated");
    this.AppScreen1.setState({ call: call });
  }



  render() {

    return (
      <AppScreen ref={(c) => {
        this.AppScreen1 = c
      }} />
    )
  }
}


