import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import color from "../config/color";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardContent from "../components/DashboardContent";
import { NavigationContainer } from "@react-navigation/native";
import DriverProfile from "./DriverProfile";
import PassBookScreen from "./PassBookScreen";
import Statusbar from "../components/Statusbar";
import {View} from 'react-native'
const Tab = createBottomTabNavigator();

const Dashboard = (navigation) => {
  return (
    <View style={{flex:1}}>
      <Tab.Navigator
      initialRouteName="Dashboard"
        screenOptions={{
          tabBarActiveBackgroundColor: "#54504c",
          tabBarActiveTintColor: "#ffffff",
        }}
      >
        <Tab.Screen
          name="Profile"
          component={DriverProfile}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person"
                color={color}
                size={29}
                style={{ marginTop: 1 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardContent}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="server"
                color={color}
                size={29}
                style={{ marginTop: 1 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={PassBookScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="reorder-three"
                color={color}
                size={29}
                style={{ marginTop: 1 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    
    </View>
  );
};

export default Dashboard;
