import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import WebView from "react-native-webview";

import mapTemplate from "../MapTemplate/map-template";
const MapView = ({ location }) => {
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState(null);
  useEffect(() => {
    if (location) {
      setMapCenter(`${location[1]},${location[0]}`);
    } else {
      setMapCenter("76.2144, 10.5276");
    }
  }, [location]);
  const run = `
      document.body.style.backgroundColor = 'blue';
      true;
    `;

  const onButtonClick = () => {
    const [lng, lat] = mapCenter.split(",");
    webRef.injectJavaScript(
      `map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])
      
     
      marker = new tt.Marker().setLngLat([${parseFloat(lng)},${parseFloat(
        lat
      )}]).addTo(map);
      `
    );
  };

  const handleMapEvent = (event) => {
    console.log(event.nativeEvent.data);
    setMapCenter(event.nativeEvent.data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TextInput
          style={styles.textInput}
          onChangeText={setMapCenter}
          value={mapCenter}
        ></TextInput>
        <Button title="Set Center" onPress={onButtonClick}></Button>
      </View>
      <WebView
        ref={(r) => (webRef = r)}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={["*"]}
        source={{ html: mapTemplate }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "red",
  },
  buttons: {
    flexDirection: "row",
    height: "15%",
    backgroundColor: "#fff",
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
  },
  textInput: {
    height: 40,
    width: "60%",
    marginRight: 12,
    paddingLeft: 5,
    borderWidth: 1,
  },
  map: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 3 }],
  },
});

export default MapView;
