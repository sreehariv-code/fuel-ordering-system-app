import React from "react";
import Statusbar from "../components/Statusbar";
import FuelBox from "../components/FuelBox";
import { View } from "react-native";
import color from "../config/color";
import UpiPayment from "../components/UpiPayment";
const ManagePayments = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <Statusbar heading="MANAGE PAYMENTS" condition="1" navigation={navigation} />
      <View
        style={{
          margin: 15,
          padding: 8,
          flexDirection: "column",
          borderColor: color.primary,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor:color.ternary
        }}
      >
        <UpiPayment />
      </View>
    </View>
  );
};

export default ManagePayments;
