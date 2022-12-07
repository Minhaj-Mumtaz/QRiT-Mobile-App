import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

// Screens

import WelcomePage from "./WelcomePage";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "./screens/MainContainer";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import VendorDetailsScreen from "./screens/user/VendorDetailsScreen";
import MainVendorContainer from "./screens/MainVendorContainer";
import PromotionPage from "./screens/vendor/PromotionPage";
import ProfileEdit from "./screens/vendor/ProfileEdit";
import SettingsScreen from "./screens/user/SettingsScreen";
import AddBranch from "./screens/vendor/AddBranch";
import ReviewScreen from "./screens/vendor/ReviewScreen";
import HistoryScreen from "./screens/user/HistoryScreen";
import TransactionScreen from "./screens/user/TransactionScreen";
import ThankYouScreen from "./screens/user/ThankYouScreen";

//Screen names
const Stack = createStackNavigator();

const AuthContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signin"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorDetail"
          component={VendorDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainVendor"
          component={MainVendorContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPromotion"
          component={PromotionPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddBranch"
          component={AddBranch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={ProfileEdit}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Review"
          component={ReviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ThankYou"
          component={ThankYouScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthContainer;
