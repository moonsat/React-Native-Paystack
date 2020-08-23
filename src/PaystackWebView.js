import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, } from 'react-native'
import WebView from "react-native-webview";

const Status = { //status enums
    DEFAULT: "",
    LOADING : "loading",
    ERROR: "error",
    LOADED: "loaded"
  }


function PaystackWebView(props) {

   

    const PAYSTACK_KEY = props.paystackKey;

    const EMAIL_ADDRESS = props.emailAddress;

    const AMOUNT_TO_CHARGE = props.amountToCharge;

    const CURRENCY = props.currency || "NGN";

    const INDICATOR_COLOR = props.indicatorColor || "#00FF00";

    const [paystackLoadingStatus, setPaystackLoadingStatus] = useState(Status.DEFAULT);

    useEffect(() => {

        setPaystackLoadingStatus(Status.LOADING);

    }, []);


    let htmlSource = `<html><head><title>Payment</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <head>
    
    <body style="background-color:#fff;height:100vh">
  
    <script src="https://js.paystack.co/v1/inline.js"></script>
    <script type="text/javascript">
            window.onload = payWithPaystack;
            function payWithPaystack(){
               
            var handler = PaystackPop.setup({ 
              key: '${PAYSTACK_KEY}',
              email: '${EMAIL_ADDRESS}',
              amount: ${AMOUNT_TO_CHARGE},
              currency: '${CURRENCY}',
              callback: function(response){
                    var resp = {success:true, paystack:response};
                     window.ReactNativeWebView.postMessage(JSON.stringify(resp))
              },
              onClose: function(){
               
                var resp = {success:false, paystack:null};

                window.ReactNativeWebView.postMessage(JSON.stringify(resp))

              }

              });
              handler.openIframe();
              }
            
    </script> 
</body>
    
    
    </html>`;


    const getPaymentWidgetErrorView = () => {

        return (

            <View style={{ flex: 1, alignItem: "center", justifyContent: "center" }}>


                <Text>Error page</Text>


            </View>

        );


    }





    const getPaystackWidget = () => {

        return <View style={{ height: paystackLoadingStatus == Status.LOADED ? "100%" : "0%" }}>

            <WebView


                javaScriptEnabled={true} //enabling JavaScript

                onLoadStart={() => {
                    setPaystackLoadingStatus(Status.LOADING);
                }}

                onLoadEnd={(event) => {

                    setPaystackLoadingStatus(Status.LOADED);

                }}


                onMessage={(event) => {

                    var result = event.nativeEvent.data;

                    var response = JSON.parse(result);

                    if (response.success) {

                        var paystackTransactionReferenceCode = response.paystack.reference;

                        alert('success...');

                        alert(paystackTransactionReferenceCode);

                        // props.navigation.goBack();

                        // props.onPaymentCompleted({'reference':paystackTransactionReferenceCode})

                    }

                    else {

                        alert("error...")

                        // props.navigation.goBack();

                        // props.onPaymentFailed();
                    }


                }} source={{ html: htmlSource }}>

            </WebView>

        </View>;

    }

    const getLoadingView = () => {

        return <View style={{ flex: 1, justifyContent: "center", alignItem: "center" }}>


            <ActivityIndicator size={'large'} color={INDICATOR_COLOR} style={{ alignSelf: "center" }}></ActivityIndicator>

        </View>

    }


    const getMainComponent = () => {

            if (paystackLoadingStatus) {

                switch (paystackLoadingStatus) {

                    case Status.LOADING:

                        return getLoadingView();

                    case Status.LOADED:
                        return <View></View>

                    case Status.ERROR:
                        return getPaymentWidgetErrorView();

                }

            }

            else {

                return getLoadingView();
            }

    }

    return (

        <View style={{ flex: 1 }}>

            {getMainComponent()}

            {paystackLoadingStatus == Status.LOADED &&  getPaystackWidget()}

        </View>
    )

}

export default PaystackWebView;
