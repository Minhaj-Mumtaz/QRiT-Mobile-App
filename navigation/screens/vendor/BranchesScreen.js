import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  RefreshControl,
} from "react-native";
import { colors } from "../../../constants/Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { config } from "../../../service/Config";
import AuthService from "../../../service/AuthService";

const { width, height } = Dimensions.get("window");

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

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

export default function BranchesScreen({ navigation }) {
  const [vendorDetails, setVendorDetails] = useState();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getAuth = async () => {
    const token = await AuthService.getToken();
    const user_id = await AuthService.getUserId();
    config
      .get(`/user/vendor/branches/${user_id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setVendorDetails(response.data.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  useEffect(() => {
    getAuth();
  }, [refreshing]);

  return (
    <View style={styles.body}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>All Branches</Text>
      </View>

      <ScrollView
        style={styles.bottomSection}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
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
            <View>
              {vendorDetails &&
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
                })}
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("AddBranch")}>
          <Ionicons name={"add-circle-sharp"} size={80} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
