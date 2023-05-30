import { TextInput } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";


const PopupStock = ({toggleModal,fstock,condition,fprice}) => {

  function ManagePopup(condition){
    if(condition=="0"){
      return(
        <View style={styles.modalContent}>
      <Text style={styles.modalText}>Price:{fprice}/L</Text>
          <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={styles.modalText}>Update Price:</Text>
          <TextInput
          style={styles.tinput}
           />
          </View>
          <View style={{flexDirection:"row",alignContent:"space-between"}}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          </View>
          </View>
          )
          
    }
    else{
      return(
        <View style={styles.modalContent}>
      <Text style={styles.modalText}>Stock:{fstock}L</Text>
          <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={styles.modalText}>UpdateStock:</Text>
          <TextInput
          style={styles.tinput}
           />
          </View>
          <View style={{flexDirection:"row",alignContent:"space-between"}}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          </View>
          </View>
      )
    }
  }
    return (
        <View style={styles.modalContainer}>
          {ManagePopup(condition)}
          
      </View>

    );
  };
  
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
    modalText: {
      fontSize: 18,
      marginBottom: 10,
      
    },
    closeButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 5,
      margin:4
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },

    tinput:{
        height: 30,
        width:100,
        borderWidth: 1,
        padding: 7,
        margin:7,
        borderRadius:3
    }
  });
  
  export default PopupStock;