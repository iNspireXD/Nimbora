import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors, fontSize } from "../constants/token";

type Props = {
  temp: number;
  dateTime: string;
  iconUri: string;
  wind: number;
  humidity: number;
  precipitation: number;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type WeathersDetailProp = {
  wind: number;
  humidity: number;
  precipitation: number;
};

const WeathersDetail = ({
  wind,
  humidity,
  precipitation,
}: WeathersDetailProp) => {
  return (
    <View
      style={{
        backgroundColor: colors.primary_red,
        marginHorizontal: 5,
        padding: 12,
        marginTop: -2,
        zIndex: -1,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.dateText}>Wind</Text>
        <Text style={styles.dateText}>{`${wind} km/h`}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.dateText}>Humidity</Text>
        <Text style={styles.dateText}>{`${humidity}%`}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.dateText}>Chance of precipitation</Text>
        <Text style={styles.dateText}>{`${precipitation}%`}</Text>
      </View>
    </View>
  );
};

const WeatherBox = ({
  temp,
  dateTime,
  iconUri,
  wind,
  humidity,
  precipitation,
}: Props) => {
  const [pressed, setPressed] = useState(false);

  function pressHandler() {
    setPressed(!pressed);
  }

  const [fulldate, time] = dateTime.split(" ");

  const d = new Date(fulldate);
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();

  return (
    <>
      <TouchableOpacity onPress={() => pressHandler()} style={styles.container}>
        <View style={styles.innerContainer}>
          {/* temp details and time view */}
          <View>
            <Text style={styles.tempText}>{`${temp}°C`}</Text>
            <Text style={styles.dateText}>{`${day}, ${date} ${month}`}</Text>
          </View>
          {time && <Text style={styles.timeText}>{time}</Text>}
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
      {pressed && (
        <WeathersDetail
          wind={wind}
          humidity={humidity}
          precipitation={precipitation}
        />
      )}
    </>
  );
};

export default WeatherBox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.primary_red,
    padding: 8,
    borderRadius: 8,
    marginTop: 5,
    elevation: 5,
    // borderColor: colors.background_dark,
    // borderWidth: 0.5,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  tempText: {
    fontFamily: "GlacialIndifference",
    fontSize: fontSize.lg,
    color: colors.background_cream,
  },
  dateText: {
    fontFamily: "MaiandraSD",
    fontSize: fontSize.xs,
    color: colors.background_cream,
  },
  weatherIconImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  timeText: {
    fontFamily: "GlacialIndifference",
    fontSize: 14,
    color: colors.background_cream,
  },
});
