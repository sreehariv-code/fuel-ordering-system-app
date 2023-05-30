import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Statusbar from "./Statusbar";
import color from "../config/color";
import ToggleButton from "./ToggleButton";
import OrderBox from "./OrderBox";

const DashboardContent = () => {
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
        <View style={{ backgroundColor: "red", height: "50%", margin: "5%" }} />
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
});
export default DashboardContent;
