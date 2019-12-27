import React, { Component } from 'react'
import cs from '../assets/styles/containers'
import { View, StatusBar } from 'react-native';

import Viewport from './AppViewport'

//export default Viewport;

import CallScreen from '../screens/CallScreen'
import HelloWorld from '../screens/HelloWorld'


class AppScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      call:null,
      calls:null,
    }

  }

  render() {
    console.log("AppScreen->Render");
    console.log(this.state.call);

    const full = false; //navigation.current.name === "call"
    const barColor = "#36454b"
    const barStyle = "light-content"

    const call=this.state.call;
    const calls = (call?{call1:call}:{}); //this.props.calls;

    return <View style={cs.max}>
      <StatusBar
        backgroundColor={barColor}
        barStyle={barStyle}
        hidden={full}
      />
      <CallScreen call={call} calls={calls}
      /></View>;
  }

}
export default AppScreen;
