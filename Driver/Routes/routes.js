import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login";
import SignUpScreen from "../screens/signup";
import Dashboard from "../screens/Dashboard";
import { DriverContext } from "../context/Context";
import { useContext } from "react";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const { token } = useContext(DriverContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ?(
             <>
             <Stack.Screen
           name="Login"
           component={LoginScreen}
           options={{ headerShown: false }}
         />
         <Stack.Screen
         name="SignUp"
         component={SignUpScreen}
         options={{ headerShown: false }}
       /> 
           </>
        ):(
            <>
              <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
            </>

        )}
        
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
