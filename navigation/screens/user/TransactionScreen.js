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
import { colors } from "../../../constants/Themes";
import AuthService from "../../../service/AuthService";
import { config } from "../../../service/Config";
import StarRating from "react-native-star-rating";

const TransactionScreen = ({ navigation, route }) => {
  const [overlay, setOverlay] = useState(false);
  const [OverlayText, setOverlayText] = useState("");
  const [popUpErr, setpopUpErr] = useState(false);
  const [points, setPoints] = useState("");
  const [availablePoints, setAvailablePoints] = useState(0);
  const [starRating, setStarRating] = useState(4);
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    const user_id = await AuthService.getUserId();
    const token = await AuthService.getToken();
    const requestBody = {
      spend_reward: points,
      customer_id: user_id,
      id: data.id,
      shop_price: data.shop_price,
    };

    config
      .put(`shopping/qr`, requestBody, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          showErr(true, true, "Network Issue");
        } else {
          setLoader(false);
          navigation.navigate("ThankYou");
        }
      })
      .catch((error) => {
        showErr(true, true, `${error.response.data.message}`);
      });

    // navigation.navigate("ThankYou");
  };

  const validate = () => {
    console.log("points", points);
    if (points == "") {
      showErr(true, true, "Please enter your Points");
    } else if (parseInt(points) > availablePoints) {
      showErr(true, true, "Amount Exceed available Points");
    } else {
      setOverlay(false);
      setLoader(true);
      handleSubmit();
    }
  };

  const getShoppingData = async () => {
    const token = await AuthService.getToken();
    const availablePoints = await AuthService.getAvailablePoints();
    setAvailablePoints(availablePoints);
    config
      .get(`shopping/qr/${route.params.id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          showErr(true, true, "Network Issue");
        } else {
          setData(response.data.data[0]);
          setLoader(false);
        }
      })
      .catch((error) => {
        showErr(true, true, `${error.response.data.message}`);
      });
  };

  useEffect(() => {
    console.log(popUpErr);
  }, [popUpErr]);

  useEffect(() => {
    getShoppingData();
  }, []);

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
          <Text style={styles.logo}>Transaction</Text>
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
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Feather size={50} color={colors.primary} name="chevron-left" />
              </TouchableOpacity>
            </View>
            {data && (
              <View style={{ width: "80%", marginBottom: 20 }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 40,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  Total Shopping
                </Text>

                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  Rs. {data.shop_price}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 40,
                    color: colors.white,
                  }}
                >
                  Available Points: {availablePoints}
                </Text>
                <TextInput
                  value={points}
                  keyboardType={"number-pad"}
                  onChangeText={(text) => setPoints(text)}
                  style={{ ...styles.textInput, marginTop: 10 }}
                  placeholderTextColor={colors.white}
                  placeholder="Enter Points"
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 40,
                    color: colors.white,
                  }}
                >
                  Rate Us Please!
                </Text>
                <View style={{ alignSelf: "flex-start", marginTop: 20 }}>
                  <StarRating
                    maxStars={5}
                    rating={starRating}
                    fullStarColor={"#ffa114"}
                    selectedStar={(rating) => setStarRating(rating)}
                  />
                  {/* <StarReview ratings={4} stars={5} disableReview starSize={22} /> */}
                </View>
              </View>
            )}
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
                      Submit
                    </Text>
                  </View>
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
              {OverlayText}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default TransactionScreen;
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
