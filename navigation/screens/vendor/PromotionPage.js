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
import Ionicons from "react-native-vector-icons/Ionicons";
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
    height: "20%",
    width: "100%",
    color: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingLeft: 10,
  },
  input: {
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

export default function PromotionPage({ navigation }) {
  const [desc, setDesc] = useState("");
  const [promotionName, setPromotionName] = useState("");
  const [loader, setLoader] = useState(false);

  const addPromotion = async () => {
    setLoader(true);
    const token = await AuthService.getToken();
    const user_id = await AuthService.getUserId();
    let date = new Date();
    let startDate = new Date();
    let endDate = new Date(date.setMonth(date.getMonth() + 1));
    const body = {
      name: promotionName,
      description: desc,
      start_data: startDate,
      picture: null,
      end_date: endDate,
    };
    config
      .post(`/promotion/vendor/${user_id}`, body, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          navigation.navigate("Promotion");
        }
        showErr();
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const showErr = () => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  };

  return (
    <View style={styles.body}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>Add New{"\n"}Promotion</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("Promotion")}>
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
              value={promotionName}
              onChangeText={(text) => setPromotionName(text)}
              style={{ ...styles.input, marginBottom: 10 }}
              placeholderTextColor={colors.white}
              placeholder="Promotion Name"
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              value={desc}
              onChangeText={(text) => setDesc(text)}
              style={styles.textInput}
              placeholderTextColor={colors.white}
              placeholder="Description"
            />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Ionicons name={"attach"} size={40} color={colors.white} />
              <Text
                style={{
                  color: colors.white,
                  fontSize: 30,
                  marginTop: 10,
                  marginBottom: 30,
                }}
              >
                Add Image
              </Text>
            </View>
            {loader ? (
              <ActivityIndicator size="large" color={colors.white} />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => addPromotion()}
              >
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
          </View>
        </View>
      </View>
    </View>
  );
}
