import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../config/color";
import ToggleButton from "./ToggleButton";
import ManageUPI from "./ManageUPI";

const UpiPayment = () => {

    const [isModalVisible,setIsModalVisible] = useState(false);
    const toggleModal =() =>{
        setIsModalVisible(!isModalVisible);
    }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headingBar}>
          <Text style={styles.textStyle}>UPI Payment</Text>
          <View style={styles.buttonStyle}>
            <ToggleButton />
          </View>
        </View>
        <View style={styles.dataBox}>
          <View style={styles.upiTextStyle}>
            <Text style={styles.upiText}>random@upi</Text>
          </View>
          <View style={styles.upiTextStyle}>
            <Text style={styles.upiText}>random@upi</Text>
          </View>
          <View style={styles.upiTextStyle}>
            <Text style={styles.upiText}>random@upi</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.tButton} onPress={toggleModal}>
              <Text style={styles.textVal}>Manage VPA</Text>
            </TouchableOpacity>
          </View>
            <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={toggleModal}>
                <ManageUPI toggleModal={toggleModal}/>
            </Modal>

        </View>
      </View>
      <View>
        <View style={styles.headingBar}>
          <Text style={styles.textStyle}>Cash On Delivery</Text>
          <View style={styles.buttonStyle}>
            <ToggleButton />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpiPayment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.secondary,
  },
  headingBar: {
    backgroundColor: color.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  textStyle: {
    color: color.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonStyle: {
    position: "absolute",
    right: 10,
  },
  dataBox: {
    backgroundColor: color.secondary,
    padding: "6%",
  },
  tButton: {
    backgroundColor: color.primary,
    width: "38%",
    alignItems: "center",
    padding: 1.5,
    borderRadius: 5,
    marginTop: 10,
  },
  textVal: {
    fontWeight: "bold",
    fontSize: 15,
    color: color.secondary,
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
  },
});
