import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import Dashboard from "../screens/Dashboard";
import DstrProfile from "../screens/DstrProfile";
import ManageDrivers from "../screens/ManageDrivers";
import ManageFuel from "../screens/ManageFuel";
import ManagePayments from "../screens/ManagePayments";
import PassBookScreen from "../screens/PassBookScreen";
import Orders from "../screens/OrdersScreen"; 
import LoginScreen from "../screens/login";
import SignUpScreen from "../screens/signup";
import { DistributorContext } from "../distributorContext/Context";
import OrderDetailsScreen from "../screens/FullOrderDetail";

const Routes = () => {
  const { token } = useContext(DistributorContext);
  console.log(token)
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {!token ? (
            <>
              <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        /> 
            </>
          ) : (
            <>
              <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Fuel"
            component={ManageFuel}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Drivers"
            component={ManageDrivers}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Wallet"
            component={PassBookScreen}
            options={{ headerShown: false }}
            
          />
          <Stack.Screen
            name="Payments"
            component={ManagePayments}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FullOrderDetail"
            component={OrderDetailsScreen}
            options={{ headerShown: false }}
          />          
          <Stack.Screen
            name="Profile"
            component={DstrProfile}
            options={{ headerShown: false }}
          />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
