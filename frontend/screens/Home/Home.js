import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import FuelCards from "../../components/FuelCards";

const fuelType = ["Petrol", "Diesel", "CNG"];

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Choose the fuel</Text>
        <FlatList
          horizontal
          data={fuelType}
          renderItem={({ item }) => <FuelCards />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
