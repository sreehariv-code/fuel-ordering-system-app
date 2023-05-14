import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import HomeScreen from "../screens/Home/HomeScreen";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import { UserContext } from "../context/userContext/context";

const Routes = () => {
  const { token } = useContext(UserContext);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShadowVisible: false,
                headerShown: false,
                headerTitle: "",
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
