import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MakeContractThree = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const [template, set_template] = useState([]);
  const [changeColor, setChangeColor] = useState(false);

  const getTemplate = async () => {
    const my_token = 'Bearer ' + token;

    try {
      await axios
        .get(
          'https://econtract.irsign.com/pdf-lab/template/get-builtin-templates/',
          {
            headers: {
              Authorization: my_token,
            },
          }
        )
        .then((res) => {
          set_template(res.data['results']);
          console.log(res.data['results']);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTemplate();
  }, []);

  const handleClick = async (templateId) => {
    const index = template.findIndex((val) => val.id === templateId.id);
    if (index !== -1) {
      await AsyncStorage.setItem('template_uid', templateId);
      //console.log('my test', templateId);
      setChangeColor(true);
      getUidTemplate();
    }
  }

  const getUidTemplate = async () => {
    const my_token = 'Bearer ' + token;

    const template_uid = await AsyncStorage.getItem("template_uid");
    console.log("template_uid are : ", template_uid);
    await axios.get(`https://econtract.irsign.com/pdf-lab/template/get-template/${template_uid}`, {
      headers: {
        Authorization: my_token,
      },
    }).then((res) => {
      console.log("data is : ", res.data);
      AsyncStorage.setItem("contract_title", res.data.data["title"]);
      AsyncStorage.setItem("pdf_uid", res.data.data["pdf"]);

    })

  }

  return (
    <ImageBackground
      style={styles.parent}
      Image
      source={Assets.Images.BackgroundSecond}
    >
      <View style={styles.main}>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('ContractTwo')}>
            <Image source={Assets.Images.ArrowBack} />
          </TouchableOpacity>
          <Text style={styles.makeContract}>انتخاب قالب </Text>
        </View>
        <Text style={styles.templateTexts}>قالب‌های آماده</Text>

        <View style={styles.templates}>
          <View style={styles.templateWhole1}>
            {template.map((templateScreen,index) => (
              <TouchableOpacity onPress={() => handleClick(templateScreen.template_uid)} key={index}>
                <ImageBackground
                  //                  style={[styles.bodyTemp1 ,changeColor ? styles.selectedStyle : null]}
                  style={styles.bodyTemp1}
                  Image
                  source={Assets.Images.Template1}
                >
                  <ImageBackground
                    style={styles.temp1}
                    Image
                    source={{
                      uri: `data:image/png;base64,${templateScreen.logo}`,
                    }}
                  >
                    <Text style={changeColor ? styles.selectedStyle : styles.tempText}>{templateScreen.title}</Text>
                  </ImageBackground>
                </ImageBackground>
              </TouchableOpacity>
            ))}

          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ConfidentialPreview')}
          style={styles.button}
        disabled={!changeColor}
        >
          <Text style={styles.buttonText}>تایید</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MakeContractThree;

const styles = StyleSheet.create({
  parent: {
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
    color: '#354054',
    fontSize: 21,
    marginLeft: 195,
    fontFamily: "shabnam",
  },
  templateTexts: {
    color: '#3C4046',
    fontSize: 22,
    marginRight: 106,
    marginTop: 45,
    fontFamily: "shabnam",
  },
  templates: {
    width: 320,
    height: 500,
  },
  templateWhole1: {
    flexDirection: 'row',
  },
  bodyTemp1: {
    width: 126,
    height: 110,
    marginTop: 60,
    marginLeft: 14,
  },
  temp1: {
    width: 89,
    height: 58,
    marginHorizontal: 14,
    marginTop: 15,
  },
  tempText: {
    width: 110,
    height: 20,
    color: colors.white,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 70,
    marginLeft: -5,
    fontFamily: "shabnam",
  },

  button: {
    backgroundColor: colors.primaryMain,
    width: 302,
    height: 56,
    borderRadius: 10,
    marginTop: 42,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 22,
    color: colors.white,
    paddingRight: 130,
    paddingTop: 10,
    fontFamily: "shabnam",
  },
  selectedStyle: {
    width: 110,
    height: 20,
    color: "yellow",
    fontSize: 13,
    textAlign: 'center',
    marginTop: 70,
    marginLeft: -5,
    fontFamily: "shabnam",
  }
});
