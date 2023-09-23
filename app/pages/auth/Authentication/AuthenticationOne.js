import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import colors from '../../../config/colors';
import Assets from '../../../assets/images';
import { SelectList } from 'react-native-dropdown-select-list';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

function AuthenticationOne({ navigation }) {
  const [imageUri, setImageUri] = useState();
  const [selected, setSelected] = useState('');
  const token = useSelector((state) => state.auth.token);
  const [first_name, set_first_name] = useState('');
  const [last_name, set_last_name] = useState('');
  const [first_name_en, set_first_name_en] = useState('');
  const [last_name_en, set_last_name_en] = useState('');
  const [national_id, set_national_id] = useState('');
  const [gender, set_gender] = useState('');
  const [province, set_province] = useState('');
  const [city, set_city] = useState('');
  const [birth_date, set_birth_date] = useState('');

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert(' برای احراز هویت باید اجازه دسترسی بدهید');
    }
  };
  useEffect(() => {
    //requestPermission();
  }, []);
  const SelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.log('Error reading image', error);
    }
    navigation.navigate('StatusPage');
  };

  const handleInformation = async () => {
    const my_token = 'Bearer ' + token;
    const information = {
      first_name,
      last_name,
      first_name_en,
      last_name_en,
      national_id,
      gender,
      province,
      city,
      birth_date,
    };
    try {
      await axios
        .post(
          'https://econtract.irsign.com/auth/authentication/',
          information,
          {
            headers: {
              Authorization: my_token,
            },
          }
        )
        .then((res) => {
          navigation.navigate('StatusPage');
        });
    } catch (e) {
      console.log(e);
    }
    navigation.navigate('Status');
  };

  const data = [
    { key: '1', value: 'مرد' },
    { key: '2', value: 'زن' },
  ];
  return (
    <ScrollView>
      <ImageBackground
        style={styles.parent}
        Image
        source={Assets.Images.BackgroundMain}
      >
        <View style={styles.main}>
          <Text style={styles.text1}>احراز هویت</Text>

          <View style={styles.namesComponent}>
            <Text style={styles.nameTextEnglish}>نام</Text>
            <Text style={styles.nameTextPersian}>نام</Text>
          </View>

          <View style={styles.nameInputComponent}>
            <View style={styles.nameEnglishComponent}>
              <TextInput
                style={styles.nameEnglishInput}
                placeholder='(انگلیسی)'
                placeholderTextColor={'#676C77'}
              ></TextInput>
            </View>
            <View style={styles.namePersianComponent}>
              <TextInput
                style={styles.namePersianInput}
                placeholder='(فارسی)'
                placeholderTextColor={'#676C77'}
              ></TextInput>
            </View>
          </View>

          <View style={styles.familyComponent}>
            <Text style={styles.familyTextEnglish}>نام خانوادگی</Text>
            <Text style={styles.familyTextPersian}>نام خانوادگی</Text>
          </View>

          <View style={styles.familyInputComponent}>
            <View style={styles.familyEnglishComponent}>
              <TextInput
                style={styles.familyEnglishInput}
                placeholder='(انگلیسی)'
                placeholderTextColor={'#676C77'}
              ></TextInput>
            </View>
            <View style={styles.familyPersianComponent}>
              <TextInput
                style={styles.familyPersianInput}
                placeholder='(فارسی)'
                placeholderTextColor={'#676C77'}
              ></TextInput>
            </View>
          </View>

          <View style={styles.thirdIdGenderNames}>
            <Text style={styles.genderText}>جنسیت</Text>
            <Text style={styles.idText}>شماره ملی</Text>
          </View>

          <View style={styles.thirdComponent}>
            <SelectList
              data={data}
              setSelected={setSelected}
              boxStyles={{
                width: 141,
                height: 39,
                paddingTop: 8,
                marginRight: 10,
                flexDirection: 'row-reverse',
              }}
              dropdownStyles={{ width: 141, height: 90, marginLeft: 10 }}
              placeholder=' '
            />

            <View style={styles.idComponentInput}>
              <TextInput style={styles.idInputText}></TextInput>
            </View>
          </View>

          <View style={styles.LocationComponent}>
            <Text style={styles.cityText}>شهر </Text>
            <Text style={styles.city2Text}>استان </Text>
          </View>
          <View style={styles.familyInputComponent}>
            <View style={styles.familyEnglishComponent}>
              <TextInput
                style={styles.familyEnglishInput}
                placeholder='مانند: تهران'
                placeholderTextColor={'#676C77'}
              ></TextInput>
            </View>
            <View style={styles.familyPersianComponent}>
              <TextInput
                style={styles.familyPersianInput}
                placeholder='مانند: تهران'
                placeholderTextColor={'#676C77'}
              ></TextInput>
            </View>
          </View>
          <TouchableOpacity onPress={SelectImage}>
            <View style={styles.SelectImageComp}>
              <View style={styles.BorderComp}>
                <Image source={{ uri: imageUri }} style={styles.Photoooo} />
                <Text style={styles.TextCameraRoll}>
                  عکس خود را در این قسمت وارد کنید
                </Text>

                <ImageBackground
                  style={styles.CameraIcon}
                  Image
                  source={Assets.Images.CameraEnterData}
                ></ImageBackground>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleInformation} style={styles.button}>
            <Text style={styles.buttonText}>تایید</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default AuthenticationOne;
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: 350,
    height: 770,
    marginTop: 100,
  },
  idInputText: {
    textAlign: 'center',
  },
  text1: {
    fontFamily: 'shabnam',
    fontSize: 24,
    color: colors.black,
    marginTop: 70,
    marginRight: 125,
  },
  namesComponent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  nameTextPersian: {
    fontFamily: 'shabnam',
    fontSize: 13,
    marginLeft: 175,
  },
  nameTextEnglish: {
    fontFamily: 'shabnam',
    fontSize: 13,
    marginLeft: 138,
  },
  nameInputComponent: {
    flexDirection: 'row',
    marginTop: 9,
  },
  namePersianComponent: {
    fontFamily: 'shabnam',
    backgroundColor: colors.white,
    width: 141,
    height: 39,
    borderWidth: 1,
    borderColor: '#878E9B',
    borderRadius: 10,
  },
  namePersianInput: {
    fontFamily: 'shabnam',
    paddingRight: 15,
    paddingTop: 3,
    textAlign: 'right',
  },

  nameEnglishComponent: {
    fontFamily: 'shabnam',
    backgroundColor: colors.white,
    width: 141,
    height: 39,
    borderWidth: 1,
    borderColor: '#878E9B',
    borderRadius: 10,
    marginRight: 50,
    marginLeft: 9,
  },
  nameEnglishInput: {
    fontFamily: 'shabnam',
    paddingRight: 15,
    paddingTop: 3,
    textAlign: 'right',
  },

  familyComponent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  familyTextPersian: {
    fontFamily: 'shabnam',
    fontSize: 13,
    marginLeft: 130,
  },
  familyTextEnglish: {
    fontFamily: 'shabnam',
    fontSize: 13,
    marginLeft: 89,
    textAlign: 'right',
  },
  familyInputComponent: {
    fontFamily: 'shabnam',
    flexDirection: 'row',
    marginTop: 9,
  },
  familyPersianComponent: {
    fontFamily: 'shabnam',
    backgroundColor: colors.white,
    width: 141,
    height: 39,
    borderWidth: 1,
    borderColor: '#878E9B',
    borderRadius: 10,
  },
  familyPersianInput: {
    paddingRight: 15,
    fontFamily: 'shabnam',
    paddingTop: 3,
    textAlign: 'right',
  },

  familyEnglishComponent: {
    fontFamily: 'shabnam',
    backgroundColor: colors.white,
    width: 141,
    height: 39,
    borderWidth: 1,
    borderColor: '#878E9B',
    borderRadius: 10,
    marginRight: 50,
    marginLeft: 9,
  },
  familyEnglishInput: {
    paddingRight: 15,
    fontFamily: 'shabnam',
    paddingTop: 3,
    textAlign: 'right',
  },
  thirdIdGenderNames: {
    flexDirection: 'row',
    marginTop: 30,
    fontFamily: 'shabnam',
  },
  idText: {
    marginLeft: 140,
    fontFamily: 'shabnam',
  },
  genderText: {
    fontFamily: 'shabnam',
    marginLeft: 111,
  },
  thirdComponent: {
    flexDirection: 'row',
    marginTop: 9,
    fontFamily: 'shabnam',
  },

  idComponentInput: {
    fontFamily: 'shabnam',
    backgroundColor: colors.white,
    width: 141,
    height: 39,
    borderWidth: 1,
    borderColor: '#878E9B',
    borderRadius: 10,
    marginLeft: 50,
    textAlign: 'right',
  },
  LocationComponent: {
    fontFamily: 'shabnam',
    flexDirection: 'row',
    marginTop: 30,
  },
  cityText: {
    fontFamily: 'shabnam',
    fontSize: 13,
    marginLeft: 125,
  },
  city2Text: {
    fontFamily: 'shabnam',
    fontSize: 13,
    marginLeft: 155,
  },
  SelectImageComp: {
    fontFamily: 'shabnam',
    width: 341,
    height: 85,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#878E9B',
    backgroundColor: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 5,
  },

  BorderComp: {
    width: 317,
    height: 64,
    borderWidth: 1.5,
    borderColor: '#878E9B',
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  Photoooo: {
    width: 64,
    height: 64,
  },
  TextCameraRoll: {
    fontFamily: 'shabnam',
    fontSize: 13,
    color: '#484C53',
    marginTop: 20,
    marginLeft: 20,
  },
  CameraIcon: {
    width: 30,
    height: 30,
    // marginLeft: 18,
    marginTop: 15,
  },
  button: {
    backgroundColor: colors.primaryMain,
    width: 302,
    height: 56,
    borderRadius: 10,
    marginTop: 42,
    marginLeft: 25,
  },
  buttonText: {
    fontFamily: 'shabnam',
    fontSize: 22,
    color: colors.white,
    paddingRight: 130,
    paddingTop: 10,
  },
});
