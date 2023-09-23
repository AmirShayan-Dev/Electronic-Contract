import React, { useState, useEffect } from 'react';
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
import colors from '../../config/colors';
import Assets from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useSelector } from 'react-redux';

function Status({ navigation }) {

  const [data, set_data] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const displayData = async () => {
    const my_token = 'Bearer ' + token;
    await axios.get("https://econtract.irsign.com/contract/list/", {
      headers: {
        Authorization: my_token,
      },
    }).then((res) => {
      console.log(res.data["results"]["data"]);
      set_data(res.data["results"]["data"]);
    })
  }

  useEffect(() => {
    displayData();
  }, []);
  return (
    <ImageBackground
      style={styles.parent}
      Image
      source={Assets.Images.BackgroundSecond}
    >
      <View style={styles.main}>
        <View style={styles.sidebar}>
          <TouchableOpacity>
            <Image source={Assets.Images.SideBarIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.prof}>
          <ImageBackground
            style={styles.profile}
            Image
            source={Assets.Images.BackgroundProfile}
          >
            <TouchableOpacity style={styles.touch}>
              <ImageBackground
                style={styles.premiumComp}
                Image
                source={Assets.Images.BuyPremium}
              ></ImageBackground>
            </TouchableOpacity>
            <View style={styles.dataOfMember}>
              <Text style={styles.text1}>محمد قربانی</Text>
              <Text style={styles.text2}>کدملی: ۲۳۴۵۸۹۰۲۳۴ </Text>
              <Text style={styles.text3}> وضعیت: غیرفعال</Text>
            </View>
          </ImageBackground>
        </View>

        <TouchableOpacity
          style={styles.MakeContractButton}
          onPress={() => navigation.navigate('ContractOne')}
        >
          <Text style={styles.MakeContractTextButton}> ایجاد قرارداد جدید</Text>
        </TouchableOpacity>
        {/* <View style={styles.DateButton}>
          <View style={styles.buttonSelected}></View>
          <Text style={styles.datePast}>گذشته</Text>
          <Text style={styles.datePresent}>امروز</Text>
        </View> */}

        <View style={styles.contractsList}>
          {/* yellow component */}


          {data.map((d,index) => (
            <ImageBackground
              style={styles.yellowComponent}
              Image
              source={Assets.Images.YellowStatus}
              key={index}
            >
              <View>
                <View style={styles.RowText1}>
                  <Text style={styles.ContractDate}>{d.create_date}</Text>
                  <Text style={styles.ContractName}>{d.title}</Text>
                </View>
                <View style={styles.RowText2}>
                  <Text style={styles.YellowContractStat}>
                    وضعیت گیرندگان: درخواست ویرایش
                  </Text>
                  <Text style={styles.YellowContractLevel}>{d.contract_state}</Text>
                </View>
              </View>
            </ImageBackground>
          ))}


          {/* Red component */}
          {/* <ImageBackground
            style={styles.yellowComponent}
            Image
            source={Assets.Images.RedStatus}
          >
            <View>
              <View style={styles.RowText1}>
                <Text style={styles.ContractDate}>۱۴۰۲/۶/۱۲</Text>
                <Text style={styles.ContractName}>قرارداد فروش ماشین </Text>
              </View>
              <View style={styles.RowText2}>
                <Text style={styles.RedContractStat}>وضعیت گیرندگان: رد</Text>
                <Text style={styles.RedContractLevel}>کنسل شده </Text>
              </View>
            </View>
          </ImageBackground> */}

          {/* Green component */}
          {/* <ImageBackground
            style={styles.yellowComponent}
            Image
            source={Assets.Images.GreenStatus}
          >
            <View>
              <View style={styles.RowText1}>
                <Text style={styles.ContractDate}>۱۴۰۲/۶/۱۲</Text>
                <Text style={styles.ContractName}> قرارداد مشارکت </Text>
              </View>
              <View style={styles.RowText2}>
                <Text style={styles.GreenContractStat}>
                  وضعیت گیرندگان: امضا شده
                </Text>
                <Text style={styles.GreenContractLevel}>تکمیل </Text>
              </View>
            </View>
          </ImageBackground> */}
        </View>
      </View>
    </ImageBackground>
  );
}

