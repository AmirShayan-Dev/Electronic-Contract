import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/apiConfig/ApiClient';
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
import axios from 'axios';
import Assets from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useToast } from 'native-base';
import { Alert, Button, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import moment from 'moment-jalaali';

function MakeContractOne({ navigation }) {
  const [title, set_title] = useState('');
  const [description, set_description] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const due_date = selectedDate;
  const [add_owner_as_recipient, set_add_owner_as_recipient] = useState('true');
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setModalVisible(false);
  };

  //checkBox
  const [isChecked, setChecked] = useState(false);
  //checkBox
  //validation Boxes
  const [showMessage, set_showMessage] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleCreateContract = async () => {
    if (title.length !== 0 && description.length !== 0) {
      const contract = { title, description, due_date, add_owner_as_recipient };
      const my_token = 'Bearer ' + token;
      console.log('contract is : ', contract);

      try {
        await axios
          .post('https://econtract.irsign.com/contract/create/', contract, {
            headers: {
              //  "Content-Type": "application/json",
              Authorization: my_token,
            },
          })
          .then((res) => {
            console.log(res.data);
            set_title('');
            set_description('');
            AsyncStorage.setItem('contract_uid', res.data.data['contract_uid']);
            console.log('contract_uid is : ', res.data.data['contract_uid']);

            toast.show({
              //          title: "success",
              //          variant: "outline",
              description: 'قرارداد با موفقیت ایجاد شد',
              style: { backgroundColor: '#367c2b' },
            });

            navigation.navigate('ContractTwo');
          });
      } catch (e) {
        console.log(e);
        console.log('my token is : ', my_token);

        //                Alert.alert(
        //                  'error',
        //                  error.data['message'],
        //                  [
        //                    {
        //                      text: 'OK',
        //                      onPress: () => console.log('OK'),
        //                      style: 'cancel',
        //                    },
        //                  ],
        //                  { cancelable: false }
        //                );
      }
    } else {
      set_showMessage(true);
    }
  };

  return (
    <ImageBackground
      style={styles.parent}
      Image
      source={Assets.Images.BackgroundSecond}
    >
      <View style={styles.main}>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('StatusPage')}>
            <Image source={Assets.Images.ArrowBack} />
          </TouchableOpacity>
          <Text style={styles.makeContract}>ایجاد قرارداد</Text>
        </View>
        <View style={styles.text2Component}>
          <Text style={styles.text2}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است
          </Text>
        </View>
        <View style={styles.contractNameComponent}>
          <TextInput
            value={title}
            onChangeText={(text) => set_title(text)}
            style={styles.contractName}
            placeholder='موضوع قرارداد '
            textAlign='right'
            placeholderTextColor='#878E9B'
          />
        </View>
        <View>
          <TextInput
            value={description}
            onChangeText={(text) => set_description(text)}
            style={styles.bodyProject}
            placeholder='باکس توضیحات'
            textAlign='right'
            textAlignVertical='top'
            placeholderTextColor='#878E9B'
          />
        </View>
        {showMessage ? (
          <Text style={styles.errorText}>
            باکس های موضوع و توضیحات خالی می باشد
          </Text>
        ) : null}

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 50,
            marginTop: 20,
            marginLeft: 105,
          }}
        >
          <Modal
            animationType='slide'
            transparent={false}
            visible={modalVisible}
          >
            <PersianCalendarPicker
              selectedStartDate={selectedDate}
              onDateChange={handleDateChange}
              style={{ flex: 1 }}
            />
            <Button title='تایید' onPress={() => setModalVisible(false)} />
          </Modal>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonext}>
              {selectedDate
                ? moment(selectedDate).format('jYYYY-jMM-jDD')
                : 'موعد قرارداد'}
            </Text>
          </TouchableOpacity>
          {/* <Button style={styles.test}
            title={
              selectedDate
                ? moment(selectedDate).format('jYYYY-jMM-jDD')
                : 'موعد قرارداد'
            }
            onPress={() => setModalVisible(true)}
          /> */}
          {/* {selectedDate ? (
            <Text style={{ marginTop: 10 }}>
              Selected Date: {moment(selectedDate).format('jYYYY-jMM-jDD')}
            </Text>
          ) : null} */}
        </View>

        <View style={styles.checkboxComponent}>
          <Text style={styles.paragraph}>خودتان طرف اول قرارداد باشید</Text>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#004ADB' : undefined}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateContract}>
          <Text style={styles.buttonText}>ایجاد</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default MakeContractOne;

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
    fontFamily: 'shabnam',
  },
  text2Component: {
    width: 300,
    height: 91,
    marginTop: 40,
    marginLeft: 10,
  },
  text2: {
    color: '#3C4046',
    textAlign: 'right',
    fontSize: 16,
    fontFamily: 'shabnam',
  },

  contractName: {
    width: 302,
    height: 56,
    borderWidth: 1,
    borderColor: '#878E9B',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.white,
    fontFamily: 'shabnam',
  },
  bodyProject: {
    fontSize: 15,
    width: 302,
    height: 250,
    borderWidth: 1,
    borderColor: '#878E9B',
    borderRadius: 10,
    paddingRight: 20,
    paddingTop: 20,
    marginTop: 15,
    marginLeft: 10,
    backgroundColor: colors.white,
    fontFamily: 'shabnam',
  },
  button: {
    backgroundColor: colors.primaryMain,
    width: 302,
    height: 56,
    borderRadius: 10,
    marginTop: 45,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 22,
    color: colors.white,
    paddingRight: 130,
    paddingTop: 10,
    fontFamily: 'shabnam',
  },
  checkboxComponent: {
    flexDirection: 'row',
    width: 180,
    marginLeft: 65,
    marginTop: 30,
  },
  checkbox: {
    borderRadius: 5,
    borderColor: colors.primaryMain,
  },
  paragraph: {
    fontSize: 14,
    color: colors.primaryMain,
    paddingRight: 5,
    fontFamily: 'shabnam',
  },
  errorText: {
    color: colors.systemError,
    marginRight: 40,
    marginTop: 10,
    fontFamily: 'shabnam',
  },
  test: {
    fontFamily: 'shabnam',
  },
  buttonContainer: {
    backgroundColor: colors.primaryMain,
    width: 302,
    height: 56,
    marginTop: 15,
    marginLeft: 10,
    borderColor: '#878E9B',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
  },

  buttonext: {
    fontSize: 18,
    color: '#3C4046',
    //paddingRight: 130,
    paddingTop: 10,
    fontFamily: 'shabnam',
    textAlign: 'center',
  },
});
