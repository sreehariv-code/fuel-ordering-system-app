import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Statusbar from '../components/Statusbar';

const DriversUserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={{width:"100%",paddingBottom:10}}><Statusbar condition="1" heading="CUSTOMER" /></View>
      
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}}
        />
       
      </View>
      <View style={[styles.profileContainer,{marginTop:10}]}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.contact}>123-456-7890</Text>
        <Text style={[styles.contact,{ marginBottom: 8 }]}>johndoe@gmail.com</Text>
        <View style={styles.row}>
          <View style={[styles.borderBox, styles.boxGap]}>
            <Text style={styles.boldText}>Petrol</Text>
          </View>
          <View style={styles.borderBox}>
            <Text style={styles.boldText}>2 Litre</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#000' }]}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16 }]}>Location</Text>
          </TouchableOpacity>
        </View >
        <Text style={styles.payment}>Payable Amount: $200</Text>
        <Text style={styles.payment}>Payment Status: Cash on Delivery</Text>
        <Image
            style={styles.image}
            source={{uri:'https://img.freepik.com/premium-vector/qr-code-sample-smartphone-scanning-qr-code-icon-flat-design-stock-vector-illustration_550395-108.jpg?w=826'}}
          />
        
        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity style={[styles.paymentOption, { backgroundColor: '#fff' }]}>
            <Text style={[styles.paymentOptionText, { color: '#000' }]}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paymentOption, { backgroundColor: '#fff' }]}>
            <Text style={[styles.paymentOptionText, { color: '#000' }]}>Debit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paymentOption, { backgroundColor: '#fff' }]}>
            <Text style={[styles.paymentOptionText, { color: '#000' }]}>Net Banking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paymentOption, { backgroundColor: '#fff' }]}>
            <Text style={[styles.paymentOptionText, { color: '#000' }]}>UPI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    
    
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 75,
    overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 150,
    paddingBottom:100,
  },
  paymentOptionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  profileContainer: {
    alignItems: 'center',
    
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contact: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  borderBox: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    width: 80,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000'
  },
  boxGap: {
    marginRight: 10,
  },
  payment: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  paymentOption:{
    borderWidth: 1,
    borderColor: '#666',
    padding: 10,
  },
  paymentOptionText:
  {
     fontFamily :'Roboto'
  }
});
 export default DriversUserProfile;