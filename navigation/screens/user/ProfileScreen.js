import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from "react-native";
// import Carousel from "react-native-snap-carousel";
import Svg, { Circle, Path } from "react-native-svg";
import MainCircle from "../../../constants/MainCircle";
import { colors } from "../../../constants/Themes";
import AuthService from "../../../service/AuthService";
import { config } from "../../../service/Config";

const { width, height } = Dimensions.get("window");

const CarouselItemWidth = width / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  loader: {
    justifyContent: "center",
    alignSelf: "center",
    top: height / 2,
  },
  cardsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 100,
    padding: 20,
    width: width / 2,
    marginLeft: 20,
    alignItems: "flex-start",
    bottom: height / 5.5,
  },
  headerText: {
    color: colors.white,
    textShadowOffset: { width: -1, height: 3 },
    textShadowColor: colors.secondary2,
    shadowOpacity: 0.2,
    textShadowRadius: 5,
  },
  headerBarText: {
    top: 5,
    flexDirection: "row",
    zIndex: 90,
    justifyContent: "space-between",
    width: width / 1.2,
    position: "absolute",
    left: 30,
  },
  headerName: {
    top: 90,
    zIndex: 90,
    justifyContent: "center",
    width: width,
    position: "absolute",
  },
  cards: {
    height: 200,
    width: width,
    zIndex: 100,
    bottom: height / 5.5,
    padding: 20,
  },
  cards2View: {
    height: 110,
    width: 90,
    borderRadius: 10,
  },
  cards2: {
    shadowOffset: { width: 8, height: 8 },
    shadowColor: colors.secondary2,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 100,
    marginLeft: 20,
    left: 20,
  },
  cards2Pad: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cards2Font: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  shadows: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: colors.secondary2,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  bottom: {
    position: "absolute",
    zIndex: 50,
    width: width,
    bottom: 0,
  },
  box: {
    backgroundColor: colors.primary,
    height: height / 3,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: height / 2.2,
  },
});

const carouselItem = [
  {
    imgUrl:
      "https://media.wired.com/photos/62855b1bb6cfd378a30c474a/4:3/w_1600%2Cc_limit/Build-Game-Watch-It-Die-Hyper-Scape-Games.jpg",
    title: "Daraz",
  },
  {
    imgUrl: "http://img1.igg.com/999/game/2020/07/15/030709_7102_min.png",
    title: "Imtiaz",
  },
  {
    imgUrl:
      "https://media.wired.com/photos/62855b1bb6cfd378a30c474a/4:3/w_1600%2Cc_limit/Build-Game-Watch-It-Die-Hyper-Scape-Games.jpg",
    title: "Careem",
  },
];

const images = {
  0: {
    image:
      "https://media.wired.com/photos/62855b1bb6cfd378a30c474a/4:3/w_1600%2Cc_limit/Build-Game-Watch-It-Die-Hyper-Scape-Games.jpg",
    desc: "Lorem Ipsum data",
  },
  1: {
    image: "http://img1.igg.com/999/game/2020/07/15/030709_7102_min.png",
    desc: "Lorem Ipsum data",
  },
  2: {
    image:
      "https://cdn-media-2.freecodecamp.org/w1280/5f9c9e6b740569d1a4ca3cfb.jpg",
    desc: "Lorem Ipsum data",
  },
  3: {
    image:
      "https://media.wired.com/photos/62855b1bb6cfd378a30c474a/4:3/w_1600%2Cc_limit/Build-Game-Watch-It-Die-Hyper-Scape-Games.jpg",
    desc: "Lorem Ipsum data",
  },
  4: {
    image:
      "https://cdn-media-2.freecodecamp.org/w1280/5f9c9e6b740569d1a4ca3cfb.jpg",
    desc: "Lorem Ipsum data",
  },
};

const data = Object.keys(images).map((i) => ({
  key: i,
  image: images[i].image,
  desc: images[i].desc,
}));

const image = {
  uri: "https://media.istockphoto.com/photos/background-abstract-pink-and-black-dark-are-light-with-the-gradient-picture-id1279904166?k=20&m=1279904166&s=612x612&w=0&h=OoUfXiSlwOnUqW_7FF8dmiG6QvWRPLRQExdnWr-uDeY=",
};

