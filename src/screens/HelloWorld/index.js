import React, {Component} from 'react'


import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


var Sound = require('react-native-sound');
var whoosh;


class App extends Component {


  constructor() {
    super();
    this.state = { data: [] };
    //this.endpoint = new Endpoint();
  }

  
  async componentDidMount() {
      return 1;
    // Enable playback in silence mode
console.log("Sys");
//Sound.setCategory('Voice'); // Не регулируется. Налагается на проигрыш
//Sound.setCategory('Ambient'); // Регулируется громкостью. Не проигрывается во время звонка
//Sound.setCategory('System');  // Не регулируется громкость. Звонок глушится и проигрывается этот стрим
//Sound.setCategory('Alarm'); // Делает пикпик и на заднем фоне тихо проигрывается во время звонка
//Sound.setCategory('Ring'); // Регулируется громкостью. Во время звонка не проигрывается

//Sound.setCategory('Voice');
Sound.setCategory('Voice');

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
let url;
//url='https://sound-pack.net/download/Sound_21145_White_Noise.wav';
url='https://www.audiocheck.net/Audio/audiocheck.net_polarity_guitarKO.ogg';  
//url='https://www.audiocheck.net/Audio/audiocheck.net_polarity_guitarOK.ogg';  
//url="https://www.audiocheck.net/Audio/audiocheck.net_L.ogg";
//url="https://www.audiocheck.net/Audio/audiocheck.net_R.ogg";
//url="https://www.audiocheck.net/Audio/audiocheck.net_C.ogg";
//whoosh = new Sound('https://www.audiocheck.net/Audio/audiocheck.net_polarity_guitarOK.ogg', Sound.MAIN_BUNDLE, (error) => {
  //whoosh = new Sound('https://www.audiocheck.net/Audio/audiocheck.net_polarity_guitarKO.ogg', Sound.MAIN_BUNDLE, (error) => {
  //whoosh = new Sound('https://www.audiocheck.net/Audio/audiocheck.net_L.ogg', Sound.MAIN_BUNDLE, (error) => {
  //whoosh = new Sound('https://www.audiocheck.net/Audio/audiocheck.net_R.ogg', Sound.MAIN_BUNDLE, (error) => {
   // whoosh = new Sound('https://www.soundjay.com/button/beep-07.wav', Sound.MAIN_BUNDLE, (error) => {

    console.log(url);
  whoosh = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
    

if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
 
  // Play the sound with an onEnd callback
  whoosh.setNumberOfLoops(2);
  whoosh.setVolume(1);
  //whoosh.setSpeakerphoneOn(true);

  
  whoosh.play((success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });

//whoosh.setPan(1);

console.log('!!volume: ' + whoosh.getVolume());
console.log('!pan: ' + whoosh.getPan());
console.log('!loops: ' + whoosh.getNumberOfLoops());


});

//whoosh.setPan(0);


// Reduce the volume by half
//whoosh.setVolume(0.5);
 
// Position the sound to the full right in a stereo field
//whoosh.setPan(1);
 
// Loop indefinitely until stop() is called
//whoosh.setNumberOfLoops(5);
 
// Get properties of the player instance
/*
 
// Seek to a specific point in seconds
whoosh.setCurrentTime(2.5);
 
// Get the current playback point in seconds
whoosh.getCurrentTime((seconds) => console.log('at ' + seconds));
 
// Pause the sound
whoosh.pause();
 
// Stop the sound and rewind to the beginning
whoosh.stop(() => {
  // Note: If you want to play a sound after stopping and rewinding it,
  // it is important to call play() in a callback.
  whoosh.play();
});*/
//

  }



  async componentWillUnmount() {
    //sipDestroy();
    let a=1;
    whoosh.release();
    console.log("whoosh.release()");


  }

  //const App: () => React$Node = () => {
  render() {




 




    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
              </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
              </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
export default App;
