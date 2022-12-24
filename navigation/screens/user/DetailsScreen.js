import * as React from "react";
import {
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { colors as cl } from "../../../constants/Themes";
import AuthService from "../../../service/AuthService";
import { config } from "../../../service/Config";

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = {
  yellow: cl.primary,
  dark: cl.secondary2,
  white: cl.white,
};
const { width, height } = Dimensions.get("window");

// const Icon = React.memo(({ icon, color }) => {
//   // return <SimpleLineIcons name={icon} color={color} size={ICON_SIZE} />;
//   return <Image source={{ uri: icon }} style={{ height: 50, width: 50 }} />;
// });

// const Item = React.memo(({ user_name, color, vendor_name, showText }) => {
//   // alert(vendor_name)
//   return (
//     <View style={styles.itemWrapper}>
//       {showText ? (
//         <Text style={[styles.itemText, { color }]}>{vendor_name}</Text>
//       ) : (
//         <View />
//       )}
//       <Text style={[styles.itemText, { color }]}>{user_name}</Text>
//       {/* {!user_name ? (
//         <Text style={[styles.itemText, { color }]}>{user_name}</Text>
//       ) : (
//         <Icon
//           icon={
//             "https://www.awamiweb.com/wp-content/uploads/2017/11/spar-600x403.jpg"
//           }
//           color={color}
//         />
//       )} */}
//     </View>
//   );
// });

// const ConnectWithText = React.memo(() => {
//   return (

//   );
// });

// const ConnectButton = React.memo(({ onPress }) => {
//   return (
//     <View
//       style={{
//         position: "absolute",
//         top: height / 2 + ITEM_HEIGHT / 2,
//         paddingHorizontal: 14,
//       }}
//     >
//       <View
//         style={{
//           height: ITEM_HEIGHT * 2,
//           width: 4,
//           backgroundColor: colors.yellow,
//         }}
//       />
//       <TouchableOpacity
//         onPress={onPress}
//         style={{
//           paddingVertical: 10,
//           paddingHorizontal: 12,
//           backgroundColor: colors.yellow,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//         activeOpacity={0.8}
//       >
//         <Text style={{ fontSize: 32, fontWeight: "800", color: colors.white }}>
//           Done!
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// });

// const List = React.memo(
//   React.forwardRef(
//     ({ color, showText, style, onScroll, onItemIndexChange, data }, ref) => {
//       return (
//         <Animated.FlatList
//           ref={ref}
//           data={data}
//           style={style}
//           keyExtractor={(item) => `${item.id}`}
//           bounces={false}
//           scrollEnabled={!showText}
//           scrollEventThrottle={16}
//           onScroll={onScroll}
//           decelerationRate="fast"
//           snapToInterval={ITEM_HEIGHT}
//           showsVerticalScrollIndicator={false}
//           renderToHardwareTextureAndroid
//           contentContainerStyle={{
//             paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
//             paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
//             paddingHorizontal: 20,
//           }}
//           renderItem={({ item }) => {
//             return <Item {...item} color={color} showText={showText} />;
//           }}
//           onMomentumScrollEnd={(ev) => {
//             const newIndex = Math.round(
//               ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
//             );

//             if (onItemIndexChange) {
//               onItemIndexChange(newIndex);
//             }
//           }}
//         />
//       );
//     }
//   )
// );
export default function DetailsScreen({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [vendors, setVendors] = React.useState();

  const getAuth = async () => {
    const token = await AuthService.getToken("token");
    config
      .get("/user/vendor/all", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setVendors(response.data.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };
  React.useEffect(() => {
    getAuth();
  }, []);

  const onConnectPress = (name, id) => {
    navigation.navigate("VendorDetail", {
      name: name,
      id: id,
    });
  };
  // const yellowRef = React.useRef();
  // const darkRef = React.useRef();
  // const scrollY = React.useRef(new Animated.Value(0)).current;
  // const onScroll = Animated.event(
  //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
  //   { useNativeDriver: true }
  // );
  // const onItemIndexChange = React.useCallback(setIndex, []);
  // React.useEffect(() => {
  //   scrollY.addListener((v) => {
  //     if (darkRef?.current) {
  //       darkRef.current.scrollToOffset({
  //         offset: v.value,
  //         animated: false,
  //       });
  //     }
  //   });
  // });

  return (
    <View style={styles.container}>
      {vendors && (
        <>
          {/* <StatusBar hidden /> */}
          <View
            style={{
              // position: "absolute",
              // top: -(height / 3),
              marginTop: ICON_SIZE * 2,
              width: width * 0.7,
              paddingHorizontal: 14,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 52,
                fontWeight: "700",
                lineHeight: 52,
              }}
            >
              Available...
            </Text>
          </View>
          <ScrollView>
            <View style={{ marginTop: ICON_SIZE }} />
            {vendors.map((vendor, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onConnectPress(vendor.vendor_name, vendor.id)}
              >
                <View
                  key={idx}
                  style={{
                    backgroundColor: colors.yellow,
                    marginTop: 6,
                    height: ITEM_HEIGHT,
                    width: width / 1.1,
                    alignSelf: "center",
                    borderRadius: 20,
                  }}
                >
                  <View
                    style={{
                      ...styles.itemWrapper,
                      // backgroundColor: colors.yellow,
                      marginTop: 6,
                      height: ITEM_HEIGHT,
                      width: width / 1.1,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: `${vendor.picture
                          ? vendor.picture
                          : "http://img1.igg.com/999/game/2020/07/15/030709_7102_min.png"
                          }`,
                      }}
                      style={styles.cards2View}
                    />
                    <View style={{ padding: 10, paddingLeft: 20 }}>
                      <Text style={styles.itemText}>{vendor.vendor_name}</Text>
                      <Text style={styles.itemSmText}>{vendor.user_name}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: colors.dark,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemWrapper: {
    flexDirection: "row",
    paddingLeft: 10,
    // justifyContent: "space-between",
    alignItems: "flex-start",
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.white,
    textTransform: "capitalize",
  },
  itemSmText: {
    fontSize: 16,
    // fontWeight: "800",
    color: colors.white,
  },
  cards2View: {
    height: ITEM_HEIGHT / 1.3,
    width: 90,
    borderRadius: 10,
  },
});
