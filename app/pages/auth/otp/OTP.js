import React, { useState, useEffect } from 'react';
import { apiClient } from '../../../api/apiConfig/ApiClient';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../../../config/colors';
import Assets from '../../../assets/images';
import InputNumber from '../../../components/inputComponent/InputNumber';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SetToken } from '../../../action/index';
import { useToast } from 'native-base';

function OTP({ navigation }) {
  const [otp_ticket, set_otp_ticket] = useState('');
  const [phone_number, setphoneNumber] = useState('');
  const [otp_code, set_otp_code] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const [showMessage, set_showMessage] = useState(false);

  const getcode = async () => {
    const test = await AsyncStorage.getItem('otp_ticket');
    set_otp_ticket(test);
    const result = await AsyncStorage.getItem('phone_number');
    setphoneNumber(result);
  };

  useEffect(() => {
    getcode();
  }, []);
  const handleOTP = async () => {
    if (otp_code.length !== 0 && otp_code.length == 6) {
      const result = { otp_ticket, otp_code };
      await apiClient
        .post('/auth/verify-otp/', { data: result })
        .then((res) => {
          console.log('data : ', res.data);
          AsyncStorage.setItem('access_token', res.data['access_token']);
          console.log('test : ', res.data['access_token']);
          dispatch(SetToken(res.data['access_token']));
          navigation.navigate('AuthenticationOne');
          toast.show({
            //          title: "success",
            //          variant: "outline",
            description: 'با موفقیت وارد شدید',
            style: { backgroundColor: '#367c2b' },
          });
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
        <View style={styles.textNumber}>
          <Text style={styles.text1}>لطفا کد ارسال شده به </Text>
          <Text style={styles.text2}>شماره {phone_number} را وارد کنید</Text>
        </View>
        <View style={styles.input}>
          {/* <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#484C53',
              width: 200,
            }}
            value={otp_code}
            onChangeText={(text) => set_otp_code(text)}
            keyboardType='numeric'
            maxLength={6}
          ></TextInput> */}
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#484C53',
              width: 200,
            }}
            value={otp_code}
            onChangeText={(text) => set_otp_code(text)}
            textAlign='center'
            keyboardType='numeric'
            maxLength={7}
          />
          {/* <InputNumber /> */}
        </View>
        {showMessage ? (
          <Text style={styles.errorText}>
            کد شش رقمی خود را بطور صحیح وارد کنید
          </Text>
        ) : null}
        {/* <View>
          <Text style={styles.text3}>ارسال مجدد کد ۲:۰۰</Text>
        </View> */}

        <TouchableOpacity style={styles.confirmButton} onPress={handleOTP}>
          <Text style={styles.confirmTextButton}>تایید</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.changeTextButton}>ویرایش شماره</Text>
        </TouchableOpacity>
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
  textNumber: {
    marginTop: 270,
    marginRight: 20,
  },
  text1: {
    color: '#484C53',
    textAlign: 'center',
    fontSize: 18,
    fontFamily:"shabnam",
    //fontWeight: 500,
  },
  text2: {
    color: '#484C53',
    textAlign: 'center',
    fontSize: 18,
    fontFamily:"shabnam",
    //fontWeight: 500,
  },
  input: {
    // backgroundColor: 'red',
    // justifyContent:'space-evenly',
    marginTop: 67,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: colors.primaryMain,
    width: 307,
    height: 56,
    borderRadius: 10,
    marginTop: 175,
  },
  confirmTextButton: {
    color: colors.white,
    fontSize: 24,
    //fontWeight: 700,
    paddingRight: 133,
    paddingTop: 10,
    fontFamily:"shabnam",
  },
  changeButton: {
    width: 307,
    height: 56,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primaryMain,
    marginTop: 35,
  },
  changeTextButton: {
    paddingRight: 100,
    paddingTop: 10,
    color: colors.primaryMain,
    fontSize: 20,
    fontFamily:"shabnam",
    //fontWeight: 700,
  },
  input1: {
    borderBottomColor: '#484C53',
    backgroundColor: 'red',
  },
  text3: {
    color: colors.primaryMain,
    fontSize: 12,
    //fontWeight: 700,
  },
  errorText: {
    color: colors.systemError,
    marginRight: 40,
    marginTop: 10,
    fontFamily:"shabnam",
  },
});

export default OTP;
