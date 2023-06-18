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
const OrderBox = ({ userimg, name, fuel, litre, distance, location,navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.MainBox}>
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          paddingBottom: 0,
          alignItems: "center",
        }}
      >
        <View style={styles.proName}>
          <Image source={userimg} style={styles.userImgSty} />
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <Text style={styles.allText}>
          <View style={styles.sideText}>
            <Text>FUEL:{fuel}</Text>
            <Text>LITRE:{litre}L</Text>
            <Text>LOCATION:{location}</Text>
            <Text>DISTANCE:{distance}KM</Text>
          </View>
        </Text>
      </View>
      <View style={{ flexDirection: "row", bottom: "5%", left: "38%" }}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Dashboard')} > 
        {/* modal not used */}
          <Text style={styles.accreText}>ACCEPT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.accreText}>REJECT</Text>
        </TouchableOpacity>
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
    // flex:1,
    margin: 5,
    backgroundColor: color.secondary,
    height: 160,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },

  userImgSty: {
    borderRadius: 100,
    height: 90,
    width: 90,
    bottom: 1,
  },
  proName: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 30,
    marginTop: 50,
  },
  sideText: {
    flexDirection: "column",
    marginTop: 10,
  },
  allText: {
    color: color.primary,
    fontSize: 17,
    fontWeight: "bold",
  },
  accreText: {
    color: color.secondary,
    fontSize: 17,
    fontWeight: "bold",
  },

  nameText: {
    color: color.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    backgroundColor: color.primary,
    width: "25%",
    alignItems: "center",
    padding: 1.5,
    borderRadius: 5,
    margin: 8,
    color: color.secondary,
  },
});

export default OrderBox;
