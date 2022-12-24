import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../constants/Themes";
import SelectDropdown from "react-native-select-dropdown";
import AuthService from "../service/AuthService";
import { config } from "../service/Config";

const SignUpScreen = ({ navigation }) => {
  const [overlay, setOverlay] = useState(false);
  const [OverlayText, setOverlayText] = useState(
    "Registration is currently not complete"
  );
  const [popUpErr, setpopUpErr] = useState(false);
  const [Registered, setRegistered] = useState(false);
  const [Fullname, onChangeFullname] = useState("");
  const [userName, onChangeUserName] = useState("");
  const [vendorName, onChangeVendorName] = useState("");
  const [Address, onChangeAddress] = useState("");
  const [Email, onChangeEmail] = useState("");
  const [Mobile, onChangeMobile] = useState("");
  const [nic_no, onChangeNic_no] = useState("");
  const [registration_no, onChangeRegNo] = useState("");
  const [Password, onChangePassword] = useState("");
  const [ConfirmPassword, onChangeConfirmPassword] = useState("");
  const [selectedItemidx, setSelectedItemidx] = useState("");
  const [loader, setLoader] = useState(false);

  const createAccount = (first_name, last_name) => {
    setOverlay(false);
    setLoader(true);
    let requestBody;
    if (selectedItemidx === 0) {
      requestBody = {
        first_name,
        last_name,
        address: Address,
        phone_no: Mobile,
        email: Email,
        password: Password,
      };
    } else {
      requestBody = {
        first_name,
        last_name,
        user_name: userName,
        vendor_name: vendorName,
        nic_no: nic_no,
        registration_no: registration_no,
        email: Email,
        password: Password,
      };
    }
    const item = ["customer", "vendor"];
    config
      .post(`/user/${item[selectedItemidx]}/signup/`, requestBody)
      .then((response) => {
        if (response.data._token === undefined) {
          showErr(true, true, "account created, please sign in again");
        } else {
          AuthService.setUserSession(response.data._token);
          AuthService.setUserId(response.data.user_id);
          SignUpSuccess();
        }
      })
      .catch((error) => {
        showErr(true, true, `${error.response.data.message} `);
      });
  };

  const SignUpSuccess = () => {
    setRegistered(false);
    setLoader(false);
    setOverlay(false);
    onChangeFullname("");
    onChangeConfirmPassword("");
    onChangeEmail("");
    onChangeMobile("");
    onChangePassword("");
    if (selectedItemidx === 0) {
      navigation.navigate("Main");
    } else {
      navigation.navigate("MainVendor");
    }
  };

  const validate = () => {
    //validate the full name
    let fullname_has_spacing = Fullname.includes(" ");
    let index_of_spacing = Fullname.indexOf(" ");
    let second_name = Fullname.substring(index_of_spacing + 1);
    let first_name = Fullname.substring(0, index_of_spacing);
    //
    if ((Fullname, Email, Mobile, Password, ConfirmPassword == "")) {
      showErr(true, true, "please fill in all fields");
    } else if (
      selectedItemidx === 0 &&
      (isNaN(Mobile) ||
        Mobile.length < 11 ||
        Mobile[0] != "0" ||
        Mobile.length > 11)
    ) {
      showErr(true, true, "please enter a valid 10 digit mobile number");
    } else if (Password != ConfirmPassword) {
      showErr(true, true, "your passwords do not match");
    } else if (fullname_has_spacing == false) {
      showErr(true, true, "please enter your fullname");
    } else if (first_name.length < 2) {
      showErr(true, true, "a valid first name must have 2 characters or more");
    } else if (second_name.length < 2) {
      showErr(true, true, "a valid last name must have 2 characters or more");
    } else if (Password.length < 8) {
      showErr(true, true, "a password must be at least 8 characters long");
    } else {
      createAccount(first_name, second_name);
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

  const selectItems = ["User", "Vendor"];

  useEffect(() => {
    console.log(popUpErr);
  }, [popUpErr]);

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
                Create {"\n"}Account
              </Text>
              <SelectDropdown
                data={selectItems}
                onSelect={(selectedItem, index) => setSelectedItemidx(index)}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{ ...styles.button, width: "100%" }}
                buttonTextStyle={{ color: colors.white }}
                dropdownStyle={{ backgroundColor: colors.primary }}
                rowTextStyle={{ color: colors.white }}
              />
              <TextInput
                value={Fullname}
                onChangeText={(text) => onChangeFullname(text)}
                style={{ ...styles.textInput, marginTop: 10 }}
                placeholderTextColor={colors.white}
                placeholder="Full name"
              />
              <TextInput
                value={Email}
                onChangeText={(text) => onChangeEmail(text)}
                style={{ ...styles.textInput, marginTop: 10 }}
                placeholderTextColor={colors.white}
                placeholder="Email"
              />

              {selectedItemidx === 0 ? (
                <>
                  <TextInput
                    value={Address}
                    onChangeText={(text) => onChangeAddress(text)}
                    style={{ ...styles.textInput, marginTop: 10 }}
                    placeholderTextColor={colors.white}
                    placeholder="Address"
                  />
                  <TextInput
                    value={Mobile}
                    onChangeText={(text) => onChangeMobile(text)}
                    style={{ ...styles.textInput, marginTop: 10 }}
                    placeholderTextColor={colors.white}
                    placeholder="Mobile"
                  />
                </>
              ) : (
                <>
                  <TextInput
                    value={userName}
                    onChangeText={(text) => onChangeUserName(text)}
                    style={{ ...styles.textInput, marginTop: 10 }}
                    placeholderTextColor={colors.white}
                    placeholder="User Name"
                  />
                  <TextInput
                    value={nic_no}
                    onChangeText={(text) => onChangeNic_no(text)}
                    style={{ ...styles.textInput, marginTop: 10 }}
                    placeholderTextColor={colors.white}
                    placeholder="NIC"
                  />
                  <TextInput
                    value={vendorName}
                    onChangeText={(text) => onChangeVendorName(text)}
                    style={{ ...styles.textInput, marginTop: 10 }}
                    placeholderTextColor={colors.white}
                    placeholder="Vendor Name"
                  />
                  <TextInput
                    value={registration_no}
                    onChangeText={(text) => onChangeRegNo(text)}
                    style={{ ...styles.textInput, marginTop: 10 }}
                    placeholderTextColor={colors.white}
                    placeholder="Registration Number"
                  />
                </>
              )}

              <TextInput
                value={Password}
                onChangeText={(text) => onChangePassword(text)}
                secureTextEntry={true}
                style={{ ...styles.textInput, marginTop: 10 }}
                placeholderTextColor={colors.white}
                placeholder="Password"
              />
              <TextInput
                value={ConfirmPassword}
                onChangeText={(text) => onChangeConfirmPassword(text)}
                secureTextEntry={true}
                style={{ ...styles.textInput, marginTop: 10 }}
                placeholderTextColor={colors.white}
                placeholder="Confirm Password"
              />
            </View>
            {loader ? (
              <ActivityIndicator size="large" color={colors.white} />
            ) : (
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
                    Sign Up
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
      {popUpErr && (
        <View style={styles.error}>
          <Text
            style={{ color: colors.white, fontWeight: "bold", fontSize: 18 }}
          >
            Unable to Sign Up
          </Text>
          <Text
            style={{ color: colors.white, fontWeight: "bold", fontSize: 18 }}
          >
            {OverlayText}
          </Text>
        </View>
      )}
    </>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.white,
    top: 60,
    textShadowColor: colors.secondary2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
  },
  topSection: {
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
  },
  body: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bottomSection: {
    width: "100%",
    height: "80%",
    backgroundColor: colors.secondary2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // justifyContent:'center',
    // alignItems:'center'
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
