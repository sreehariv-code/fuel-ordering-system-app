import { SafeAreaView, Text, Image, Button, View } from "react-native";
import { UserContext } from "../../context/userContext/context";
import { useContext, useState } from "react";
import MapScreen from "../../components/MapView/MapViewTemp";

const Profile = () => {
  const [profileData, setProfileData] = useState();
  const { token, getUserProfile, profile, logOutUser } =
    useContext(UserContext);
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <View> </View>
      <View style={{ width: 200 }}>
        <Button
          title="Get profile"
          onPress={() => {
            getUserProfile();
          }}
        />
      </View>
      <View>
        <Text>User Name: {profile.userName}</Text>
        <Text>Email: {profile.email}</Text>
        <Text>Phone Number: {profile.phoneNumber}</Text>
      </View>
      <Button
        onPress={() => {
          logOutUser();
        }}
        title="Logout"
      />

      {/* <MapScreen /> */}
    </SafeAreaView>
  );
};

export default Profile;
