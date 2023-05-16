import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

import Home from "./Home/Home";
import FuelOrderScreen from "./Home/FuelOrderScreen";

const Main = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerTitle: "", headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FuelOrder" component={FuelOrderScreen} />
    </Stack.Navigator>
  );
};

export default Main;
