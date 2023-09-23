import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpStyle from '../pages/auth/signUp/SignUpStyle';
import OTP from '../pages/auth/otp/OTP';
import LogIn from '../pages/auth/logIn/LogIn';
import MakeContractOne from '../pages/makeConatract/MakeContractOne';
import MakeContractTwo from '../pages/makeConatract/MakeContarctTwo';
import MakeContractThree from '../pages/makeConatract/MakeContractThree';
import MakeContractFour from '../pages/makeConatract/MakeContractFour';
import Status from '../pages/status/Status';
import EnterData from '../pages/Confidentiality agreement/EnterData';
import SelectRecipient from '../pages/select Recipient/SelectRecipient';
import ConfidentialPreview from "../pages/Confidentiality agreement/ConfidentialPreview";
import CreateNewPdf from "../pages/pdf/CreateNewPdf";
import PaymentOne from "../pages/payment/PaymentOne";
import AuthenticationOne from "../pages/auth/Authentication/AuthenticationOne";
import OtpAfterLogin from "../pages/auth/otp/OtpAfterLogin";


const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='SignUp'
      component={SignUpStyle}
      options={{ headerShown: false }}
    />
    <Stack.Screen name='OTP' component={OTP} options={{ headerShown: false }} />
    <Stack.Screen
      name='LogIn'
      component={LogIn}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='StatusPage'
      component={Status}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='ContractOne'
      component={MakeContractOne}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='ContractTwo'
      component={MakeContractTwo}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='ContractThree'
      component={MakeContractThree}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='ContractFour'
      component={MakeContractFour}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='EnterData'
      component={EnterData}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='SelectRecipient'
      component={SelectRecipient}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='ConfidentialPreview'
      component={ConfidentialPreview}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name='CreateNewPdf'
      component={CreateNewPdf}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name='PaymentOne'
      component={PaymentOne}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name='AuthenticationOne'
      component={AuthenticationOne}
      options={{ headerShown: false }}
    />
     <Stack.Screen
      name='OtpAfterLogin'
      component={OtpAfterLogin}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
