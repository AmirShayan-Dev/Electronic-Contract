import React from 'react';
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

function MakeContractFour({ navigation }) {
  return (
    <ImageBackground
      style={styles.parent}
      Image
      source={Assets.Images.BackgroundSecond}
    >
      <View style={styles.main}>
        <View style={styles.topIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ContractThree')}
          >
            <Image source={Assets.Images.ArrowBack} />
          </TouchableOpacity>
          <Text style={styles.makeContract}> ایجاد PDF</Text>
        </View>
        <View style={styles.text2Component}>
          <Text style={styles.text3}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است
          </Text>
        </View>

        {/* use for other pages */}
        {/* <View style={styles.choosePDFComponent}>
          <Text style={styles.text1}>فایل خود را باگذاری کنید</Text>
          <Text style={styles.text2}>PDF</Text>
          <TouchableOpacity style={styles.choosePDFFile}>
            <Text style={styles.text4}>انتخاب فایل</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chooseImageComponent}>
          <Text style={styles.text5}> عکس خود را باگذاری کنید </Text>
          <Text style={styles.text6}>JPG</Text>
          <TouchableOpacity style={styles.chooseImageFile}>
            <Text style={styles.text7}>انتخاب عکس </Text>
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity onPress={() => navigation.navigate('CreateNewPdf')}>
        <ImageBackground
          style={styles.whitePageComp}
          Image
          source={Assets.Images.MakeWhitePage}
        >
          <Text style={styles.WhitePageText}>ایجاد صفحه سفید</Text>
        </ImageBackground>

        </TouchableOpacity>

        <View style={styles.uploadFileWhole}>
          <ImageBackground
            style={styles.UploadFile}
            Image
            source={Assets.Images.UploadFile2}
          >
            <Text style={styles.WhitePageText}>بارگذاری فایل </Text>
          </ImageBackground>
        </View>

        <View style={styles.uploadImageWhole}>
          <ImageBackground
            style={styles.UploadImage}
            Image
            source={Assets.Images.UploadPhoto}
          >
            <Text style={styles.WhitePageText}>بارگذاری عکس </Text>
          </ImageBackground>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>تایید</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default MakeContractFour;

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
  text2Component: {
    width: 300,
    height: 91,
    marginTop: 53,
    marginLeft: 10,
  },
  text3: {
    color: '#3C4046',
    textAlign: 'right',
    fontSize: 16,
    fontFamily: "shabnam",
  },
  whitePageComp: {
    width: 292,
    height: 66,
    marginLeft: 14,
    marginTop: 92,
  },
  WhitePageText: {
    color: colors.white,
    fontSize: 16,
    paddingRight: 125,
    paddingTop: 20,
    fontFamily: "shabnam",
  },
  uploadFileWhole: {
    width: 292,
    height: 63,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 14,
    marginTop: 25,
  },
  UploadFile: {
    width: 292,
    height: 66,
  },
  uploadImageWhole: {
    width: 292,
    height: 63,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 14,
    marginTop: 30,
  },
  UploadImage: {
    width: 292,
    height: 66,
  },
  // choosePDFComponent: {
  //   width: 316,
  //   height: 181,
  //   borderWidth: 2,
  //   borderColor: '#004ADB',
  //   borderStyle: 'dashed',
  //   marginTop: 30,
  // },
  // text1: {
  //   color: '#676C77',
  //   fontSize: 16,
  //   paddingRight: 80,
  //   paddingTop: 30,
  // },
  // text2: {
  //   color: '#676C77',
  //   fontSize: 16,
  //   paddingTop: 10,
  //   paddingLeft: 145,
  // },
  // choosePDFFile: {
  //   width: 181,
  //   height: 39,
  //   backgroundColor: '#004ADB',
  //   borderRadius: 10,
  //   marginLeft: 64,
  //   marginTop: 30,
  // },
  // text4: {
  //   color: colors.white,
  //   paddingRight: 55,
  //   paddingTop: 10,
  // },
  // chooseImageComponent: {
  //   width: 316,
  //   height: 181,
  //   borderWidth: 2,
  //   borderColor: '#004ADB',
  //   borderStyle: 'dashed',
  //   marginTop: 35,
  // },
  // text5: {
  //   color: '#676C77',
  //   fontSize: 16,
  //   paddingRight: 80,
  //   paddingTop: 30,
  // },
  // text6: {
  //   color: '#676C77',
  //   fontSize: 16,
  //   paddingTop: 10,
  //   paddingLeft: 145,
  // },
  // chooseImageFile: {
  //   width: 181,
  //   height: 39,
  //   backgroundColor: '#004ADB',
  //   borderRadius: 10,
  //   marginLeft: 64,
  //   marginTop: 30,
  // },
  // text7: {
  //   color: colors.white,
  //   paddingRight: 55,
  //   paddingTop: 10,
  // },
  button: {
    backgroundColor: colors.primaryMain,
    width: 302,
    height: 56,
    borderRadius: 10,
    marginTop: 130,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 22,
    color: colors.white,
    paddingRight: 130,
    paddingTop: 10,
    fontFamily: "shabnam",
  },
});
