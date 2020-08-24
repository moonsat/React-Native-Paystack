/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import PaystackWebView from 'react-native-paystack';

const App =  () => {
  return (

    <View style={{flex:1}}>
    

      <PaystackWebView  onError={()=>{alert("error")}}
      onDismissed={()=>{alert("User cancelled payment")}}
      onSuccess={(response)=>{alert(response.reference)}}
      paystackKey={"pk_test_caf268193fad2d15a202977bd8553184c99a52dd"} customerEmail={"alexsirguy@gmail.com"} amount={100000}  />

    </View>

  );

};


export default App;
