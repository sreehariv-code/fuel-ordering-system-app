import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Welcome from "../../components/Welcome/Welcome";

import MapView from "../../components/MapView/MapView";
import { UserContext } from "../../context/userContext/context";
import Button from "../../components/Button";

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const { token, getUserProfile, userState, updateUserLocation } =
    useContext(UserContext);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      try {
        let location = await Location.getLastKnownPositionAsync({});
        if (location) {
          console.log("Got location");
          const { latitude, longitude } = location.coords;
          updateUserLocation(longitude, latitude);
          setLocation([latitude, longitude]);
        } else {
          console.log("Didn't get location");
          const defaultLatitude = 9.2656466;
          const defaultLongitude = 76.8089454;
          updateUserLocation(defaultLongitude, defaultLatitude);
          setLocation([defaultLatitude, defaultLongitude]);
        }
      } catch (error) {
        console.error("Error getting location:", error);
        const defaultLatitude = 9.2656466;
        const defaultLongitude = 76.8089454;
        updateUserLocation(defaultLongitude, defaultLatitude);
        setLocation([defaultLatitude, defaultLongitude]);
      }
    };

    getLocation();
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
  orderBtn: {
    alignItems: "center",
    minHeight: 180,
    justifyContent: "center",
  },
});

export default Home;
