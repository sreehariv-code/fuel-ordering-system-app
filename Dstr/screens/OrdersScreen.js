import React from "react";
import Statusbar from "../components/Statusbar";
import { ScrollView, StyleSheet, View } from "react-native";
import OrderBox from "../components/OrderBox";


const Orders =({navigation}) => {
        
    return(
        <View>
             <View><Statusbar heading="ORDERS" condition="1" navigation={navigation}/></View>
             <ScrollView style={styles.container}>
                <OrderBox navigation={navigation} userimg={require('../assets/girl.jpg') } name="SERENA" location="10.110.21.22" fuel="PETROL" litre="2" distance="10" />
                <OrderBox navigation={navigation} userimg={require('../assets/girl.jpg') } name="SERENA" location="10.110.21.22" fuel="PETROL" litre="2" distance="10" />
                <OrderBox navigation={navigation} userimg={require('../assets/girl.jpg') } name="SERENA" location="10.110.21.22" fuel="PETROL" litre="2" distance="10" />
                <OrderBox navigation={navigation} userimg={require('../assets/girl.jpg') } name="SERENA" location="10.110.21.22" fuel="PETROL" litre="2" distance="10" />
             </ScrollView>
            
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      padding:15
    },
  });
  



export default Orders;