import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, fontSize } from "../constants/token";

type Props = {
  temp: string;
  dateTime: string;
  iconUri: string;
};

const WeatherBox = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerContainer}>
        {/* temp details and time view */}
        <View>
          <Text style={styles.tempText}>20^C</Text>
          <Text style={styles.dateText}>2024-04-28 00:00</Text>
        </View>
        <View>
          <Image
            style={styles.weatherIconImage}
            source={require("../assets/icons/sun.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherBox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.primary_red,
    padding: 8,
    borderRadius: 8,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  tempText: {
    fontSize: fontSize.lg,
    color: colors.background_cream,
  },
  dateText: {
    fontSize: fontSize.xs,
    color: colors.background_cream,
  },
  weatherIconImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
