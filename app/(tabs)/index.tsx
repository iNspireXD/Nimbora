import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={
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
            {/* locatoin details */}
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

            {/* weather condition */}
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
                  weatherForecast?.current?.condition.text &&
                  weatherForecast.current.condition.text in weatherIcons
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
                  color: colors.background_dark,
                }}
              >
                {weatherForecast?.current?.condition.text}
              </Text>
            </View>

            {/* wether details */}
            <View
              style={{
                left: 0,
                bottom: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.tempText}>
                  {weatherForecast.current?.feelslike_c}
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 18,
                    fontFamily: "MaiandraSD",
                  }}
                >
                  °C
                </Text>
              </View>
              {/* wind,percipation ets */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 6,
                    backgroundColor: colors.primary_gray,
                    padding: 4,
                    borderRadius: 8,
                  }}
                >
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: "contain",
                      marginHorizontal: 4,
                    }}
                    source={require("../../assets/icons/wind.png")}
                  />
                  <Text
                    style={styles.otherDetailsText}
                  >{`${weatherForecast.current?.gust_kph} kph`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.primary_blue,
                    padding: 4,
                    borderRadius: 8,
                  }}
                >
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: "contain",
                      marginHorizontal: 4,
                    }}
                    source={require("../../assets/icons/drop.png")}
                  />
                  <Text
                    style={styles.otherDetailsText}
                  >{`${weatherForecast.current?.humidity}%`}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
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
    color: colors.background_dark,
    marginBottom: 24,
  },
  otherDetailsText: {
    fontFamily: "GlacialIndifference",
    fontSize: fontSize.xs,
    color: colors.background_dark,
  },
});
