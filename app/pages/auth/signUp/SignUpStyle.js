import React, { useState } from 'react';
import { apiClient } from '../../../api/apiConfig/ApiClient';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../../../config/colors';
import Assets from '../../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUpStyle({ navigation }) {
  const [phone_number, set_phone_number] = useState('');
  const [showMessage, set_showMessage] = useState(false);

  const handleSubmit = () => {
    const user = { phone_number };
    if (phone_number.length !== 0 && phone_number.length == 11) {
      set_showMessage(false);
      apiClient.post('/auth/signup/', { data: user }).then((res) => {
        console.log(res.data);
        AsyncStorage.setItem('phone_number', phone_number);
        AsyncStorage.setItem('otp_ticket', res.data['otp_ticket']);
        navigation.navigate('OTP');
      });
    } else {
      set_showMessage(true);
    }
  };

  return (
    <ImageBackground
      style={styles.parent}
      Image
      source={Assets.Images.BackgroundMain}
    >
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.text}>ثبت نام</Text>
        </View>

        <View style={styles.phone_number_box}>
          <TextInput
            value={phone_number}
            onChangeText={set_phone_number}
            style={styles.Phone_number_box_input}
            placeholder='شماره موبایل'
            textAlign='right'
            placeholderTextColor='#878E9B'
            keyboardType='numeric'
          />

          <Image source={Assets.Images.mobileIcon} />
        </View>

        {showMessage ? (
          <Text style={styles.errorText}>
            شماره تلفن یازده رقمی خود را وارد کنید
          </Text>
        ) : null}

        <TouchableOpacity style={styles.sign_button} onPress={handleSubmit}>
          <Text style={styles.sign_text_button}>تایید</Text>
        </TouchableOpacity>

        <View style={styles.logInComponent}>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.login_button}> ورود </Text>
          </TouchableOpacity>
          <Text style={styles.text_login}>حساب کاربری دارید؟</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: 308,
    height: 823,
  },

  container: {
    flex: 1,
    marginTop: 300,
    marginRight: 125,
  },
  sign_text_button: {
    color: colors.white,
    fontSize: 24,
    fontFamily: 'shabnam',
    paddingRight: 133,
    paddingTop: 10,
  },
  sign_button: {
    backgroundColor: colors.primaryMain,
    width: 307,
    height: 56,
    borderRadius: 10,
    marginBottom: 11,
    marginTop: 228,
  },
  text: {
    fontSize: 24,
    fontStyle: 'normal',
    fontFamily: 'shabnam',
  },

  logInComponent: {
    flexDirection: 'row',
    marginLeft: 89,
    marginBottom: 70,
  },
  text_login: {
    color: '#878E9B',
    fontSize: 14,
    fontFamily: 'shabnam',
  },
  login_button: {
    fontSize: 17,
    color: colors.primaryMain,
    textDecorationLine: 'underline',
    fontFamily: 'shabnam',
  },
  phone_number_box: {
    flexDirection: 'row',
    border: 10,
    borderRadius: 10,
    paddingRight: 3,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#878E9B',
    // marginBottom: 228,
  },
  Phone_number_box_input: {
    width: 270,
    height: 20,
    borderRadius: 10,
    paddingRight: 5,
    fontFamily: 'shabnam',
  },
  errorText: {
    color: colors.systemError,
    marginRight: 10,
    fontFamily: 'shabnam',
    //   marginTop: 5,
    //   marginBottom: 200,
  },
});

export default SignUpStyle;
