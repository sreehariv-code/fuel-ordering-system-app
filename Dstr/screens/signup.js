import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import color from '../config/color';
import LoginScreen from './login';
import Statusbar from '../components/Statusbar';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [license, setLicense] = useState('');

  const handleRegister = () => {
    // Handle registration logic here
    navigation.navigate('Login'); // Navigate to login page after successful registration
  };

  return (


    <View style={styles.container}>
       <View >
        <Statusbar heading="SIGNUP" condition="0"/>
    </View>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="License"
          value={license}
          onChangeText={setLicense}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity >
            <Text style={styles.footerLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    paddingBottom: 40,
  },
  formContainer: { 
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    
  
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    opacity: 0.5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 8,
    width: '100%',
    fontSize: 18,
    color: '#333333',
  },
  button: {
    backgroundColor: color.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    marginTop: 18,
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

export default SignUpScreen;
