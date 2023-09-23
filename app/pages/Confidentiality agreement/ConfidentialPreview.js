import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground, ScrollView
} from 'react-native';
import Assets from '../../assets/images';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useSelector } from 'react-redux';

const ConfidentialPreview = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [contract_uid, set_contract_uid] = useState("");
  const [template_uid, set_template_uid] = useState("");
  const [contract_title , set_contract_title] = useState("");

  const token = useSelector((state) => state.auth.token);

  const getContractUid = async () => {
    const test1 = await AsyncStorage.getItem("contract_uid");
    set_contract_uid(test1);
  }

  const getTemplateUid = async () => {
    const test2 = await AsyncStorage.getItem("template_uid");
    set_template_uid(test2);
  }

  const getContractTitle = async () => {
    const test3 = await AsyncStorage.getItem("contract_title");
    set_contract_title(test3);
  }

  const getPreview = async () => {
    const my_token = 'Bearer ' + token;

    const file_uid = await AsyncStorage.getItem("pdf_uid");
    const mydata = { file_uid };
    console.log("template_uid are : ", file_uid);
    await axios.post("https://econtract.irsign.com/pdf-lab/template/get-pages-image/", mydata, {
      headers: {
        Authorization: my_token,
      },
    }).then((res) => {
      setImages(res.data.data["pages"]);
    })

  }

  useEffect(() => {
    getContractTitle();
    getPreview();
    getContractUid();
    getTemplateUid();
    
  }, []);

  const handleClick = async () => {
    const my_token = 'Bearer ' + token;

    const mydata = { contract_uid, template_uid };
    console.log("mydata : ", mydata);
    await axios.post("https://econtract.irsign.com/pdf-lab/template/set-template/", mydata, {
      headers: {
        Authorization: my_token,
      },
    }).then((res) => {
      console.log("fix : ", res.data.data);
      navigation.navigate('EnterData')
    })
  }

  return (
    <ImageBackground
      style={styles.Parent}
      Image
      source={Assets.Images.BackgroundSecond}
    >
      <View style={styles.main}>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('ContractOne')}>
            <Image source={Assets.Images.ArrowBack} />
          </TouchableOpacity>
          <Text style={styles.makeContract}> {contract_title} </Text>
        </View>
        {/* <View style={styles.PreviewTemp}></View> */}

        <ScrollView style={styles.container}>
          {images.map((image,index) => (
            <Image
              key={index}
              style={styles.image}
              source={{ uri: `data:image/png;base64,${image.image}` }}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={handleClick}
          style={styles.button}
        >
          <Text style={styles.buttonText}>بعدی</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default ConfidentialPreview;

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
    fontFamily: "shabnam",
  },
  PreviewTemp: {
    width: 328,
    height: 466,
    backgroundColor: '#D9D9D9',
    // marginTop: 136,
  },
  button: {
    backgroundColor: colors.primaryMain,
    width: 302,
    height: 56,
    borderRadius: 10,
    marginTop: 25,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 22,
    color: colors.white,
    paddingRight: 130,
    paddingTop: 10,
    fontFamily: "shabnam",
  },
  container: {
    flex: 1,
    borderRadius:20,
    marginTop:20
  },
  image: {
    width: 'auto',
    height: 500,
    marginBottom: 20,
    borderRadius:10
  },
});
