import { StatusBar } from "react-native";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import Dashboard from "./screens/Dashboard";
import MenuBar from "./components/Menubar";
import ManageFuel from "./screens/ManageFuel";
import Orders from "./screens/OrdersScreen";
import PopupDriverList from "./components/PopUpDriverLIst";
import OrderButton from "./components/orderButtonPassbook";
import PassbookScreen from "./screens/PassBookScreen.js";
import FullOrderDetail from "./screens/FullOrderDetail";
import LoginScreen from "./screens/login";
import SignUpScreen from "./screens/signup";
import DstrProfile from "./screens/DstrProfile";
import DriversUserProfile from "./screens/DriversUserProfile";
import ManagePayments from "./screens/ManagePayments";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MyCarousel from "./components/MyCarousel";
import ManageDrivers from "./screens/ManageDrivers";
import DistributorContextProvider from "./distributorContext/Context";
import Routes from "./routes/routes";
import { useContext } from "react";
// import Statusbar from './components/Statusbar';
// import Carousel from 'react-native-snap-carousel';

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DistributorContextProvider>
      
        {/* <SignUpScreen /> */}
        {/* <Dashboard />

        <ManageFuel /> */}
      <Routes />
      </DistributorContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS==="android"? StatusBar.currentHeight:0,
  },
});
