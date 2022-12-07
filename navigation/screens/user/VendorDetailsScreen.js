import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../constants/Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { config } from "../../../service/Config";
import AuthService from "../../../service/AuthService";

const { width, height } = Dimensions.get("window");

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

export default function VendorDetailsScreen({ navigation, route }) {
  const [vendorDetails, setVendorDetails] = useState();
  const [loader, setLoader] = useState(false);

  const getAuth = async () => {
    setLoader(true);
    const token = await AuthService.getToken("token");
    config
      .get(`/user/vendor/branches/${route.params.id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setVendorDetails(response.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  useEffect(() => {
    getAuth();
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>Vendor{"\n"}Details</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("Vendors")}>
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
              {route.params.name} Branches
            </Text>
            {loader ? (
              <ActivityIndicator size="large" color={colors.white} />
            ) : (
              <View>
                {vendorDetails &&
                  (vendorDetails.length === 0 ? (
                    <View>
                      <Text style={{ color: colors.white, fontWeight: "bold" }}>
                        No Branches
                      </Text>
                    </View>
                  ) : (
                    vendorDetails.map((vendor) => {
                      return (
                        <View
                          key={vendor.id}
                          style={{
                            height: height / 4,
                            width: width / 1.2,
                            borderRadius: 25,
                            marginTop: 20,
                            backgroundColor: colors.primary,
                            justifyContent: "center",
                          }}
                        >
                          <View style={{ marginLeft: 40, marginTop: 10 }}>
                            <Text
                              style={{
                                fontSize: 22,
                                color: colors.white,
                                fontWeight: "bold",
                                marginBottom: 5,
                              }}
                            >
                              Email
                            </Text>
                            <Text style={{ fontSize: 18, color: colors.white }}>
                              {vendor.email}
                            </Text>
                          </View>
                          <View style={{ marginLeft: 40, marginTop: 10 }}>
                            <Text
                              style={{
                                fontSize: 22,
                                color: colors.white,
                                fontWeight: "bold",
                                marginBottom: 5,
                              }}
                            >
                              Branch Address
                            </Text>
                            <Text style={{ fontSize: 18, color: colors.white }}>
                              {vendor.address}
                            </Text>
                          </View>
                          <View style={{ marginLeft: 40, marginTop: 10 }}>
                            <Text
                              style={{
                                fontSize: 22,
                                color: colors.white,
                                fontWeight: "bold",
                                marginBottom: 5,
                              }}
                            >
                              Branch Number
                            </Text>
                            <Text style={{ fontSize: 18, color: colors.white }}>
                              {vendor.phone_no}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
