import React from "react";
import Statusbar from "../components/Statusbar";
import FuelBox from "../components/FuelBox";
import { View } from "react-native";
import color from "../config/color";
import ToggleButton from "../components/ToggleButton";


const ManageFuel =({navigation}) => {
    return(

        <View style={{flex:1}}>
            
            <Statusbar heading="MANAGE FUEL" condition="1" navigation={navigation}/>
            <View style={{margin:15,padding :8,flexDirection:"column",borderColor:color.primary,borderWidth:1,borderRadius:5}}>
        
            <FuelBox fname="PETROL" fprice="100" fstock="50"/>
            <FuelBox fname="DIESEL" fprice="100" fstock="50" />
            <FuelBox fname="CNG" fprice="100" fstock="50"/>
            
            </View>
        </View>

    )
}


export default ManageFuel;


