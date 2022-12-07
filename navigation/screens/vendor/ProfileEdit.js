import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { colors } from "../../../constants/Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.white,
    // top: 100,
    textShadowColor: colors.secondary2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
    paddingTop: 20,
  },
  bottomSection: {
    width: "100%",
    height: "80%",
    backgroundColor: colors.secondary2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textInput: {
    height: 52,
    width: "100%",
    color: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingLeft: 10,
  },
});

export default function ProfileEdit({ navigation }) {
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };

  const [loca, setLoca] = useState();
  const [branchAdrs, setBranchAdrs] = useState();
  const [branchNum, setBranchNum] = useState();

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    // return () => {
    //   BackHandler.exitApp();
    // };
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>Edit{"\n"}Profile</Text>
      </View>

      <View style={styles.bottomSection}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View style={{ width: "95%", height: 50 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Feather size={50} color={colors.white} name="chevron-left" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "80%", marginBottom: 20 }}>
            <Text
              style={{
                color: colors.white,
                fontSize: 40,
                marginTop: 10,
                marginBottom: 30,
              }}
            >
              Edit
            </Text>
            <TextInput
              value={branchAdrs}
              onChangeText={(text) => setBranchAdrs(text)}
              secureTextEntry={true}
              style={{ ...styles.textInput, marginTop: 10 }}
              placeholderTextColor={colors.white}
              placeholder="Branch Address"
            />
            <TextInput
              value={branchNum}
              onChangeText={(text) => setBranchNum(text)}
              secureTextEntry={true}
              style={{ ...styles.textInput, marginTop: 10 }}
              placeholderTextColor={colors.white}
              placeholder="Branch Number"
            />
            <TextInput
              value={loca}
              onChangeText={(text) => setLoca(text)}
              secureTextEntry={true}
              style={{ ...styles.textInput, marginTop: 10 }}
              placeholderTextColor={colors.white}
              placeholder="Location"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
