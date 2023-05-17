import React, { useContext, useState } from "react";
import { Button, FlatList, Text, TextInput } from "react-native";
import { View } from "react-native";
import DropdownComponent from "../../components/DropDownList/DropDown";
import { UserContext } from "../../context/userContext/context";
import FuelCards from "../../components/FuelCards";

const FuelOrderScreen = ({ navigation }) => {
  const [stationId, setStationId] = useState(null);
  const [fuelId, setFuelId] = useState(null);
  const [fuelAmount, setFuelAmount] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");

  const handlePress = (id) => {
    setFuelId(id);
  };

  const { memoizedDistributorsList } = useContext(UserContext);
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

  console.log(unitPrice);

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

  return (
    <View>
      <View>
        <Button
          title="Go Back to Home"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
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
        <Text style={{ fontSize: 20, paddingLeft: 14, fontWeight: "600" }}>
          Choose Fuel Type
        </Text>
        <View style={{ paddingLeft: 14 }}>
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
            <View>
              <View>
                <Text>Set The Quantity</Text>
              </View>
              <View>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Amount of fuel"
                  value={fuelAmount}
                  onChangeText={handleAmountChange}
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
    </View>
  );
};

export default FuelOrderScreen;