export default Status;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: 360,
    height: 800,
  },
  sidebar: {
    width: 25,
    height: 22,
    marginLeft: 7,
    marginTop: 20,
  },
  touch: {
    width: 360,
    height: 140,
    // backgroundColor: 'red',
  },
  prof: {
    width: 360,
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',

    marginTop: 25,
    marginBottom: 20,
  },
  profile: {
    width: 360,
    height: 140,
    flex: 1,
    resizeMode: 'cover',

    flexDirection: 'row',
  },
  premiumComp: {
    width: 55,
    height: 55,
    marginLeft: 45,
    marginTop: 43,
  },
  dataOfMember: {
    width: 120,
    height: 120,
    marginLeft: -140,
  },
  text1: {
    fontSize: 14,
    color: colors.black,
    paddingTop: 30,
    paddingBottom: 20,
    fontFamily: "shabnam",
  },
  text2: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "shabnam",
    paddingBottom: 7,
  },
  text3: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "shabnam",
  },
  MakeContractButton: {
    backgroundColor: colors.primaryMain,
    width: 200,
    height: 40,
    borderRadius: 10,
    marginLeft: 80,
  },
  MakeContractTextButton: {
    color: colors.white,
    fontSize: 17,
    paddingRight: 36,
    paddingTop: 7,
    fontFamily: "shabnam",
  },
  // DateButton: {
  //   width: 240,
  //   height: 26,
  //   marginLeft: 60,
  //   marginBottom: -5,
  //   borderRadius: 10,
  //   backgroundColor: '#DEE7F8',
  //   flexDirection: 'row',
  // },
  // datePast: {
  //   textAlign: 'center',
  //   paddingTop: 2,
  //   fontSize: 11,
  //   color: colors.black,
  //   marginLeft: 30,
  //   width: 77,
  //   height: 18,
  //   marginTop: 4,
  //   borderRadius: 10,
  // },
  // datePresent: {
  //   textAlign: 'center',
  //   paddingTop: 2,
  //   fontSize: 11,
  //   color: colors.black,
  //   marginLeft: 30,
  //   marginRight: 50,
  //   width: 77,
  //   height: 18,
  //   marginTop: 4,
  //   borderRadius: 10,
  //   //selected style
  //   backgroundColor: colors.white,
  // },
  contractsList: {
    width: 360,
    height: 480,
    marginTop: 25,
    // backgroundColor: 'red',
    marginBottom: 38,
  },
  yellowComponent: {
    width: 380,
    height: 78,
    marginLeft: -10,
    marginBottom: 20,
  },
  RowText1: {
    flexDirection: 'row',
  },
  ContractName: {
    width: 130,
    height: 20,
    fontSize: 13,
    marginLeft: 87,
    marginTop: 12,
    fontFamily: "shabnam",
  },
  ContractDate: {
    width: 55,
    height: 20,
    color: '#878E9B',
    marginLeft: 75,
    marginTop: 12,
    fontFamily: "shabnam",
  },
  RowText2: {
    flexDirection: 'row',
  },
  YellowContractStat: {
    width: 162,
    height: 20,
    fontFamily: "shabnam",

    fontSize: 12,
    color: '#878E9B',
    marginLeft: 74,
    marginTop: 15,
  },
  RedContractStat: {
    width: 90,
    height: 20,
    fontSize: 12,
    color: '#878E9B',
    marginLeft: 74,
    marginTop: 15,
  },
  GreenContractStat: {
    width: 125,
    height: 20,
    fontSize: 12,
    color: '#878E9B',
    marginLeft: 74,
    marginTop: 15,
  },
  ContractStat: {
    width: 100,
    height: 20,
    fontSize: 12,
    color: '#878E9B',
    marginLeft: 74,
    marginTop: 15,
  },
  YellowContractLevel: {
    width: 60,
    height: 20,
    color: '#878E9B',
    fontSize: 12,
    marginLeft: 50,
    marginTop: 15,
    fontFamily: "shabnam",
  },
  RedContractLevel: {
    width: 50,
    height: 20,
    color: '#878E9B',
    fontSize: 12,
    marginLeft: 130,
    marginTop: 15,
  },
  GreenContractLevel: {
    width: 30,
    height: 20,
    color: '#878E9B',
    fontSize: 12,
    marginLeft: 110,
    marginTop: 15,
  },
});
