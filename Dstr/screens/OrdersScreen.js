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
             {console.log(orderList)}
             {orderList.map((order,index)=> (
               
                <OrderBox navigation={navigation} userimg={require('../assets/girl.jpg') } key={index} name={order.name}  fuel={order.fuelType} litre={order.fuelAmount}  />
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