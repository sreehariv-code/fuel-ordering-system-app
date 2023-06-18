import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import color from '../config/color';

const OrderButton = ({ orderId, amount, date, navigation }) => {
  return (
    
      <View style={styles.button}>
        <Text style={styles.orderId}>Order ID: {orderId}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.amount}>Amount: {amount}</Text>
          <Text style={styles.date}>Date: {date}</Text>
        </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.secondary,
    padding: 4,
    borderRadius: 5,
    marginTop: 10,
    height:70
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: 'row', // Display children in a row
    backgroundColor: color.primary,
    height: 25,
    justifyContent: 'space-between', // Distribute space between children
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  amount: {
    fontSize: 16,
    color: '#fff',
  },
  date: {
    fontSize: 16,
    color: '#fff',
  },
});

export default OrderButton;