import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import WebView from "react-native-webview";

import mapTemplate from "../../components/MapTemplate/map-template";

const MapScreen = () => {
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState("76.2144, 10.5276");
  let [marker, setMarker] = useState(null);

  const run = `
      document.body.style.backgroundColor = 'blue';
      true;
    `;

  const onButtonClick = () => {
    const [lng, lat] = mapCenter.split(",");
    webRef.injectJavaScript(
      `map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])
      `
    );
  };

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
  };

  const setMapMarker = (position) => {
    // Remove the previous marker
    if (marker) {
      marker.remove();
    }
    // Create a new marker
    const newMarker = new tt.Marker().setLngLat(position).addTo(map);
    setMarker(newMarker);
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
        onLoad={() => {
          const [lng, lat] = mapCenter.split(",");
          const center = [parseFloat(lng), parseFloat(lat)];
          // create the map
          tt.setProductInfo("TomTom Maps React Native Demo", "1.0");
          let map = tt.map({
            key: "G6s10rHxiazuOmC5kNMPeyqgDmGAdezZ",
            container: "map",
            center: center,
            zoom: 17.5,
          });

          map.on("click", function (e) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ x: e.point.x, y: e.point.y })
            );
            setMapMarker(e.lngLat);
          });

          map.on("dragend", function () {
            let center = map.getCenter();
            window.ReactNativeWebView.postMessage(
              center.lng.toFixed(3) + ", " + center.lat.toFixed(3)
            );
            setMapMarker(center);
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    height: "15%",
    backgroundColor: "#fff",
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
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

export default MapScreen;
