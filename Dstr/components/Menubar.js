import React from "react";
import { StyleSheet, View,Text, TouchableOpacity } from "react-native";
import color from "../config/color";
import Ionicons from '@expo/vector-icons/Ionicons';

const MenuBar =({iconname1,iconname2,iconname3,n1,n2,n3,navigation,condition}) =>{
    function b1(){
        if(condition==0)
        {
            navigation.navigate('Orders')
        }
        else{
            navigation.navigate('Wallet')
        }
    }

    function b2(){
        if(condition==0)
        {
            navigation.navigate('Fuel')
        }
        else{
            navigation.navigate('Payments')
        }
    }

    function b3(){
        if(condition==0)
        {
            navigation.navigate('Drivers')
        }
        else{
            navigation.navigate('Profile')
        }
    }
    
    return(
        <View style={{padding:10,borderRadius:10,margin:10}}>
            <View style={styles.menubox}>
                
                <TouchableOpacity style={styles.iconBox} onPress = {b1}>
                    <Ionicons style={styles.iconstyle} name={iconname1} size={60}   />
                    <Text style={styles.iconText} >{n1}</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.iconBox} onPress={b2}>
                
                    <Ionicons style={styles.iconstyle} name={iconname2} size={60}  />
                    <Text style={styles.iconText} >{n2}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBox} onPress={b3}>
                    <Ionicons style={styles.iconstyle} name={iconname3} size={60}  />
                    <Text style={styles.iconText} >{n3}</Text> 
                </TouchableOpacity>
            
                   
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    menubox : {
        backgroundColor:color.ternary,
        height:100,
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    iconBox:{
        
        alignItems:"center",
        
    },
    iconText:{

        fontWeight:"500"
    }
})

export default MenuBar;