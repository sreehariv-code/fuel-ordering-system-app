import React from "react";
import { Text, View } from "react-native";

const FuelCards = ({ fuelName }) => {
  return (
    <View>
      <Text>{fuelName}</Text>
    </View>
  );
};

export default FuelCards;
