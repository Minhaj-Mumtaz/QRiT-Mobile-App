import { StyleSheet, Text, View } from "react-native";
import AuthContainer from "./navigation/AuthContainer";
import DetailsScreen from "./navigation/screens/user/DetailsScreen";
import TransactionScreen from "./navigation/screens/user/TransactionScreen";
import ProfileScreen from "./navigation/screens/vendor/ProfileScreen";

export default function App() {
  return (
    // <MainContainer />
    <AuthContainer />
    // <TransactionScreen />
    // <ProfileScreen />
    // <DetailsScreen />
    // <Welcome />
    // <ProfileScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
