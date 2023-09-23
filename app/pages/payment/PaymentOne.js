import React, { useState,useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../../config/colors';
import Assets from '../../assets/images';
import axios from "axios";
import { useSelector } from 'react-redux';

const PaymentOne =({navigation})=> {

  const Amount = "10000";
  
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async()=>{
    const data = {Amount};
    const my_token = 'Bearer ' + token;
    try{
      await axios.post("https://econtract.irsign.com/payment/paymentCreateTokenURL/",data,{
      headers: {
        Authorization: my_token,
      },
    }).then((res)=>{
      console.log(res.data);
    })
    }catch(e){
      console.log(e.response);
    }
  }
  return (
    <ImageBackground
      style={styles.parent}
      Image
      source={Assets.Images.BackgroundMain}
    >
      <View style={styles.main}>
        <Text style={styles.text1}>صدور گواهی</Text>
        <Text style={styles.text2}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است
        </Text>
        <Text style={styles.text3}>مبلغ {Amount} تومان</Text>
        <View style={styles.paymentType}>
          <Text style={styles.paymentTypeText}>پرداخت نشده</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
          <Text style={styles.payButtonText}>پرداخت</Text>
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
    height: 550,
    marginTop: 200,
  },
  text1: {
    fontSize: 24,
    color: colors.black,
    marginRight: 95,
    marginTop: 40,
  },
  text2: {
    fontSize: 15,
    color: '#484C53',
    textAlign: 'center',
    marginTop: 40,
  },
  text3: {
    fontSize: 16,
    color: colors.black,
    marginTop: 80,
    marginRight: 85,
  },
  paymentType: {
    width: 212,
    height: 51,
    marginTop: 85,
    marginLeft: 45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#878E9B',
  },
  paymentTypeText: {
    fontSize: 18,
    paddingRight: 60,
    paddingTop: 12,
    color: colors.systemError,
    // color:colors.systemSuccessful, //api call switch
  },
  payButton: {
    backgroundColor: colors.primaryMain,
    width: 307,
    height: 56,
    borderRadius: 10,
    marginBottom: 11,
    marginTop: 75,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 24,
    // fontFamily: 'IRANYEKANREGULARFANUM',
    paddingRight: 120,
    paddingTop: 10,
    // fontWeight: 700,
  },
});

export default PaymentOne;
