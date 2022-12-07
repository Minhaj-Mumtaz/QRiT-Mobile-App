import React, { forwardRef, useEffect, useRef, useState } from "react";
import { findNodeHandle, View, Text, Animated, Dimensions } from "react-native";
import { colors } from "./Themes";

const { width, height } = Dimensions.get("window");

const Tab = forwardRef(({ item }, ref) => {
  return (
    <View ref={ref}>
      <Text
        style={{
          color: colors.white,
          fontSize: 20,
          textTransform: "uppercase",
        }}
      >
        {item.title}
      </Text>
    </View>
  );
});

const Indicator = ({ measures }) => {
//   const inputRange = data.map((_, i) => i * width);
//   const indicatorWidth = scrollX.interpolate({
//     inputRange,
//     outputRange: measures.map((measure) => measure.width),
//   });
  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        width: measures[0].width,
        left: measures[0].x,
        backgroundColor: colors.white,
        bottom: -10,
        transform:[{
            translateX,
        }]
      }}
    />
  );
};

const Tabs = ({ data }) => {
  const [measures, setmeasures] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    const m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });

          if (m.length === data.length) {
            setmeasures(m);
          }
        }
      );
    });
  }, []);
  return (
    <View style={{ position: "absolute", top: 100, width }}>
      <View
        style={{
          justifyContent: "space-evenly",
          flex: 1,
          flexDirection: "row",
        }}
      >
        {data.map((item) => {
          return <Tab key={item.key} item={item} ref={item.ref} />;
        })}
        {measures.length > 0 && (
          <Indicator measures={measures} />
        )}
      </View>
    </View>
  );
};

export default Tabs;
