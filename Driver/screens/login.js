import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import color from '../config/color';
import Statusbar from '../components/Statusbar';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(''); // used to define variables
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Dashboard')
  };

  return (
    <View style={styles.container}>
      <View >
        <Statusbar heading="LOGIN" condition="0"/>
    </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 40,
  },
  
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    opacity:0.5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    fontSize: 18,
    color: '#333333',
  },
  button: {
    backgroundColor: color.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#333333',
    marginRight: 5,
    fontFamily: 'Arial',
  },
  footerLink: {
    fontSize: 16,
    color: color.primary,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});

export default LoginScreen;
