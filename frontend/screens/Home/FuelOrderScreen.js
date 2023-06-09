import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import {
  Alert,
  FlatList,
  Platform,
  ScrollView,
  Text,
  TextInput,
  SafeAreaView,
} from "react-native";
import { View } from "react-native";
import DropdownComponent from "../../components/DropDownList/DropDown";
import { UserContext } from "../../context/userContext/context";
import FuelCards from "../../components/FuelCards";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import Constants from "expo-constants";
import FilterTabs from "../../components/FilterTabs/FilterTabs";

const FuelOrderScreen = ({ navigation }) => {
  const {
    token,
    getUserProfile,
    userState,
    memoizedDistributorsList,
    getListofDistributorsNearby,
    filteredList,
    createOrder,
  } = useContext(UserContext);
  const [stationId, setStationId] = useState(null);
  const [fuelId, setFuelId] = useState(null);
  const [fuelName, setFuelName] = useState(null);
  const [fuelAmount, setFuelAmount] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [data, setData] = useState(null);
  const [radius, setRadius] = useState(0);

  const stripe = useStripe();

  const filterDistances = [
    { title: "2 km", data: 2 },
    { title: "5 km", data: 5 },
    { title: "10 km", data: 10 },
  ];

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

  useEffect(() => {
    getListofDistributorsNearby(radius);
  }, [radius]);

  if (!userState.loggedUser) {
    return null;
  }
  const handlePress = (id, name) => {
    setFuelId(id);
    setFuelName(name);
  };

  let extractedData = [];

  if (filteredList.length > 0) {
    extractedData = filteredList.map((item) => {
      const { distributor } = item;
      const { _id, stationDetails, fuelTypes } = distributor;
      return {
        distributorId: _id,
        stationDetails: stationDetails,
        fuelTypes: fuelTypes,
      };
    });
  }

  const optionList = extractedData.map((item) => {
    const { distributorId, stationDetails } = item;
    const { stationName, address } = stationDetails;
    return {
      distributorId,
      stationName,
      address,
    };
  });

  const stationFuelTypes =
    extractedData.find((distributor) => distributor.distributorId === stationId)
      ?.fuelTypes || [];

  const selectedFuel = stationFuelTypes.find(
    (fuelType) => fuelType._id === fuelId
  );
  const unitPrice = selectedFuel ? selectedFuel.unitPrice : 0;

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
      setFuelAmount("0");
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
    if (!stationId) {
      Alert.alert("Select a station");
      return;
    }
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

      console.log(data);

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
      // console.log(fuelName, fuelAmount, fuelPrice, stationId);

      createOrder(fuelName, fuelAmount, fuelPrice, stationId);
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong, try again later!!");
    }
  };

  console.log(stationId);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", paddingLeft: 14 }}>
          Nearby Fuel Stations
        </Text>
        <View style={{ marginLeft: 20 }}>
          <FlatList
            data={filterDistances}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FilterTabs
                text={item.title}
                data={item.data}
                selectedData={data}
                onPress={() => {
                  setData(item.data);
                  setRadius(item.data);
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>
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
                    handlePress(item._id, item.name);
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
                    style={{
                      borderWidth: 2,
                      borderBottomColor: "#000",
                      padding: 2,
                      width: 300,
                      borderRadius: 5,
                    }}
                  />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Price"
                    value={fuelPrice}
                    onChangeText={handlePriceChange}
                    style={{
                      borderWidth: 2,
                      borderBottomColor: "#000",
                      padding: 2,
                      width: 300,
                      borderRadius: 5,
                      marginTop: 5,
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {(fuelPrice != 0 || fuelAmount) && (
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            elevation: 2,
            shadowColor: "#333",
          }}
        >
          <Button text="Place Order" onPress={placeOrder} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FuelOrderScreen;
