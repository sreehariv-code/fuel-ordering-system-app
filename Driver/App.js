import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import Routes from "./Routes/routes";
import DriverContextProvider from "./context/Context";

export default function App() {
  return (
    <View style={styles.container}>
      <DriverContextProvider>
        <Routes/>
      </DriverContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
