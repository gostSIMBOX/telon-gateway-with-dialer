/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';


import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

//import { AudioRecorder, AudioUtils } from 'react-native-audio'




import pjsipC from './src/modules/pjsip';
const pjsip=new pjsipC;
//const audioPath = AudioUtils.DocumentDirectoryPath + '/record.aac'



const onCallReceived= (call) => {
        //Если из SIP пришел сигнал инициации вызова - шлем intent в наш Dialer на набор номера
        //RNImmediatePhoneCall.immediatePhoneCall('900');
        
        //HACK
        pjsip.answer();

        /*
        setTimeout(() => {
            const sound = new Sound(audioPath, '')
      
            setTimeout(() => {
              sound.play((success) => {
                if (!success) Alert.alert('Error', 'no records found')
              })
            }, 100)
          }, 100)
      */

        //++В Dialer отслеживаем подъем трубки и возвращаем ответ в SIP
        //++Или если не можем набрать - например модуль уже используется - шлем занято
        //Позже когда событие дозвона в Dialerе (или callrecordere)
        //Код переместить туда 

}

const onCallTerminated = (call) => {
        // В Dialer - шлем hangup
}



AppRegistry.registerComponent(appName, () => App);

const Rec = async (data) => {
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

AppRegistry.registerHeadlessTask('Rec', () => Rec);

console.log(pjsip);

 pjsip.init();


pjsip.onCallReceived=onCallReceived;
pjsip.onCallTerminated=onCallTerminated;