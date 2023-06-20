import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../../context/userContext/context";

export default function OrderSummary({ navigation, route }) {
  const { getDistributorById } = useContext(UserContext);
  const distributorID = route.params.distributorID;
  const distributorDetails = getDistributorById(distributorID);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
      }}
    >
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Order Summary</Text>
      <Text style={styles.subText}>Fuel Type: {route.params.fuelType}</Text>
      <Text style={styles.subText}>Fuel Price: {route.params.fuelPrice}</Text>
      <Text style={styles.subText}>Order Status: {route.params.status}</Text>
      <View>
        <Text style={styles.header}>Distributor Details</Text>
        <Text style={styles.subText}>Name: {distributorDetails.name}</Text>
        <Text style={styles.subText}>Email: {distributorDetails.email}</Text>
        <Text style={styles.subText}>
          Phone Number: {distributorDetails.phoneNumber}
        </Text>
      </View>
      <View>
        <Text style={styles.header}>Station Details</Text>
        <Text style={styles.subText}>
          Station Name: {distributorDetails.stationDetails.stationName}
        </Text>
        <Text style={styles.subText}>
          Licence Number: {distributorDetails.stationDetails.licenceNumber}
        </Text>
        <Text style={styles.subText}>
          Address: {distributorDetails.stationDetails.address}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subText: {
    marginBottom: 10,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    marginTop: 30,
  },
});
