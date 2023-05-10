import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import Profile from "./Profile";
import Profilebtn from "../../components/Profilebtn";
import OrderPage from "./OrderPage";

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrderPage}
          options={{
            headerShadowVisible: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#eee", height: 90 },
          }}
        />
      </Tab.Navigator>
      <StatusBar />
    </SafeAreaView>
  );
};

export default HomeScreen;
