import React, {Component} from 'react'
import cs from '../assets/styles/containers'
import {View, StatusBar} from 'react-native';

import Viewport from './AppViewport'

//export default Viewport;

import CallScreen from '../screens/CallScreen'
import HelloWorld from '../screens/HelloWorld'


class AppScreen extends Component {

  
  render()
{
    const full = false; //navigation.current.name === "call"
  const barColor = "#36454b"
  const barStyle = "light-content"

      //FIX
          //const call = this.state.call
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
  
        let calls={c1:call};
    //
    
  //return <HelloWorld/>;
  return <View style={cs.max}>
            <StatusBar
          backgroundColor={barColor}
          barStyle={barStyle}
          hidden={full}
        />
    <CallScreen call={call} calls={calls}/></View>;
  //return <div></div>;
}

}
export default AppScreen;
