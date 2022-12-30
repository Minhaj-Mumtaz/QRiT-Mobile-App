import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { colors } from "../../../constants/Themes";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  qrHeader: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 20,
    color: "white",
  },
  maintext: {
    fontSize: 20,
    margin: 20,
    color: "white",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: height / 2,
    width: width,
    overflow: "hidden",
    backgroundColor: colors.secondary,
  },
});

export default function QRScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not Yet Scanned");

  const askForCamPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const generated = JSON.parse(data);
    console.log("Type: " + type + "\nData: " + data);
    navigation.replace("Transaction", { id: generated.id });
  };

  useEffect(() => {
    askForCamPermission();
    return () => {
      console.log("scanned");
      setScanned(false);
    };
  }, []);

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: colors.secondary, borderRadius: 6 }}>
        <Text style={styles.qrHeader}>Scan To Collect Points</Text>
      </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: height, width: width }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      <Text style={styles.maintext}></Text>

      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)}>
          <View
            style={{
              height: 70,
              width: 200,
              backgroundColor: colors.secondary,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ ...styles.maintext, color: "white" }}>
              Scan Again ?
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
