import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import Routes from "./Routes/routes";

export default function App() {
  return (
    <View style={styles.container}>
      <Routes/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
