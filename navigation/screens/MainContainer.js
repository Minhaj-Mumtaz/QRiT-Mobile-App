import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Promotion from "./user/Promotion";
import ProfileScreen from "./user/ProfileScreen";
import DetailsScreen from "./user/DetailsScreen";
import SettingsScreen from "./user/SettingsScreen";
import WelcomePage from "../WelcomePage";
import QRScreen from "./user/QRScreen";
import SpinScreen from "./user/SpinScreen";
import { colors } from "../../constants/Themes";
import { createStackNavigator } from "@react-navigation/stack";

//Screen names
const promotionName = "Promotion";
const vendorsName = "Vendors";
const QRName = "QR";
const spinName = "Spin";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={profileName}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        // tabBarStyle: { padding: 10, height: 70 },
        tabBarStyle: {
          padding: 10,
          height: 60,
          backgroundColor: colors.secondary2,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === promotionName) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === vendorsName) {
            iconName = focused ? "ios-business" : "ios-business-outline";
          } else if (rn === QRName) {
            iconName = focused ? "qr-code" : "qr-code-outline";
          } else if (rn === spinName) {
            iconName = focused ? "aperture" : "aperture-outline";
          } else if (rn === profileName) {
            iconName = focused ? "md-person" : "md-person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={promotionName}
        component={Promotion}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={spinName}
        component={SpinScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={QRName}
        component={QRScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={vendorsName}
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={profileName}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
