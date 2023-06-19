import React, { useContext, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import OrderList from "../../components/OrderList/OrderList";
import { UserContext } from "../../context/userContext/context";

const OrderPage = () => {
  const { getListOfOrders, orderList } = useContext(UserContext);
  useEffect(() => {
    getListOfOrders();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
      <ScrollView style={{ flex: 1 }}>
        {orderList.reverse().map((orders) => (
          <OrderList
            key={orders._id}
            fuelType={orders.fuelType}
            status={orders.status}
            fuelPrice={orders.paidAmount}
            distributorID={orders.distributor}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderPage;
