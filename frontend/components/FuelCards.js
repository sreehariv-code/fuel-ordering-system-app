import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FuelCards = ({ fuelName, onPress, fuelId, selectedFuelId }) => {
  return (
    <TouchableOpacity
      style={styles.fuelCard(fuelId, selectedFuelId)}
      onPress={onPress}
    >
      <Text style={styles.fuelText(fuelId, selectedFuelId)}>{fuelName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fuelCard: (fuelId, selectedFuelId) => ({
    width: 120,
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: fuelId === selectedFuelId ? "#333" : "#fff",
  }),
  fuelText: (fuelId, selectedFuelId) => ({
    color: fuelId === selectedFuelId ? "#fff" : "#333",
    textAlign: "center",
  }),
});

export default FuelCards;
