import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { colors, fontSize } from "../../constants/token";
import { WeatherData } from "../../types/types";
import { useContext } from "react";
import { WeatherContext } from "../../store/context/weather-context";
import LottieView from "lottie-react-native";
import { weatherIcons } from "../../constants/icon";

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

const { height, width } = Dimensions.get("screen");

const Home = () => {
  const weatherDataCtx = useContext(WeatherContext);

  const weatherForecast: WeatherData =
    weatherDataCtx?.locationData as WeatherData;
  const dateTimeString = weatherForecast.location?.localtime;
  let fulldate: string = "";
  if (dateTimeString) {
    [fulldate] = dateTimeString.split(" ");
  }
  const d = new Date(fulldate);
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();

  return (
    <ScrollView
      contentContainerStyle={
        weatherDataCtx?.fetching
          ? {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.background_cream,
            }
          : {
              backgroundColor: colors.background_cream,
              flex: 1,
              justifyContent: "space-between",
              padding: 6,
            }
      }
    >
      {weatherDataCtx?.fetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 10,
              marginTop: 24,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ fontFamily: "GlacialIndifference" }}
              >{`${day}, ${date} ${month}`}</Text>
              <Text
                style={{
                  fontSize: 32,
                  color: colors.background_dark,
                  fontFamily: "MaiandraSD",
                }}
              >
                {weatherForecast?.location?.name}
              </Text>
              <Text style={{ fontFamily: "GlacialIndifference" }}>
                {weatherForecast?.location?.country}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              autoPlay
              style={{
                width: width * 0.95,
                height: width * 0.95,
              }}
              source={
                weatherForecast?.current?.condition.text
                  ? weatherIcons[
                      weatherForecast.current.condition
                        .text as keyof typeof weatherIcons
                    ]
                  : require("../../assets/anim/cloudy.json")
              }
            />
            <Text
              style={{
                fontSize: 30,
                fontFamily: "MaiandraSD",
              }}
            >
              {weatherForecast?.current?.condition.text}
            </Text>
          </View>

          <View
            style={{
              left: 0,
              bottom: 0,
              flexDirection: "row",
            }}
          >
            <Text style={styles.tempText}>
              {weatherForecast.current?.feelslike_c}
            </Text>
            <Text
              style={{ marginTop: 6, fontSize: 18, fontFamily: "MaiandraSD" }}
            >
              °C
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  tempText: {
    fontSize: 60,
    fontWeight: "normal",
    fontFamily: "GlacialIndifference",
    marginLeft: 10,
    marginBottom: 24,
  },
});
