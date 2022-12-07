import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "./Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  profileFrame: {
    backgroundColor: colors.primary,
    height: 145,
    width: 145,
    borderRadius: 145 / 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
  profileFrameSetting: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: colors.secondary2,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 18,
  },
  profile: {
    // flex: 1,
    backgroundColor: colors.white,
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  profileSetting: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: colors.secondary2,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 18,
  },
  CircularButtonHolder: {
    flex: 1,
    backgroundColor: colors.white,
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 87,
  },
  circularButtonHolderSettings: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: colors.secondary2,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    right: width / 4.4,
    top: height / 6,
  },
  shadows: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: colors.secondary2,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 18,
  },
  bottom: {
    position: "absolute",
    zIndex: 50,
    width: width,
    bottom: 0,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: height / 2.5,
  },
  iconShadows: {
    textShadowColor: colors.secondary2,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
});

export default function MainCircle(props) {
  const { isVendor, navigation } = props;
  return (
    <>
      <View
        style={[
          styles.CircularButtonHolder,
          styles.circularButtonHolderSettings,
        ]}
      >
        <View style={[styles.profileFrame, styles.profileFrameSetting]}>
          <TouchableOpacity>
            <View style={[styles.profile, styles.profileSetting]}>
              <Image
                source={require("../assets/profile.jpg")}
                style={styles.profile}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isVendor ? (
        <View
          style={{
            zIndex: 100,
            top: height / 2.55,
            right: width / 2.2,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Review");
            }}
          >
            <MaterialCommunityIcons
              name="account-star-outline"
              size={35}
              color={colors.secondary2}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            zIndex: 100,
            top: height / 2.55,
            right: width / 2.2,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={35}
              color={colors.secondary2}
            />
          </TouchableOpacity>
        </View>
      )}

      {!isVendor && (
        <>
          <View
            style={{
              zIndex: 100,
              top: height / 3,
              right: width / 3.7,
              position: "absolute",
            }}
          >
            <TouchableOpacity disabled>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={35}
                color={colors.secondary2}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              zIndex: 100,
              top: height / 3,
              right: width / 1.6,
              position: "absolute",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("History");
              }}
            >
              {/* <Ionicons name="gift-outline" size={35} color={colors.secondary2} /> */}
              <MaterialIcons
                name="history"
                size={35}
                color={colors.secondary2}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              zIndex: 100,
              top: height / 4.25,
              right: width / 1.58,
              position: "absolute",
            }}
          >
            {/* <TouchableOpacity disabled>
              <Ionicons
                name="md-ribbon-outline"
                size={35}
                color={colors.secondary2}
              />
            </TouchableOpacity> */}
          </View>
        </>
      )}
    </>
  );
}
