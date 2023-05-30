import React from 'react'
import { View,Text, StyleSheet, Touchable, TouchableOpacity, TextInput } from 'react-native'
import color from '../config/color'
import Ionicons from "@expo/vector-icons/Ionicons";
const ManageUPI = ({toggleModal}) => {
  return (
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={toggleModal}
          style={{ position: "absolute", right: -11, top: -12 }}
        >
          <Ionicons name="close-circle-sharp" size={40} color={color.primary} />
        </TouchableOpacity>
        <View style={styles.dataBox}>
          <View style={styles.upiTextStyle}>
            <Text style={styles.upiText}>random@upi</Text>
            <Ionicons name='remove-circle' size={30} style={styles.iconStyle} color={"#D21404"}/>
          </View>
          <View style={styles.upiTextStyle}>
            <Text style={styles.upiText}>random@upi</Text>
            <Ionicons name='remove-circle' size={30} style={styles.iconStyle} color={"#D21404"}/>
          </View>
          <View style={styles.upiTextStyle}>
            <Text style={styles.upiText}>random@upi</Text>
            <Ionicons name='remove-circle' size={30} style={styles.iconStyle} color={"#D21404"}/>
          </View>
          <View style={styles.upiTextStyle}>
          <TextInput style={styles.input}/>
          <Ionicons name='add-circle' size={30} style={styles.iconStyle} color={"green"}/>
          </View>
          {/* <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
          </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    
   
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width:"80%"
    },
    upiText: {
        color: color.primary,
        fontSize: 17,
        fontWeight: "bold",
      },
      upiTextStyle: {
        borderColor: color.primary,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 15,
        flexDirection:"row",
        alignItems:"center"
      },
      dataBox: {
        backgroundColor: color.secondary,
        padding: "6%",
        width:"99%"
      },
      iconStyle:{
        position:"absolute",
        right:2
      },
      input:{
        height: 30,
        width:"85%",
        borderWidth: 1,
        padding: 7,
        backgroundColor:"#FEFBEA",
        borderRadius:3,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
      },
      closeButton: {
        backgroundColor: '#2196F3',
        padding: 8,
        borderRadius: 5,
        margin:5,
        marginTop:9,
        width:"40%",
        alignItems:"center",
        alignSelf:"center"
      }
})

export default ManageUPI