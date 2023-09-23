import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground, ScrollView
} from "react-native";
import Assets from '../../assets/images';
import colors from '../../config/colors';

const CreateNewPdf = ({ navigation }) => {

    return (
        <ImageBackground
            style={styles.Parent}
            Image
            source={Assets.Images.BackgroundSecond}
        >
            <View style={styles.main}>
                <View style={styles.topIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('ContractTwo')}>
                        <Image source={Assets.Images.ArrowBack} />
                    </TouchableOpacity>
                    <Text style={styles.makeContract}> ساخت PDF </Text>
                </View>


              <View style={styles.test}></View>
            </View>
        </ImageBackground>
    );
}

export default CreateNewPdf;

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
        borderRadius: 20,
        marginTop: 20
    },
    image: {
        width: 'auto',
        height: 500,
        marginBottom: 20,
        borderRadius: 10
    },
    test:{
        width:"100%",
        height:500,
        backgroundColor:"white",
        marginTop:50
    }
});
