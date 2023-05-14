import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Welcome from "../../components/Welcome/Welcome";

import MapView from "../../components/MapView/MapView";

const fuelType = ["Petrol", "Diesel", "CNG"];

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      isFinite(status);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
      <View>
        <Welcome navigation={navigation} />

        <View style={styles.MapContainer}>
          <MapView />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MapContainer: {
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
