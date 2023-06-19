import React, { useContext,useEffect } from "react";
import Statusbar from "../components/Statusbar";
import { ScrollView, StyleSheet, View } from "react-native";
import OrderBox from "../components/OrderBox";
import { DistributorContext } from "../distributorContext/Context";

const Orders =({navigation}) => {
  const {getOrders,orderList}=useContext(DistributorContext);
  useEffect(() => {
    (async () => {
      await getOrders();
    })();
  }, []);


  
    return(
        <View>
             <View><Statusbar heading="ORDERS" condition="1" navigation={navigation}/></View>
             <ScrollView contentContainerStyle={styles.container}>
  
             {orderList.map((order, index) => (
              order.status !== "Rejected" ? (
                <OrderBox
                  navigation={navigation}
                  userimg={require('../assets/girl.jpg')}
                  key={index}
                  name={order.userInfo.name}
                  fuel={order.fuelType}
                  litre={order.fuelAmount}
                  orderId={order._id}
                  orderStatus={order.status}
                />
              ) : null
            ))}
                
             </ScrollView>            
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      padding:15,
      alignItems:"center"
    },
  });
  



export default Orders;