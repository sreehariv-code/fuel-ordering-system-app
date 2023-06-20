import React, { useContext, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native"; // Import FlatList
import { useFocusEffect } from "@react-navigation/native";
import OrderList from "../../components/OrderList/OrderList";
import { UserContext } from "../../context/userContext/context";

const OrderPage = ({ navigation }) => {
  const { getListOfOrders, orderList } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      getListOfOrders();
    }, [])
  );

  const renderItem = ({ item }) => (
    <OrderList
      key={item._id}
      fuelType={item.fuelType}
      status={item.status}
      fuelPrice={item.paidAmount}
      distributorID={item.distributor}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      <FlatList
        style={{ flex: 1 }}
        data={orderList.reverse()}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default OrderPage;
