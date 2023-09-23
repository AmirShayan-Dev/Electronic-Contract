import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Assets from '../../assets/images';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import axios from "axios";

const SelectRecipient = ({ navigation }) => {

  const token = useSelector((state) => state.auth.token);
  const [contract_uid, set_contract_uid] = useState("");
  const [recipients, setRecipients] = useState([]);

  const getContract = async () => {
    const contract = await AsyncStorage.getItem('contract_uid');
    set_contract_uid(contract);
  }

  const getData = async () => {

    const count = 2;
    const datas = { contract_uid, count }
    const my_token = 'Bearer ' + token;
    console.log("test recepient is : ", datas);
    try {
      await axios.post("https://econtract.irsign.com/contract/recipient-create-auto/", datas, {
        headers: {
          Authorization: my_token,
        },
      }).then((res) => {
      console.log(res.status);
        console.log("response : ", res.data);
        console.log("response is : ", res.data.data["recipients"]);
        setRecipients(res.data.data["recipients"]);
      })

    } catch (e) {
     // console.log("error : ", e.response);
    }
  }

  const handleInputChange = (value, index) => {
    // update the phone number in the specified recipient
    setRecipients([
      ...recipients.slice(0, index),
      { ...recipients[index], phone_number: value },
      ...recipients.slice(index + 1),
    ]);
  };

  const sendContract = async () => {
    const my_token = 'Bearer ' + token;
    const setdata={contract_uid,recipients};
    console.log("sendContract : ",setdata);
    try {
      await axios.post("https://econtract.irsign.com/contract/update-recipient/",setdata, {
        headers: {
          Authorization: my_token,
        },
      }).then((res) => {
        console.log(res.data);
        navigation.navigate('StatusPage');
      })

    } catch(e) {
      console.log("error is : ",e.response);
    }
  }

  useEffect(() => {
    getContract();
    getData();

  }), [];

  return (
    <ImageBackground
      style={styles.Parent}
      Image
      source={Assets.Images.BackgroundSecond}
    >
      <View style={styles.main}>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('EnterData')}>
            <Image source={Assets.Images.ArrowBack} />
          </TouchableOpacity>
          <Text style={styles.makeContract}> انتخاب گیرندگان </Text>
        </View>
        <Text style={styles.title}>قرارداد محرمانگی</Text>

        {recipients.map((field,index) => (
          <View style={styles.RowOneInput} key={index}>
            <ImageBackground
              style={styles.InputOne}
              Image
              source={Assets.Images.RecipientInput}
            >
              <TextInput style={styles.TextInputOne} onChangeText={(value) => handleInputChange(value, index)}>{field.phone_number}</TextInput>
            </ImageBackground>
            <Text style={styles.RecipientOne}>طرف قرارداد</Text>
          </View>
        ))}

        {/* <TouchableOpacity>
          <View style={styles.AddNote}>
            <ImageBackground
              style={styles.SubTrackStyle}
              Image
              source={Assets.Images.SubTrack}
            >
              <Text style={styles.AddNoteText}>افزودن گیرنده</Text>
            </ImageBackground>
            <ImageBackground
              style={styles.PlusIconStyle}
              Image
              source={Assets.Images.PlusIcon}
            ></ImageBackground>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={sendContract}
          style={styles.button}
        >
          <Text style={styles.buttonText}>تایید</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default SelectRecipient;
const styles = StyleSheet.create({
  Parent: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: 320,
    height: 770,
  },
  topIcons: {
    flexDirection: 'row',
  },
  makeContract: {
    width: 220,
    color: '#354054',
    fontSize: 21,
    marginLeft: 80,
  },
  title: {
    fontSize: 15,
    color: colors.primaryMain,
    marginTop: 60,
    marginRight: 120,
    marginBottom: 60
  },
  RowOneInput: {
    flexDirection: 'row',
    width: 260,
    marginLeft: 60,
    marginTop: 20,
  },
  InputOne: {
    width: 141,
    height: 40,
  },
  TextInputOne: {
    // backgroundColor: 'red',
    width: 120,
    marginLeft: 28,
    marginTop: 6,
    paddingVertical: 1,
  },
  RecipientOne: {
    marginLeft: 30,
    marginTop: 10,
    fontSize: 13,
  },
  RowTwoInput: {
    flexDirection: 'row',

    width: 260,
    marginLeft: 60,
    marginTop: 50,
  },
  AddNote: {
    width: 190,
    height: 40,
    flexDirection: 'row',
    marginTop: 65,
    marginLeft: 55,
  },
  PlusIconStyle: {
    width: 40,
    height: 40,
    marginLeft: -14,
  },
  SubTrackStyle: {
    width: 170,
    height: 40,
  },
  AddNoteText: {
    color: colors.primaryMain,
    fontSize: 16,
    paddingTop: 10,
    paddingRight: 45,
  },
  button: {
    backgroundColor: colors.primaryMain,
    width: 302,
    height: 56,
    borderRadius: 10,
    marginTop: 170,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 22,
    color: colors.white,
    paddingRight: 130,
    paddingTop: 10,
  },
});