export default function ProfileScreen({ navigation }) {
  const [isActive, setIsActive] = useState(false);
  const [points, setPoints] = useState();

  const getAuth = async () => {
    const token = await AuthService.getToken();
    const user_id = await AuthService.getUserId();
    config
      .get(`/reward/customer/${user_id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        AuthService.setAvailablePoints(
          JSON.stringify(response.data.availablePoints)
        );
        setPoints(response.data.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  useEffect(() => {
    getAuth();
  }, []);

  return (
    <View style={styles.container}>
      {!points ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      ) : (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={{ top: 150 }}>
            <MainCircle isVendor={false} navigation={navigation} />
          </View>
          <Svg width={width} height={height} style={{ zIndex: 86 }}>
            <Circle
              cx={width / 2}
              cy={height / 1.2}
              r={350}
              fill={colors.primary}
            />
          </Svg>
          <View style={styles.headerName}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text
                style={{ ...styles.headerText, fontSize: 25, marginBottom: 10 }}
              >
                Minhaj Mumtaz
              </Text>
              <Text style={{ ...styles.headerText, fontSize: 15 }}>
                Karachi, Pakistan
              </Text>
            </View>
          </View>

          {/*             Inner Circle  Start             */}

          <View style={styles.bottom}>
            <View style={styles.box} />
          </View>

          <View
            style={{
              bottom: height / 2,
              flexDirection: "row",
              zIndex: 90,
              justifyContent: "space-between",
              width: width / 1.2,
              position: "absolute",
              left: 40,
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text
                style={{ ...styles.headerText, fontSize: 25, marginBottom: 20 }}
              >
                {points.earnedPoints}
              </Text>
              <Text style={{ ...styles.headerText, fontSize: 20 }}>
                Points earned
              </Text>
            </View>

            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text
                style={{ ...styles.headerText, fontSize: 25, marginBottom: 20 }}
              >
                {points.spendPoints}
              </Text>
              <Text style={{ ...styles.headerText, fontSize: 20 }}>
                Points used
              </Text>
            </View>
          </View>

          {/*           ---- Start            */}
          {/* 
        <View style={{ zIndex: 90, bottom: height / 4, height:200 }}>
          <Carousel
            data={carouselItem}
            renderItem={CarouselCard}
            sliderWidth={width}
            sliderHeight={width}
            itemWidth={CarouselItemWidth}
          />
        </View> */}

          {/*           ---- End            */}

          {/*           Places Start            */}

          <View
            style={{
              height: 120,
              width: width / 1.5,
              backgroundColor: colors.secondary2,
              zIndex: 95,
              position: "absolute",
              top: height / 1.9,
              justifyContent: "center",
              right: 0,
            }}
          >
            <View style={{ marginLeft: 40 }}>
              <Text
                style={{
                  fontSize: 25,
                  color: colors.white,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                {points.availablePoints}
              </Text>
              <Text style={{ fontSize: 20, color: colors.white }}>
                Current points
              </Text>
            </View>
          </View>

          <View style={styles.cardsHeader}>
            <TouchableOpacity onPress={() => setIsActive(false)}>
              <Text style={{ ...styles.headerText, fontSize: 25 }}>Saved </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsActive(true)}>
              <Text style={{ ...styles.headerText, fontSize: 25 }}>
                Recommend{" "}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                height: 1,
                width: isActive ? 120 : 62,
                left: isActive ? 95 : 20,
                backgroundColor: colors.white,
                bottom: 10,
              }}
            />
          </View>

          {/*           Saved Places Start            */}

          <View style={styles.cards}>
            <Animated.FlatList
              data={data}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View style={[styles.cards2, styles.cards2View]}>
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={styles.cards2View}
                    />
                    <View style={styles.cards2Pad}>
                      <Text style={styles.cards2Font}>{item.desc}</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          {/*           Saved Places End            */}

          {/*           Places End            */}

          {/*           Inner Circle End            */}
        </ImageBackground>
      )}
    </View>
  );
}
