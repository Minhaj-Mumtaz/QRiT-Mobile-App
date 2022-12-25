import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import MainCircle from "../../../constants/MainCircle";
import { colors } from "../../../constants/Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { config } from "../../../service/Config";
import AuthService from "../../../service/AuthService";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  cardsHeader: {
    // flexDirection: "row",
    // justifyContent: "space-between",
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
    fontSize: 25,
  },
  deailsText: {
    color: colors.white,
    fontSize: 15,
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
  titleFontSize: {
    fontSize: 25,
  },
  logoutBtn: {
    position: "absolute",
    width: width / 4,
    height: 40,
    borderRadius: 10,
    bottom: 5,
    zIndex: 101,
    alignSelf: "center",
    alignItems: "center",
  },
  logoutBtnAlign: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  const [vendorInfo, setVendorInfo] = useState();
  const [countOfBranches, setCountOfBranches] = useState(0);
  const [points, setPoints] = useState();

  const getAuth = async () => {
    const token = await AuthService.getToken();
    const user_id = await AuthService.getUserId();
    config
      .get(`/user/vendor/detail/${user_id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setVendorInfo(response.data.data[0]);
        setCountOfBranches(response.data.data.length);
      })
      .catch((error) => {
        console.log("error:", error.response.data.message);
      });
  };
  const getPoints = async () => {
    const token = await AuthService.getToken();
    const user_id = await AuthService.getUserId();
    config
      .get(`/reward/vendor/points/${user_id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setPoints(response.data);
      })
      .catch((error) => {
        console.log("error:", error.response.data.message);
      });
  };
  useEffect(() => {
    getAuth();
    getPoints();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {vendorInfo && (
          <>
            <View style={{ top: 120 }}>
              <MainCircle isVendor={true} navigation={navigation} />
            </View>
            <Svg width={width} height={height} style={{ zIndex: 86 }}>
              <Circle
                cx={width / 2}
                cy={height / 1.2}
                r={350}
                fill={colors.primary}
              />
            </Svg>
            <View style={styles.bottom}>
              <View style={styles.box} />
            </View>
            <View
              style={{
                bottom: height / 1.8,
                flexDirection: "row",
                zIndex: 90,
                justifyContent: "space-between",
                width: width / 1.2,
                position: "absolute",
                left: 20,
              }}
            >
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={{ ...styles.headerText, marginBottom: 20 }}>
                  {points ? points.points_given_total : 0}
                </Text>
                <Text style={{ ...styles.headerText, fontSize: 20 }}>
                  Total Points distributed
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 40 }} />
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
                    ...styles.titleFontSize,
                    color: colors.white,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  {points && points.points_given_today
                    ? points.points_given_today
                    : 0}
                </Text>
                <Text style={{ fontSize: 20, color: colors.white }}>
                  Points Distributed Today
                </Text>
              </View>
            </View>
            <View style={styles.cardsHeader}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerText}>Vendor Details</Text>
                {/* <Ionicons
                    name={"pencil-outline"}
                    size={20}
                    style={{ marginTop: 6 }}
                    color={colors.white}
                  /> */}
              </View>
              <View style={{ marginBottom: 20 }} />
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: width / 1.5,
                  marginBottom: 15,
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={styles.deailsText}>Vendor Name</Text>
                </View>
                <View style={{ width: "90%" }}>
                  <Text style={styles.deailsText}>
                    {vendorInfo.vendor_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: width / 1.5,
                  marginBottom: 15,
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={styles.deailsText}>Vendor Email</Text>
                </View>
                <View style={{ width: "90%" }}>
                  <Text style={styles.deailsText}>{vendorInfo.email}</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: width / 1.5,
                  marginBottom: 15,
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={styles.deailsText}>NIC No. </Text>
                </View>
                <View style={{ width: "90%" }}>
                  <Text style={styles.deailsText}>{vendorInfo.nic_no}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: width / 1.5,
                  marginBottom: 15,
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={styles.deailsText}>Registration Number</Text>
                </View>
                <View style={{ width: "90%" }}>
                  <Text style={styles.deailsText}>
                    {vendorInfo.registration_no}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: width / 1.5,
                  marginBottom: 15,
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={styles.deailsText}>Number of Branches</Text>
                </View>
                <View style={{ width: "90%" }}>
                  <Text style={styles.deailsText}>{countOfBranches}</Text>
                </View>
              </View>
            </View>
            <View style={styles.logoutBtn}>
              <TouchableOpacity
                style={[styles.logoutBtn, styles.logoutBtnAlign]}
                onPress={() => {
                  navigation.navigate("Welcome");
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: colors.white,
                    fontWeight: "bold",
                  }}
                >
                  Logout
                </Text>
                <Ionicons
                  name={"exit-outline"}
                  size={25}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}
