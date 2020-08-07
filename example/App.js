/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native';
import 'moment/locale/pt-br';
import Component from 'react-native-schedule-hours';
const App = () => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <Component visible={true} items={[8, 9, 10, 11, 12, 17, 18, 19, 20]} />
    </View>
  );
};

export default App;
