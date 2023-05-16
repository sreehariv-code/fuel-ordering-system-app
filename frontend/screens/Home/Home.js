import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Welcome from "../../components/Welcome/Welcome";

import MapView from "../../components/MapView/MapView";
import { UserContext } from "../../context/userContext/context";
import Button from "../../components/Button";

const fuelType = ["Petrol", "Diesel", "CNG"];

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        console.log("Permission Granted");
      } else {
        console.log("Permission denied");
      }

      let location = await Location.getCurrentPositionAsync();
      const latitude = location.coords.latitude;
      const longtitude = location.coords.longitude;
      setLocation([latitude, longtitude]);
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 10 }}>
      <View>
        <Welcome navigation={navigation} />
        <View style={styles.MapContainer}>
          <MapView location={location} />
        </View>
        <View style={styles.orderBtn}>
          <Button
            text="Order Fuel"
            onPress={() => {
              navigation.navigate("FuelOrder");
            }}
          />
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
  orderBtn: { paddingTop: 30, alignItems: "center" },
});

export default Home;
