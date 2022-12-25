import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../constants/Themes";
import { config } from "../service/Config";
import AuthService from "../service/AuthService";

const SignInScreen = ({ navigation, route }) => {
  const [overlay, setOverlay] = useState(false);
  const [OverlayText, setOverlayText] = useState("");
  const [popUpErr, setpopUpErr] = useState(false);
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loader, setLoader] = useState(false);

  const checkData = (auth) => {
    const requestBody = {
      email: email,
      password: password,
    };

    config
      .post(`/user/${auth}/login/`, requestBody)
      .then((response) => {
        if (response.data._token === undefined) {
          showErr(true, true, "Wrong Email/Password");
        } else {
          AuthService.setUserSession(response.data._token);
          AuthService.setUserId(response.data._id);
          if (auth === "customer") {
            navigation.navigate("Main");
          } else {
            navigation.navigate("MainVendor");
          }
          setLoader(false);
        }
      })
      .catch((error) => {
        showErr(true, true, `${error.response.data.message}`);
      });
  };

  const validate = () => {
    if (email == "" && password == "") {
      showErr(true, true, "Please fill in all fields");
    } else if (email == "") {
      showErr(true, true, "Please enter your email");
    } else if (password == "") {
      showErr(true, true, "Please enter your password");
    } else {
      setOverlay(false);
      setLoader(true);
      if (route.params.name === "User") {
        checkData("customer");
      } else {
        checkData("vendor");
      }
    }
  };

  useEffect(() => {
    console.log(popUpErr);
  }, [popUpErr]);

  const showErr = (show_overlay, show_popup, overlay_text) => {
    setOverlay(show_overlay);
    setpopUpErr(show_popup);
    setOverlayText(overlay_text);
    setTimeout(() => {
      setLoader(false);
      setpopUpErr(false);
    }, 3000);
  };

  return (
    <>
      <View style={styles.body}>
        <View style={styles.topSection}>
          <Text style={styles.logo}>QRiT</Text>
        </View>

        <ScrollView
          style={styles.bottomSection}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <View style={{ width: "95%", height: 50 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
                <Feather size={50} color={colors.primary} name="chevron-left" />
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
                {route.params.name} {"\n"}Sign In
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => onChangeEmail(text)}
                style={styles.textInput}
                placeholderTextColor={colors.white}
                placeholder="Email"
              />
              <TextInput
                value={password}
                onChangeText={(text) => onChangePassword(text)}
                secureTextEntry={true}
                style={{ ...styles.textInput, marginTop: 10 }}
                placeholderTextColor={colors.white}
                placeholder="Password"
              />
            </View>
            {loader ? (
              <ActivityIndicator size="large" color={colors.white} />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => validate()}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: colors.white,
                      }}
                    >
                      Sign In
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      marginTop: 20,
                      color: colors.white,
                      textDecorationLine: "underline",
                    }}
                  >
                    Forgot password
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
        {popUpErr && (
          <View style={styles.error}>
            <Text
              style={{ color: colors.white, fontWeight: "bold", fontSize: 18 }}
            >
              Unable to Sign In
            </Text>
            <Text
              style={{ color: colors.white, fontWeight: "bold", fontSize: 18 }}
            >
              {OverlayText}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.white,
    top: 100,
    textShadowColor: colors.secondary2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
  body: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bottomSection: {
    width: "100%",
    height: "70%",
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
  button: {
    height: 52,
    width: "80%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.primary,
    height: 80,
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    alignContent: "center",
    borderTopRightRadius: 10,
  },
});
