import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { colors, fontSize } from "../../constants/token";
import WeatherBox from "../../components/WeatherBox";
import { HourlyData, WeatherData } from "../../types/types";
import { WeatherContext } from "../../store/context/weather-context";
import { FlashList } from "@shopify/flash-list";

type Props = {};

const Hourly = (props: Props) => {
  const weatherDataCtx = useContext(WeatherContext);
  const weatherForecast: WeatherData =
    weatherDataCtx?.locationData as WeatherData;

  const hourlyDetails: HourlyData = weatherForecast.forecast
    ?.forecastday[0] as HourlyData;

  return (
    <View
      style={weatherDataCtx.fetching ? styles.loading : styles.mainContainer}
    >
      {weatherDataCtx.fetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlashList
          data={hourlyDetails?.hour}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={50}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WeatherBox
              temp={item.feelslike_c}
              dateTime={item.time}
              iconUri={item.condition.icon}
              wind={item.wind_kph}
              humidity={item.humidity}
              precipitation={item.precip_mm}
            />
          )}
        />
      )}
    </View>
  );
};

export default Hourly;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background_cream,
    padding: 12,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background_cream,
  },
});
