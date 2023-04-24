import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  StyleSheet,
  Button,
} from "react-native";

import Welcome from "../../components/Welcome/Welcome";

import FuelCards from "../../components/FuelCards";
import { useState } from "react";
import MapView from "../../components/MapView/MapView";

const fuelType = ["Petrol", "Diesel", "CNG"];

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
      <View>
        <Welcome navigation={navigation} />
        <View style={styles.fuelSelectContainer}>
          <MapView />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fuelSelectContainer: {
    paddingTop: 23,
    paddingLeft: 10,
    height: 500,
  },
  fuelSelectHead: {
    fontFamily: "IBMPlexSans-Regular",
    fontWeight: "690",
    fontSize: 20,
  },
});

export default Home;
