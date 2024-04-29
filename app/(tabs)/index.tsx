import { StyleSheet, Text, View } from "react-native";
import { colors, fontSize } from "../../constants/token";
import { WeatherData } from "../../types/types";
import { useContext } from "react";
import { WeatherContext } from "../../store/context/weather-context";

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

const Home = () => {
  const weatherDataCtx = useContext(WeatherContext);

  const weatherForecast: WeatherData =
    weatherDataCtx?.locationData as WeatherData;

  const [fulldate, time] = weatherForecast.location.localtime.split("");

  const d = new Date(fulldate);
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();

  return (
    <View
      style={{
        backgroundColor: colors.background_cream,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 24,
          marginVertical: 24,
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
              fontFamily: "Maiandra",
            }}
          >
            {weatherForecast.location.name}
          </Text>
          <Text style={{ fontFamily: "GlacialIndifference" }}>
            {weatherForecast.location.country}
          </Text>
        </View>
        <Text
          style={{
            transform: [{ rotate: "90deg" }],
            fontSize: 30,
            fontFamily: "Maiandra",
          }}
        >
          {weatherForecast.current.condition.text}
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
