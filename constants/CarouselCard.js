import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { colors } from "./Themes";

const { width, height } = Dimensions.get("window");

const CarouselItemWidth = width / 1.2;

const styles = StyleSheet.create({
  cardCarousel: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    // alignItems:'center',
    marginTop: 10,
    width: CarouselItemWidth,
    height: 320,
  },
  carouselImage: {
    height: 250,
    borderRadius: 20,
    zIndex: 2,
  },
  shadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: colors.secondary2,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  carouselImageView: {
    // width: CarouselItemWidth,
    backgroundColor: "transparent",
    height: 255,
    zIndex: 1,
    borderRadius: 20,
  },
  descText: {
    fontSize: 20,
    padding: 15,
    color: colors.primary,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  descStyle: {
    backgroundColor: colors.white,
    // height: 50,
    width: CarouselItemWidth / 1.1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
});

export default function CarouselCard({ item }) {
  return (
    <View style={styles.cardCarousel}>
      <View style={[styles.shadow, styles.carouselImageView]}>
        <Image
          style={styles.carouselImage}
          source={{
            uri:
              item.picture !== null
                ? item.picture
                : "http://img1.igg.com/999/game/2020/07/15/030709_7102_min.png",
          }}
        />
      </View>
      <View style={[styles.shadow, styles.descStyle]}>
        <Text style={styles.descText}>{item.description}</Text>
      </View>
    </View>
  );
}
