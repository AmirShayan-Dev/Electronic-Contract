import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUpStyle from './app/pages/auth/signUp/SignUpStyle';
import * as SplashScreen from 'expo-splash-screen';
import OTP from './app/pages/auth/otp/OTP';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigations/AuthNavigator';
import MakeContractThree from './app/pages/makeConatract/MakeContractThree';
import MakeContractFour from './app/pages/makeConatract/MakeContractFour';
import MakeContractOne from './app/pages/makeConatract/MakeContractOne';
import MakeContractTwo from './app/pages/makeConatract/MakeContarctTwo';
import PaymentOne from './app/pages/payment/PaymentOne';
import { Provider } from 'react-redux';
import { store } from './app/store/index';
import AuthenticationOne from './app/pages/auth/Authentication/AuthenticationOne';
import LogIn from './app/pages/auth/logIn/LogIn';
import Status from './app/pages/status/Status';
import EnterData from './app/pages/Confidentiality agreement/EnterData';
import AppLoading from 'expo-app-loading';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import * as Font from 'expo-font';

const getFonts = () => {
  return Font.loadAsync({
    shabnam: require('./app/assets/fonts/Shabnam.ttf'),
  });
};

const App = () => {
  const [fontLoading, set_fontLoading] = useState(false);
  const stack = createStackNavigator();

  if (!fontLoading) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => set_fontLoading(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Provider store={store}>
          <AuthNavigator />
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
