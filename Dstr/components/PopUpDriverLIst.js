import { ScrollView, TextInput } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import color from "../config/color";
import PopupDriverData from "./PopupDriverData";
import Ionicons from "@expo/vector-icons/Ionicons";
const PopupDriverList = ({ toggleModal ,navigation}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          onPress={toggleModal}
          style={{ position: "absolute", right: -15, top: -19 }}
        >
          <Ionicons name="close-circle-sharp" size={40} color={"#D21404"} />
        </TouchableOpacity>

        <ScrollView>
          <PopupDriverData navigation={navigation}
            userimg={require("../assets/girl.jpg")}
            name="SERENA"
            location="10.110.21.22"
            distance="10"
          />
          <PopupDriverData navigation={navigation}
            userimg={require("../assets/girl.jpg")}
            name="SERENA"
            location="10.110.21.22"
            distance="10"
          />
          <PopupDriverData navigation={navigation}
            userimg={require("../assets/girl.jpg")}
            name="SERENA"
            location="10.110.21.22"
            distance="10"
          />
          <PopupDriverData navigation={navigation}
            userimg={require("../assets/girl.jpg")}
            name="SERENA"
            location="10.110.21.22"
            distance="10"
          />
          <PopupDriverData navigation={navigation}
            userimg={require("../assets/girl.jpg")}
            name="SERENA"
            location="10.110.21.22"
            distance="10"
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "65%",
  },
});

export default PopupDriverList;
