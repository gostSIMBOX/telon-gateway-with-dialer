/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

import configureStore from './src/modules/configureStore'
const store = configureStore()

AppRegistry.registerHeadlessTask('Rec', () => Rec);
AppRegistry.registerHeadlessTask('TeleRec', () => require('./src/modules/event-handler.js').bind(null, store));

AppRegistry.registerComponent(appName, () => App);



