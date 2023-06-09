import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const FilterTabs = ({ text, data, selectedData, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.fuelCard(data, selectedData)}
      onPress={onPress}
    >
      <Text style={styles.fuelText(data, selectedData)}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fuelCard: (data, selectedData) => ({
    width: 120,
    aspectRatio: 2 / 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: data === selectedData ? "#333" : "#fff",
  }),
  fuelText: (data, selectedData) => ({
    color: data === selectedData ? "#fff" : "#333",
    textAlign: "center",
  }),
});

export default FilterTabs;
