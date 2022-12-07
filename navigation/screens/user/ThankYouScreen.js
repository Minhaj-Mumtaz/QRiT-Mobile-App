import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../constants/Themes";
// import Animated from "react-native-reanimated";
// import Consta

const CIRCLE_SIZE = 100;
const inputRange = [0, 0.001, 0.5, 0.501, 1];
const Circle = ({ onPress, animatedValue, enabled }) => {
  const containerBG = animatedValue.interpolate({
    inputRange,
    outputRange: [
      colors.primary,
      colors.primary,
      colors.primary,
      colors.secondary,
      colors.secondary,
    ],
  });
  const circleBG = animatedValue.interpolate({
    inputRange,
    outputRange: [
      colors.secondary,
      colors.secondary,
      colors.secondary,
      colors.primary,
      colors.primary,
    ],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        { backgroundColor: containerBG },
      ]}
    >
      <Text
        style={{
          color: colors.white,
          fontSize: 40,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Thank You For Shopping !
      </Text>

      <Animated.View style={{ padding: 20 }}>
        <Text style={{ color: "white", fontSize: 20 }}>
          {enabled ? "" : "Bless"}
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBG,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}
      >
        {!enabled && (
          <TouchableOpacity onPress={onPress}>
            <View style={[styles.circle, styles.circleButton]}>
              <Ionicons name="checkmark" size={28} color={"white"} />
            </View>
          </TouchableOpacity>
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default function ThankYouScreen(props) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    });
  const [index, setIndex] = React.useState(0);
  const onPress = () => {
    setTimeout(() => {
      props.navigation.navigate("Profile");
    }, 1000);
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <Circle onPress={onPress} animatedValue={animatedValue} enabled={index} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: "center",
    fontFamily: "Menlo",
    color: "white",
  },
  circleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
    padding: 8,
    backgroundColor: colors.primary,
  },
  circleButton: {
    // height: 100,
    // width: 100,
    // borderRadius: 50,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: colors.secondary,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
});
