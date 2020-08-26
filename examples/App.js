/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import PaystackWebView from 'react-native-paystack';

const App = () => {

  const ref = useRef(null);

  const [showPayment, setShowPayment] = React.useState(false);

  return (

    <View style={{ flex: 1, alignItems:"center", justifyContent:"center" }}>


      {!showPayment && <Button onPress={()=>{
        setShowPayment(true)
      }} title="Checkout"   />}


      {showPayment && <PaystackWebView

        ref={ref} 
        
        onError={() => {

          setShowPayment(false);

          alert("Failed...")

        }}

        metadata={{ custom_fields: [{ display_name: "Demo Checkout" }] }}

        onDismissed={() => {

          ref.current.reload(); //reload if dismissed.

        }}

        onSuccess={(response) => { 
          
          setShowPayment(false);

          console.log({response});

          alert(`Transaction successful: ${response.reference}`) 
        
        }}
  
        paystackKey={"pk_test_caf268193fad2d15a202977bd8553184c99a52dd"} customerEmail={"abel@example.com"} amount={6000 * 100} />}

    </View>

  );

};


export default App;
