import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import color from '../config/color';
import Statusbar from '../components/Statusbar';

const OrderDetailsScreen = ({ orderId, fuelType, litre, customerMail, driverMail, price, paymentMode,navigation }) => {
  return (
    <View style={styles.container}>
      <Statusbar heading="ORDER DETAILS" condition="1" navigation={navigation}/>

      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.label}>Order ID:</Text>
          <Text style={styles.value}>{orderId}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Fuel Type:</Text>
          <Text style={styles.value}>{fuelType}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Litre:</Text>
          <Text style={styles.value}>{litre}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Customer Mail:</Text>
          <Text style={styles.value}>{customerMail}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Driver Mail:</Text>
          <Text style={styles.value}>{driverMail}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{price}</Text>
        </View>
        <View style={styles.separator} />

        <View style={styles.row}>
          <Text style={styles.label}>Payment Mode:</Text>
          <Text style={styles.value}>{paymentMode}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  box: {
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.primary,
  },
  value: {
    fontSize: 18,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: color.primary,
    marginVertical: 5,
  },
});

export default OrderDetailsScreen;
