import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Platform,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import { View } from "react-native";
import DropdownComponent from "../../components/DropDownList/DropDown";
import { UserContext } from "../../context/userContext/context";
import FuelCards from "../../components/FuelCards";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import Constants from "expo-constants";

const FuelOrderScreen = ({ navigation }) => {
  const { token, getUserProfile, userState, memoizedDistributorsList } =
    useContext(UserContext);
  const [stationId, setStationId] = useState(null);
  const [fuelId, setFuelId] = useState(null);
  const [fuelAmount, setFuelAmount] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const stripe = useStripe();

  const { manifest } = Constants;

  const androidUrl = `http://${manifest.debuggerHost
    .split(":")
    .shift()}:8080/api/`;
  const iosUrl = `http://localhost:8080/api/`;
  let baseURL;
  if (Platform.OS === "android") {
    baseURL = androidUrl + "pay";
  } else {
    baseURL = iosUrl + "pay";
  }

  useEffect(() => {
    (async () => {
      await getUserProfile(token);
    })();
  }, []);

  if (!userState.loggedUser) {
    return null;
  }
  const handlePress = (id) => {
    setFuelId(id);
  };

  const optionList = memoizedDistributorsList.map(
    ({ _id, stationDetails }) => ({
      id: _id,
      stationName: stationDetails.stationName,
      address: stationDetails.address,
    })
  );

  const stationFuelTypes =
    memoizedDistributorsList.find(
      (distributor) => distributor._id === stationId
    )?.fuelTypes || [];

  const selectedFuel = stationFuelTypes.find(
    (fuelType) => fuelType._id === fuelId
  );
  const unitPrice = selectedFuel ? selectedFuel.unitPrice : 0;

  // console.log(unitPrice);

  const handleAmountChange = (value) => {
    setFuelAmount(value);
    if (value === "") {
      setFuelPrice("0");
    } else {
      setFuelPrice((parseFloat(value) * unitPrice).toString());
    }
  };

  const handlePriceChange = (value) => {
    setFuelPrice(value);
    if (value === "") {
      setFuelPrice("0");
    } else {
      setFuelAmount((parseFloat(value) / unitPrice).toString());
    }
  };

  //function to place order
  const stripeConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const placeOrder = async () => {
    try {
      const name = userState.loggedUser.name;
      const amount = fuelPrice;
      //sending request
      const response = await axios.post(
        baseURL,
        { name, amount },
        stripeConfig
      );

      const data = await response.data;

      if (!data) return Alert.alert(data.message);

      const clientSecret = data.clientSecret;

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Anwar",
      });

      if (initSheet.error) return Alert.alert(initSheet.error.message);

      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });

      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment Completed, Thank You");
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong, try again later!!");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", paddingLeft: 14 }}>
          Nearby Fuel Stations
        </Text>
        <DropdownComponent
          list={optionList}
          value={stationId}
          setValue={setStationId}
          setFuelId={setFuelId}
        />
        <View>
          <View style={{ paddingLeft: 14 }}>
            {stationFuelTypes && (
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 14,
                  fontWeight: "600",
                  paddingVertical: 30,
                }}
              >
                Choose Fuel Type
              </Text>
            )}
            <FlatList
              data={stationFuelTypes}
              renderItem={({ item }) => (
                <FuelCards
                  fuelName={item.name}
                  fuelId={item._id}
                  selectedFuelId={fuelId}
                  onPress={() => {
                    handlePress(item._id);
                  }}
                />
              )}
              horizontal
            />
            {fuelId && (
              <View style={{ paddingLeft: 10 }}>
                <View
                  style={{
                    paddingTop: 34,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Set The Quantity</Text>
                </View>
                <View style={{ paddingVertical: 20 }}>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Amount of fuel"
                    value={fuelAmount}
                    onChangeText={handleAmountChange}
                    style={{ marginBottom: 10 }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Price"
                    value={fuelPrice}
                    onChangeText={handlePriceChange}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {(fuelPrice != 0 || fuelAmount) && (
        <View>
          <Button title="Place Order" onPress={placeOrder} />
        </View>
      )}
    </View>
  );
};

export default FuelOrderScreen;
