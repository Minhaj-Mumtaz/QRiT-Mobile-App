import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CarouselCard from "../../../constants/CarouselCard";
import { colors } from "../../../constants/Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
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
    height: "20%",
    paddingTop: 20,
  },
  bottomSection: {
    width: "100%",
    height: "80%",
    backgroundColor: colors.secondary2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default function Promotion({ navigation }) {
  const [promotions, setPromotions] = useState();
  const getAuth = async () => {
    const token = await AuthService.getToken("token");
    const user_id = await AuthService.getUserId();
    config
      .get(`/promotion/vendor/all/${user_id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setPromotions(response.data.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  useEffect(() => {
    getAuth();
    return () => {
      console.log("Dismount Promotion");
    };
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>Vendor Added{"\n"}Promotions</Text>
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
          {promotions ? (
            promotions.length > 0 ? (
              promotions.map((promotion, idx) => {
                return <CarouselCard key={idx} item={promotion} />;
              })
            ) : (
              <View>
                <Text style={{ color: colors.white, fontWeight: "bold" }}>
                  No Promotions
                </Text>
              </View>
            )
          ) : (
            <ActivityIndicator size="large" color={colors.white} />
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("AddPromotion")}>
          <Ionicons name={"add-circle-sharp"} size={80} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
