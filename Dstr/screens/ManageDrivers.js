import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Statusbar from "../components/Statusbar";
import DriverBox from "../components/DriverBox";
import color from "../config/color";

const ManageDrivers = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Statusbar heading={"Manage Drivers"} condition={1} navigation={navigation}/>
      <ScrollView style={styles.secondcontainer}>
        <DriverBox />
        <DriverBox />
        <DriverBox />
        <DriverBox />
        <DriverBox />
        <DriverBox />
      </ScrollView>
    </View>
  );
};

export default ManageDrivers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondcontainer: {
    flex: 1,
    padding: 15,
    borderWidth:0.5,
    borderColor:color.primary,
    margin:25,
    borderRadius:10
  },
});
