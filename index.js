/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';


console.log("index start");
AppRegistry.registerHeadlessTask('Rec', () => Rec);
myApp= AppRegistry.registerComponent(appName, () => App);



