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

    const EMAIL_ADDRESS = props.customerEmail;

    const CUSTOMER_FIRSTNAME = props.customerFirstName;

    const CUSTOMER_LASTNAME = props.customerLastName;

    const AMOUNT_TO_CHARGE = props.amount;

    const CURRENCY = props.currency;

    const INDICATOR_COLOR = props.indicatorColor;

    const LABEL = props.label;

    const [paystackLoadingStatus, setPaystackLoadingStatus] = useState(Status.DEFAULT);

    useEffect(() => {

        setPaystackLoadingStatus(Status.LOADING);

    }, []);


    let htmlSource = `<html><head><title>Payment</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <head>
    
    <body  style="background-color:#fff;height:100vh">
  
    <script src="https://js.paystack.co/v1/inline.js"></script>
    <script type="text/javascript">
    
            window.onload = payWithPaystack;

            function payWithPaystack(){
         
                
                if(!window.PaystackPop){ //if paystack is loaded

                    var resp = {reason:'failed', success:false, paystack:null};

                    window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                
                }

                else{

                    var handler = PaystackPop.setup({ 
                    key: '${PAYSTACK_KEY}',
                    email: '${EMAIL_ADDRESS}',
                    amount: ${AMOUNT_TO_CHARGE},
                    currency: '${CURRENCY}',
                    firstname: '${CUSTOMER_FIRSTNAME}',
                    lastname: '${CUSTOMER_LASTNAME}',
                    label: '${LABEL || EMAIL_ADDRESS}',
                    callback: function(response){
                            var resp = {success:true, paystack:response};
                            window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    },
                    onClose: function(){
                    
                        var resp = {reason:'closed', success:false, paystack:null};

                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))

                    }

                    });
                    handler.openIframe();
              }}
            
    </script> 
</body>
    
    
    </html>`;



    const onSuccess = (response)=>{

        if(props.onSuccess){

            props.onSuccess(response);

        }

    }

    const onDismissed = ()=>{

        if(props.onDismissed){
            
            props.onDismissed();

        }

    }

    const onError = ()=>{

        if(props.onError){

            props.onError();
        
        }

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

                    if (response.success && response.paystack) {

                        onSuccess(response.paystack);
                        

                    }

                    else {

                        if(response.reason == "closed"){

                            onDismissed();

                        }

                        else{

                            onError();

                        }

                     
                    }


                }} source={{ html: htmlSource }}>

            </WebView>

        </View>;

    }

    const getLoadingView = () => {

        return <View style={{ flex: 1, justifyContent: "center",  alignContent:"center", alignSelf:"center" }}>

            {props.renderIndicator ? props.renderIndicator() : <ActivityIndicator size={'large'} color={INDICATOR_COLOR}></ActivityIndicator>}

        </View>

    }


    const getMainComponent = () => {

        switch (paystackLoadingStatus) {

            case Status.LOADING:

                return  getLoadingView();

            default:
                return <View></View>

        }

    }

    return (

        <View style={{ flex: 1, height:"100%", width:"100%" }}>

            {getMainComponent()}

            {getPaystackWidget()}

        </View>
    )

}


PaystackWebView.propTypes = {

    paystackKey: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    customerFirstName: PropTypes.string,
    customerLastName: PropTypes.string,
    currency: PropTypes.string,
    onError: PropTypes.func,
    onDismiss: PropTypes.func,
    onSuccess: PropTypes.func,
    indicatorColor: PropTypes.string,
    renderIndicator: PropTypes.func,
    label: PropTypes.string,

}

PaystackWebView.defaultProps = {

    indicatorColor: "#126B9D",
    currency: "NGN",

}

export default PaystackWebView;
