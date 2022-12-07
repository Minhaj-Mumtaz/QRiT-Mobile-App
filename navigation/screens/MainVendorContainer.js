import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Promotion from "./vendor/Promotion";
import ProfileScreen from "./vendor/ProfileScreen";
import { colors } from "../../constants/Themes";
import { createStackNavigator } from "@react-navigation/stack";
import BranchesScreen from "./vendor/BranchesScreen";

//Screen names
const promotionName = "Promotion";
const profileName = "Profile";
const branchesName = "Branches";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainVendorContainer = () => {
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
          } else if (rn === profileName) {
            iconName = focused ? "md-person" : "md-person-outline";
          } else if (rn === branchesName) {
            iconName = focused ? "ios-business" : "ios-business-outline";
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
        name={branchesName}
        component={BranchesScreen}
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

export default MainVendorContainer;
