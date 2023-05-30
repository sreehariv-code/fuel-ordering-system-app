import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import color from '../config/color';
import PopupStock from './PopupStock';
import ToggleButton from './ToggleButton';
let condition=null;
const FuelBox = ({ fname, fprice, fstock }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={{  borderRadius: 10,marginBottom:30 }}>
      <View style={styles.fuelbar}>
        <View style={styles.headingBar}>
          <Text style={{ color: color.secondary, fontWeight: 'bold', fontSize: 18 }}>
            {fname}
          </Text>
          <View style={styles.buttonStyle}>
            <ToggleButton />
          </View>
        </View>
        <View
          style={{
            backgroundColor: color.primary,
            height: '47%',
            width: 2,
            position: 'absolute',
            alignSelf:"center",
            top: '35%',
          }}
        />

        <View style={styles.dataBox}>
          <View style={{ flexDirection: "row"}}>
            <View style={styles.dataBoxContent}>
              <Text>PRICE</Text>
              <Text style={styles.textVal}>{fprice}$</Text>
            </View>
            <View style={styles.dataBoxContent}>
              <Text>STOCK</Text>
              <Text style={styles.textVal}>{fstock}L</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row',width:"60%"}} >
            <TouchableOpacity style={styles.tButton} onPress={()=>{condition=0;
  
              toggleModal()}}>
              <Text style={{ color: color.secondary }}>Manage Price</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tButton} onPress={()=>{condition=1;toggleModal()}}>
              <Text style={{ color: color.secondary }}>Manage Stock</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <PopupStock condition={condition} toggleModal={toggleModal}  fstock={"100"} fprice={"109"}/>

          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fuelbar: {
    backgroundColor: color.ternary,
    height: 170,
    borderRadius: 10,
  },
  headingBar: {
    backgroundColor: '#000',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  buttonStyle: {
    position: 'absolute',
    right: 10,
  },
  dataBox: {
    padding: 10,
  },
  dataBoxContent: {
    width: '50%',
    marginTop:8,
    alignItems: 'center',
    justifyContent:"center" 
  },
  textVal: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  tButton: {
    backgroundColor: color.primary,
    width: '68%',
    alignItems: 'center',
    padding: 1.5,
    borderRadius: 5,
    margin: 15,
  },
});

export default FuelBox;
