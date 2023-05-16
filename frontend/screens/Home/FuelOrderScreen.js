import React from "react";
import { Button, Text } from "react-native";
import { View } from "react-native";

const FuelOrderScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go Back to Home"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text>Nearby Fuel Stations</Text>
    </View>
  );
};

export default FuelOrderScreen;
