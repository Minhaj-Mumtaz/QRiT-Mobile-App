import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
  ScrollView,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Svg, { Circle, Path } from "react-native-svg";
import CarouselCard from "../../../constants/CarouselCard";
import MainCircle from "../../../constants/MainCircle";
import { colors } from "../../../constants/Themes";
import AuthService from "../../../service/AuthService";
import { config } from "../../../service/Config";

const { width, height } = Dimensions.get("window");

const CarouselItemHeight = height / 7;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  loader: {
    justifyContent: "center",
    alignSelf: "center",
    top: height / 2,
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

const images = {
  0: {
    imgUrl:
      "https://media.wired.com/photos/62855b1bb6cfd378a30c474a/4:3/w_1600%2Cc_limit/Build-Game-Watch-It-Die-Hyper-Scape-Games.jpg",
    title: "Lorem Ipsum data",
  },
  1: {
    imgUrl: "http://img1.igg.com/999/game/2020/07/15/030709_7102_min.png",
    title: "Lorem Ipsum data",
  },
  2: {
    imgUrl:
      "https://cdn-media-2.freecodecamp.org/w1280/5f9c9e6b740569d1a4ca3cfb.jpg",
    title: "Lorem Ipsum data",
  },
  3: {
    imgUrl:
      "https://media.wired.com/photos/62855b1bb6cfd378a30c474a/4:3/w_1600%2Cc_limit/Build-Game-Watch-It-Die-Hyper-Scape-Games.jpg",
    title: "Lorem Ipsum data",
  },
  4: {
    imgUrl:
      "https://cdn-media-2.freecodecamp.org/w1280/5f9c9e6b740569d1a4ca3cfb.jpg",
    title: "Lorem Ipsum data",
  },
};

// const data = Object.keys(images).map((i) => ({
//   key: i,
//   image: images[i].image,
//   desc: images[i].desc,
// }));

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Promotion({ navigation }) {
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };

  const [promotion, setPromotion] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getAuth = async () => {
    const token = await AuthService.getToken("token");
    config
      .get("/promotion/customer/all", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setPromotion(response.data.data);
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
  }, [refreshing]);

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    // return () => {
    //   BackHandler.exitApp();
    // };
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.topSection}>
        <Text style={styles.logo}>PROMOTIONS</Text>
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
          {promotion ? (
            promotion.length > 0 ? (
              promotion.map((p) => {
                return <CarouselCard key={p.id} item={p} />;
              })
            ) : (
              <View>
                <Text style={{ color: colors.white, fontWeight: "bold" }}>
                  No Promotions to Show
                </Text>
              </View>
            )
          ) : (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
