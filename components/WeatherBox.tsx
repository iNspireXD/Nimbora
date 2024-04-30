import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, fontSize } from "../constants/token";

type Props = {
  temp: number;
  dateTime: string;
  iconUri: string;
};

const WeatherBox = ({ temp, dateTime, iconUri }: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerContainer}>
        {/* temp details and time view */}
        <View>
          <Text style={styles.tempText}>{`${temp}°C`}</Text>
          <Text style={styles.dateText}>{dateTime}</Text>
        </View>
        <View>
          <Image
            style={styles.weatherIconImage}
            source={
              iconUri
                ? { uri: `https:${iconUri}` }
                : {
                    uri: "https//cdn.weatherapi.com/weather/64x64/night/113.png",
                  }
            }
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
    backgroundColor: colors.background_dark_blue,
    padding: 8,
    borderRadius: 8,
    marginBottom: 5,
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
