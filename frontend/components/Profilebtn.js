import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";

import ProfileImg from "../constants/constants";

const Profilebtn = ({ navigateTo }) => {
  return (
    <View>
      <TouchableOpacity style={styles.profileBtn}>
        <Image
          source={ProfileImg}
          resizeMode="cover"
          style={styles.profileImg}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileBtn: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  profileImg: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default Profilebtn;
