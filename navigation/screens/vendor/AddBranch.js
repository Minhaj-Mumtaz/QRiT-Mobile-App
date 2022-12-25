import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../constants/Themes";
import Feather from "react-native-vector-icons/Feather";
import AuthService from "../../../service/AuthService";
import { config } from "../../../service/Config";

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
  button: {
    height: 52,
    width: "80%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
  },
});

export default function AddBranch({ navigation }) {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [overlay, setOverlay] = useState(false);
  const [loader, setLoader] = useState(false);
  const [OverlayText, setOverlayText] = useState(
    "Fields are currently not complete"
  );
  const [popUpErr, setpopUpErr] = useState(false);

  const branchCreateSuccess = () => {
    setEmail("");
    setAddress("");
    setMobile("");
    navigation.navigate("Branches");
  };

  const createBranch = async () => {
    setOverlay(false);
    setLoader(true);
    const token = await AuthService.getToken();
    const user_id = await AuthService.getUserId();
    const requestBody = {
      vendor_id: user_id,
      address: address,
      phone_no: mobile,
      email: email,
      picture: "",
    };

    config
      .post(`/user/vendor/branch`, requestBody, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          branchCreateSuccess();
        } else {
          showErr(true, true, `${response.data.message}`);
        }
      })
      .catch((error) => {
        showErr(true, true, `${error.response.data.message}`);
      });
  };
  const validate = () => {
    if ((address === "", email === "", mobile === "")) {
      showErr(true, true, "please fill in all fields");
    } else if (
      isNaN(mobile) ||
      mobile.length < 11 ||
      mobile[0] != "0" ||
      mobile.length > 11
    ) {
      showErr(true, true, "please enter a valid 11 digit mobile number");
    } else if (address.length < 5) {
      showErr(true, true, "please enter a valid address");
    } else {
      setLoader(true);
      createBranch();
    }
  };

  const showErr = (show_overlay, show_popup_err, overlay_text) => {
    setOverlay(show_overlay);
    setpopUpErr(show_popup_err);
    setOverlayText(overlay_text);
    setTimeout(() => {
      setpopUpErr(false);
      setLoader(false);
    }, 3000);
  };

  useEffect(() => {
    console.log(popUpErr);
  }, [popUpErr]);

  return (
    <View style={styles.body}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>Add New{"\n"}Branch</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("Branches")}>
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
              Details
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
              placeholderTextColor={colors.white}
              placeholder="Email"
            />
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={{ ...styles.textInput, marginTop: 10 }}
              placeholderTextColor={colors.white}
              placeholder="Address"
            />
            <TextInput
              value={mobile}
              onChangeText={(text) => setMobile(text)}
              style={{ ...styles.textInput, marginTop: 10 }}
              placeholderTextColor={colors.white}
              placeholder="Mobile No"
            />
          </View>
          {loader ? (
            <ActivityIndicator size="large" color={colors.white} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => validate()}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {popUpErr && (
            <View style={styles.error}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {OverlayText}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
