import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../constants/Themes";

const { width, height } = Dimensions.get("window");

export default function WelcomePage({ navigation }) {
  return (
    <View style={{ backgroundColor: colors.primary }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{uri:'https://i.pinimg.com/564x/9f/9f/e6/9f9fe69eebcd03462913b049c3082767.jpg'}}
          style={{ height: height * 1.1, width:width/3.5 }}
        />
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          />
          <View
            style={{
              alignSelf: "center",
              width: width / 2,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                marginBottom: 20,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              {" "}
              QRiT{" "}
            </Text>
            <Text style={{ fontSize: 15, color: colors.white }}>
              {" "}
              Open An Account For Digital E-Point Solutions. Enjoy Using Points{" "}
            </Text>
            <Text style={{ marginTop: 20, fontSize: 15, color: colors.white }}>
              {" "}
              Join For Free{" "}
            </Text>
          </View>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, marginBottom: 30, color: colors.white }}
            >
              Sign In as
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signin",{name:'User'})}
              style={{ marginBottom: 10 }}
            >
              <View
                style={{
                  height: 50,
                  width: 180,
                  backgroundColor: colors.secondary2,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  User
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signin",{name:'Vendor'})}
              style={{ marginBottom: 30 }}
            >
              <View
                style={{
                  height: 50,
                  width: 180,
                  backgroundColor: colors.secondary2,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Vendor
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  Create an account
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
