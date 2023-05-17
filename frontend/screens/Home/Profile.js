import { SafeAreaView, Text, Image, Button, View } from "react-native";
import { UserContext } from "../../context/userContext/context";
import { useContext, useEffect, useState } from "react";
import ProfileImg from "../../constants/constants";

import { Feather } from "@expo/vector-icons";

const Profile = () => {
  const [profileData, setProfileData] = useState();
  const { token, getUserProfile, userState, logOutUser } =
    useContext(UserContext);
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ flex: 0.27, backgroundColor: "#eee" }}></View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          position: "relative",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
        }}
      >
        <View
          style={{
            width: 200,
            aspectRatio: 1 / 1,
            alignItems: "center",
            justifyContent: "center",
            top: -58,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 10,
            borderColor: "#eee",
            borderRadius: 100,
            elevation: 1,
            zIndex: 1,
          }}
        >
          <Image
            source={ProfileImg}
            resizeMode="cover"
            style={{ maxWidth: 200, maxHeight: 200, top: 10 }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: 200,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "unbound-bold",
              fontWeight: "600",
              marginBottom: 12,
            }}
          >
            {userState.loggedUser.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "#555",
              fontFamily: "unbound-regular",
              fontWeight: "500",
            }}
          >
            {userState.loggedUser.email}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Feather name="phone" size={24} color="black" />
            <Text style={{ fontFamily: "unbound-regular", marginLeft: 10 }}>
              {userState.loggedUser.phoneNumber}
            </Text>
          </View>
        </View>
        <View>
          <Button
            title="Log out"
            onPress={() => {
              logOutUser();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
