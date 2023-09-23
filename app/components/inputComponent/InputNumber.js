import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputNumber = () => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');

  return (
    <View style={styles.input}>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#484C53',
          width: 50,
        }}
        keyboardType='numeric'
        value={first}
        maxLength={1}
        onChangeText={(text) => setFirst(text)}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#484C53',
          width: 50,
        }}
        keyboardType='numeric'
        value={second}
        maxLength={1}
        onChangeText={(text) => setSecond(text)}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#484C53',
          width: 50,
        }}
        keyboardType='numeric'
        value={third}
        maxLength={1}
        onChangeText={(text) => setThird(text)}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#484C53',
          width: 50,
        }}
        keyboardType='numeric'
        value={fourth}
        maxLength={1}
        onChangeText={(text) => setFourth(text)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default InputNumber;
