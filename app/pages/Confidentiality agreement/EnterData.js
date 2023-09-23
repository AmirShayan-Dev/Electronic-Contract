import React, { useEffect, useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Input, Button } from "native-base";

const EnterData = ({ navigation }) => {
  const [imageUri, setImageUri] = useState();
  const [fields, set_fields] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [contract_uid, set_contract_uid] = useState("");
  const [document_parameters, set_document_parameters] = useState({});
  const [my, set_my] = useState({});




  const getUisContract = async () => {
    const test = await AsyncStorage.getItem("contract_uid");
    set_contract_uid(test);

  }

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert(' برای احراز هویت باید اجازه دسترسی بدهید');
    }
  };

  const SelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.log('Error reading image', error);
    }
  };

  const getUidTemplate = async () => {
    const my_token = 'Bearer ' + token;

    const template_uid = await AsyncStorage.getItem("template_uid");
    console.log("template_uid are : ", template_uid);
    await axios.get(`https://econtract.irsign.com/pdf-lab/template/get-template/${template_uid}`, {
      headers: {
        Authorization: my_token,
      },
    }).then((res) => {
      set_fields(res.data.data["document_parameters"]["fields"]);

    })

  }

  const handleChange = (fieldName, fieldValue) => {
    // store user input in state
    set_document_parameters({ ...document_parameters, [fieldName]: fieldValue });
  }

  const renderField = (field, index) => {
    if (field.type === 'text') {
      return (
        <View style={styles.testview}>
          <Input style={styles.testInput} placeholder={field.title} onChangeText={(text) => handleChange(field.title, text)} key={index} />
        </View>
      )

    } else if (field.type === 'image') {
      return null;
    } else if (field.type === 'title') {
      return <Text style={{ textAlign: "center", margin: "5px 0" }} key={index}>{field.title}</Text>;
    }
  }



  useEffect(() => {
    //  requestPermission();
    getUidTemplate();
    getUisContract();

  }, []);

  const handleSubmit = () => {
    const my_token = 'Bearer ' + token;
    // set_my({"fields":document_parameters});

    const mytest1 = { contract_uid, "fields": document_parameters };

    const mytest = {
      contract_uid,
      "document_parameter": {
        "fields": document_parameters
      }
    };

    console.log("document_parameters : ", mytest);


    // submit form data to server
    axios.patch('https://econtract.irsign.com/contract/update-contract-doc/', mytest, {
      headers: {
        Authorization: my_token,
      },

    })
      .then(response => {
        console.log("edit input : ", response.data);
        console.log(response.status);
        navigation.navigate('SelectRecipient');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <ImageBackground
      style={styles.parent}
      Image
      source={Assets.Images.BackgroundSecond}
    >
      <View style={styles.main}>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('ContractOne')}>
            <Image source={Assets.Images.ArrowBack} />
          </TouchableOpacity>
          <Text style={styles.makeContract}>ایجاد قرارداد</Text>
        </View>
        <ScrollView style={styles.container}>
          {fields.map((field, index) => renderField(field, index))}
          {/* {fields.map((field) => (
            <View style={styles.testview}>
              <Input style={styles.testInput} placeholder={field.title} />
            </View>
          ))} */}
        </ScrollView>

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>تایید</Text>
        </TouchableOpacity>


      </View>
    </ImageBackground>
  );
}

export default EnterData;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '90%',
    height: '90%',
    //backgroundColor: 'white',
  },
  topIcons: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15
  },
  makeContract: {
    textAlign: 'right',
    //fontWeight: 'bold',
    flex: 1,
    fontFamily: "shabnam",
    fontSize: 18
  },
  container: {
    flex: 1,
  },
  testview: {

    alignItems: 'center',
    marginBottom: 8

  },
  testInput: {
    backgroundColor: "white",
    fontSize: 14,
    fontFamily: "shabnam",
  },
  focusedInput: {
    //borderColor: 'blue',
  },
  button: {
    backgroundColor: colors.primaryMain,
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: "shabnam",
    fontSize: 18
  },
});


