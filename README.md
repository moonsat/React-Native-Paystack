# Accept Paystack Payments in React Native Apps.

A super simple and lightweight react-native package for accepting payments using paystack. Doesn't require any form of linking, just install and start using.

## Installation
Add React-Native-Paystack-Popup to your project by running:

`npm install react-native-paystack-popup`

or

`yarn add react-native-paystack-popup`

## Dependency
This package is dependent on [react-native-webview](https://github.com/react-native-community/react-native-webview). Install the dependency by running the following command on your terminal:

`yarn add react-native-webview`

or 

`npm install react-native-webview`

## DEMO
<h1>
<img src="https://github.com/moonsat/React-Native-Paystack/raw/master/examples/screenshots/1.png" alt="Screenshot 1" width="280" height="500">

<img src="https://github.com/moonsat/React-Native-Paystack/raw/master/examples/screenshots/2.png" alt="Screenshot 1" width="280" height="500">

</h1>

### Usage Example

```jsx
import React, { useRef } from 'react';

import {
  View,
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
        
          alert(`Transaction successful: ${response.reference}`) 
        
        }}
        
        paystackKey={"pk_xxxx-xxxx-xxxx-xxxx"} customerEmail={"abel@example.com"} amount={6000 * 100} />}

    </View>

  );

};
```

### CONFIGURATION
| Property        | Required           | Description  |
| ------------- |:-------------:| ------|
| paystackKey   | Yes | Paystack Public Key |
| customerEmail   | Yes | Customer email address |
| amount   | Yes | Amount (in the lowest currency value - kobo, pesewas or cent) |
| currency   | No | Currency charge should be performed in. It defaults to NGN |
| label   | No | String that replaces customer email as shown on the checkout form |
| metadata   | No | Object containing any extra information you want recorded with the transaction. Fields within the custom_field object will show up on customer receipt and within the transaction information on the Paystack Dashboard. |
| channels   | No | An array of payment channels to control what channels you want to make available to the user to make a payment with. Available channels include; `['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']` |
| transactionRef   | No | Unique case sensitive transaction reference. Only -,., =and alphanumeric characters allowed. If you do not pass this parameter, Paystack will generate a unique reference for you. |
| onError   | No | Error callback function - failed loading paystack |
| onDismissed   | No | Callback function for when user dismisses / cancels the payment |
| onSuccess   | No | Callback function with a response parameter when payment was successfully completed. |
| indicatorColor   | No | Color name for the default loading indicator |
| renderIndicator   | No | Override this function and return a component to change the default loading indicator|

## Maintenance

This project is actively maintained by the following developers:

- [Abel Joshua](https://github.com/iamabeljoshua) ([Twitter @iamabeljoshua](https://twitter.com/iamabeljoshua))


### Example App

For more information and usage guidelines, check the [Examples App](https://github.com/moonsat/React-Native-Paystack/tree/master/examples).

If you encounter any problem using this library, open a new [issue](https://github.com/moonsat/React-Native-Paystack/issues)

### Contribution

If you want to make contribution to this library:

- Fork this project.
- Each new feature must be a new PR.
- Explain exactly what your PR is suppose to do.

Your PR will reviewed and merged!


