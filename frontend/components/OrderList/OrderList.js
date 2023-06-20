import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function OrderList({
  fuelType,
  status,
  fuelPrice,
  distributorID,
  navigation,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Summary", {
          fuelType,
          status,
          fuelPrice,
          distributorID,
        });
      }}
      style={styles.container}
    >
      <Text style={styles.text}>Fuel Type: {fuelType}</Text>
      <Text style={styles.text}>Status: {status}</Text>
      <Text style={styles.text}>Paid Amount: {fuelPrice}</Text>
      <Text style={styles.text}>Distributor ID: {distributorID}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    marginBottom: 10,
    paddingVertical: 20,
    paddingLeft: 15,
    borderRadius: 7,
  },
  text: {
    color: "#eee",
  },
});
