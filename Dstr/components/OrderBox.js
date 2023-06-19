import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
} from "react-native";
import color from "../config/color";
import PopupDriverList from "./PopUpDriverLIst";
const OrderBox = ({ userimg, name, fuel, litre,  navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.MainBox}>
      <View style={{paddingVertical:15,paddingLeft:10}}>
        <View style={{flexDirection: "row",justifyContent:"space-around"}}>
          <View style={styles.proName}>
            <Image source={userimg} style={styles.userImgSty} />
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.sideText}>
              <Text style={{fontSize:20}}>FUEL:{fuel}</Text>
              <Text style={{fontSize:20}}>LITRE:{litre}L</Text> 
          </View>
        </View>      
          <View style={{ flexDirection: "row",}}>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Dashboard')} > 
            {/* modal not used */}
              <Text style={styles.accreText}>ACCEPT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.accreText}>REJECT</Text>
            </TouchableOpacity>
          </View>              
      </View>
      
     
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <PopupDriverList navigation={navigation} toggleModal={toggleModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  MainBox: {
    flex:1,
    marginBottom:30,
    backgroundColor: color.secondary,
    maxHeight:170,
    minHeight:80,
    borderRadius: 20,
    width:"75%"

  },

  userImgSty: {
    borderRadius: 100,
    height: 80,
    width: 80,
    marginBottom:6,
  },
  proName: {
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center"
  },
  sideText: {
    flexDirection: "column",
    alignItems:"center",
    justifyContent:"center"
  },
  allText: {
    color: color.primary,
    fontSize: 17,
    fontWeight: "bold",
  },
  accreText: {
    color: color.secondary,
    fontSize: 12,
    fontWeight: "bold",
  },

  nameText: {
    color: color.primary,
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: color.primary,
    width: "40%",
    alignItems: "center",
    padding: 1.5,
    borderRadius: 5,
    margin: 8,
    color: color.secondary,
  },
});

export default OrderBox;
