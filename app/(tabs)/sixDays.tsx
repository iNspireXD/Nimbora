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
import { DailyWeatheData, HourlyData, WeatherData } from "../../types/types";
import { WeatherContext } from "../../store/context/weather-context";
import { FlashList } from "@shopify/flash-list";

type Props = {};

const SixDays = (props: Props) => {
  const weatherDataCtx = useContext(WeatherContext);
  const weatherForecast: WeatherData =
    weatherDataCtx?.locationData as WeatherData;

  const nextSixDaysForecast: DailyWeatheData[] = weatherForecast.forecast
    ?.forecastday as DailyWeatheData[];
  return (
    <View
      style={weatherDataCtx.fetching ? styles.loading : styles.mainContainer}
    >
      {weatherDataCtx.fetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlashList
          data={nextSixDaysForecast}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <WeatherBox
              temp={item?.day.avgtemp_c}
              dateTime={item?.date}
              iconUri={item?.day.condition.icon}
            />
          )}
        />
      )}
    </View>
  );
};

export default SixDays;

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
