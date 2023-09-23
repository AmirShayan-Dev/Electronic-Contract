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

function MakeContractTwo({ navigation }) {
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

        <TouchableOpacity onPress={() => navigation.navigate('ContractFour')}>
          <ImageBackground
            style={styles.MakePdf}
            Image
            source={Assets.Images.MakePdfIcon}
          >
            <Text style={styles.makePDFText}>ساخت PDF توسط خودتان</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ContractThree')}>
          <ImageBackground
            style={styles.SelectPDF}
            Image
            source={Assets.Images.SelectPDF}
          >
            <Text style={styles.SelectPDFText}> قالب های آماده </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default MakeContractTwo;

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
  MakePdf: {
    width: 260,
    height: 250,
    borderRadius: 10,
    marginLeft: 31,
    marginTop: 80,
  },
  makePDFText: {
    color: colors.white,
    fontSize: 16,
    paddingTop: 195,
    paddingRight: 53,
    fontFamily: "shabnam",
  },
  SelectPDF: {
    width: 260,
    height: 250,
    borderRadius: 10,
    marginLeft: 31,
    marginTop: 53,
  },
  SelectPDFText: {
    color: colors.white,
    fontSize: 16,
    paddingTop: 195,
    paddingRight: 82,
    fontFamily: "shabnam",
  },
});
