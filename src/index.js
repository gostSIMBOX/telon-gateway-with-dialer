import React, { Component } from 'react'
import { AppRegistry } from 'react-native';

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import AppScreen from './containers/AppScreen'

//import modules from './modules';
import Tele from './modules/tele.js'
import Pjsip from './modules/pjsip';


export default class Root extends Component {
  constructor(props) {
    super(props);
    this.tele=new Tele();
    //this.pjsip=new Pjsip();
  }  


  async componentDidMount() {
    //request(PERMISSIONS.ANDROID.READ_CALL_LOG).then(result => {console.log("READ_CALL_LOG");});
    //request(PERMISSIONS.ANDROID.READ_PHONE_STATE).then(result => {console.log("READ_PHONE_STATE");});

    Rec=this.tele.Rec;
  }

 

  render() {
    return (
      <AppScreen />
    )
  }
}


