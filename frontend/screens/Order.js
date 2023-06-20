import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderPage from "./Home/OrderPage";
import OrderSummary from "./Orders/OrderSummary";

export default function Order() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Order"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Order" component={OrderPage} />
      <Stack.Screen name="Summary" component={OrderSummary} />
    </Stack.Navigator>
  );
}
