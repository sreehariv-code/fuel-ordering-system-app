import { TextInput } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View,Image } from "react-native";
import color from "../config/color";
const PopupDriverData= ({userimg, name, distance, location,navigation}) => {
  
      function assignDriver()
      {
        navigation.navigate('Dashboard')
      }
    return (
        
         <View>
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
            
            <Text>LOCATION:{location}</Text>
            <Text>DISTANCE:{distance}KM</Text>
          </View>
        </Text>
      </View>
      <View style={{ flexDirection: "row", bottom: "9%", left: "38%" }}>
        <TouchableOpacity style={styles.button} onPress={assignDriver}>
          <Text style={styles.accreText}>ASSIGN</Text>
        </TouchableOpacity>
        
      </View>
      
    </View>

         </View>
       

    );
  };
  
  const styles = StyleSheet.create({
    
   
    modalText: {
      fontSize: 18,
      marginBottom: 10,
      
    },
    box:{
      borderWidth:1,
    },
    MainBox: {
      // flex:1,
      
      backgroundColor: color.secondary,
      height: 140,
      borderRadius: 10,
      justifyContent: "space-around",
      alignItems: "center",
      margin: 10,
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
      padding:20,
      marginTop:"2%"
    },
    sideText: {
      flexDirection: "column",
      marginTop: 20,
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
      width: "35%",
      alignItems: "center",
      padding: 1.5,
      borderRadius: 5,
      margin: 8,
      color: color.secondary,
    },

  });
  
  export default PopupDriverData;