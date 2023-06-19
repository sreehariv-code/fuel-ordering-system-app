import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Statusbar from "./Statusbar";
import color from "../config/color";
import ToggleButton from "./ToggleButton";
import OrderBox from "./OrderBox";
import * as Location from "expo-location";
import MapView from "../components/MapView/MapView";

const DashboardContent = () => {

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
    <View>
      <View style={{ justifyContent: "center" }}>
        <Statusbar heading={"Dashboard"} />
        <View style={styles.toggleButtonContainer}>
          
          <ToggleButton />
          <Text style={styles.statustext}>Status</Text>
        </View>
      </View>

      <View>
        <OrderBox
          userimg={require("../assets/girl.jpg")}
          name="SERENA"
          location="10.110.21.22"
          fuel="PETROL"
          litre="2"
          distance="10"
        />
        {/* for map view */}
        <View style={styles.MapContainer}>
          <MapView location={location} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  toggleButtonContainer: {
    position: "absolute",
    alignSelf: "flex-end",
  },
  statustext: {
    color: color.secondary,
    alignSelf: "baseline",
    fontWeight: "bold",
  },
  MapContainer: {
    paddingTop: 23,
    paddingLeft: 10,
    height: 500,
  },
});
export default DashboardContent;
