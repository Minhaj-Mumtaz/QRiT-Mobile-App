import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { colors } from "../../../constants/Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { config } from "../../../service/Config";
import AuthService from "../../../service/AuthService";
import StarReview from "react-native-star-review";

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

export default function ReviewScreen({ navigation }) {
  const [reviews, setReviews] = useState();
  const [allReviews, setAllReviews] = useState();
  const [totalReview, setTotalReview] = useState();

  const getAuth = async () => {
    const token = await AuthService.getToken("token");
    const user_id = await AuthService.getUserId();
    config
      .get(`/user/vendor/reviews/${user_id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setReviews(response.data.review_history);
        const initialValue = 0;
        const total = response.data.review_history.length * 5;
        const sumWithInitial = response.data.review_history
          .flatMap((f) => f.rate)
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
          );
        setTotalReview(response.data.review_history.length);
        const averageReview = (sumWithInitial * 5) / total;
        setAllReviews(averageReview);
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
        <Text style={styles.logo}>Review History</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("MainVendor")}>
              <Feather size={50} color={colors.white} name="chevron-left" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "80%", marginBottom: 20 }}>
            <View style={{ flexDirection: "row" }}>
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
              {allReviews && totalReview && (
                <View style={{ marginLeft: 30, marginTop: 15 }}>
                  <Text style={{ color: colors.white }}>Total Reviews</Text>
                  <StarReview
                    ratings={allReviews}
                    stars={5}
                    reviews={totalReview}
                    textColor={colors.white}
                  />
                </View>
              )}
            </View>
            <View>
              {reviews &&
                reviews.map((review) => {
                  return (
                    <View
                      key={review.id}
                      style={{
                        height: height / 3,
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
                          Shopping ID
                        </Text>
                        <Text style={{ fontSize: 18, color: colors.white }}>
                          {review.shopping_id}
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
                          Rating
                        </Text>
                        <View style={{ alignSelf: "flex-start" }}>
                          <StarReview
                            ratings={review.rate}
                            stars={5}
                            disableReview
                          />
                        </View>
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
                          Comments
                        </Text>
                        <Text style={{ fontSize: 18, color: colors.white }}>
                          {review.description}
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
                          Review Date
                        </Text>
                        <Text style={{ fontSize: 18, color: colors.white }}>
                          {new Date(review.review_date).toDateString()}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
