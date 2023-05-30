import React from "react";
import { StatusBar,View } from "react-native";
import Statusbar from "../components/Statusbar";
import MenuBar from "../components/Menubar";
import color from "../config/color";
import MyCarousel from "../components/MyCarousel";


const Dashboard= ({navigation}) =>{
  return(
    <View style={{flex:1}} >
        <Statusbar heading="DASHBOARD" condition="0" navigation={navigation}/>
        <MyCarousel/>
        <View style={{margin:15,padding :8,flexDirection:"column",borderColor:color.primary,borderWidth:1,borderRadius:5}}>
          <MenuBar condition={0} navigation={navigation} iconname1={"newspaper"} iconname2={"flame"} iconname3={"people-circle"} n1={"ORDERS"} n2={"FUEL"} n3={"DRIVERS"}/>
          <MenuBar condition={1} navigation={navigation} iconname1={"wallet"} iconname2={"card-sharp"} iconname3={"person-circle"} n1={"WALLET"} n2={"PAYMENTS"} n3={"PROFILE"}/>
        </View>
    </View>

    
  );
};

export default Dashboard;