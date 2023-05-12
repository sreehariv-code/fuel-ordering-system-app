import React, { useEffect, useState } from "react";
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
  Platform,
} from "react-native";

import Welcome from "../../components/Welcome/Welcome";

import FuelCards from "../../components/FuelCards";

import MapView from "../../components/MapView/MapView";
import MapViewTemp from "../../components/MapView/MapViewTemp";

import * as Location from "expo-location";

const fuelType = ["Petrol", "Diesel", "CNG"];

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [text]);

  let text = "Waiting.";

  if (error) {
    text = error;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
      <View>
        <Welcome navigation={navigation} />

        <View style={styles.fuelSelectContainer}>
          <MapView />
          <Text>{text}</Text>
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
