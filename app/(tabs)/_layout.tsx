import { View, Text, StyleSheet, useAnimatedValue } from "react-native";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../constants/token";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { WeatherData } from "../../types/types";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const API_KEY = "e33fc6720622469691d42100242804";

export interface Locations {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

//temp data
const defaultData: WeatherData = {
  current: {
    cloud: 25,
    condition: {
      code: 1030,
      icon: "//cdn.weatherapi.com/weather/64x64/day/143.png",
      text: "Sunny",
    },
    feelslike_c: 23.8,
    feelslike_f: 74.8,
    gust_kph: 5.4,
    gust_mph: 3.4,
    humidity: 44,
    is_day: 1,
    last_updated: "2024-04-28 09:30",
    last_updated_epoch: 1714275900,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 29.94,
    pressure_mb: 1014,
    temp_c: 25,
    temp_f: 77,
    uv: 7,
    vis_km: 5,
    vis_miles: 3,
    wind_degree: 269,
    wind_dir: "W",
    wind_kph: 3.6,
    wind_mph: 2.2,
  },
  forecast: { forecastday: [[Object]] },
  location: {
    country: "Nepal",
    lat: 27.72,
    localtime: "2024-04-28 9:35",
    localtime_epoch: 1714276231,
    lon: 85.32,
    name: "Kathmandu",
    region: "",
    tz_id: "Asia/Kathmandu",
  },
};

const Layout = () => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLocationName, setSearchLocationName] = useState("");
  const [locationData, setLocationData] = useState<WeatherData | {}>(
    defaultData
  );
  const [fetching, setFetching] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const locationSubmitHandler = (cityName: string): void => {
    setSearchLocationName(cityName);
    console.log(cityName);
  };

  useEffect(() => {
    async function fetchForecastData() {
      if (searchLocationName !== "") {
        setFetching(true);
        setLocationData({});
        try {
          const forecastData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchLocationName}&days=2&aqi=no&alerts=no`
          ).then((res) => res.json());
          setLocationData(forecastData);
          console.log(forecastData);
        } catch (error) {
          console.log(error);
        } finally {
          setFetching(false);
        }
      }
    }
    fetchForecastData();
  }, [searchLocationName]);

  useEffect(() => {
    async function fetchData() {
      if (debouncedSearch !== "") {
        setLoading(true);
        setLocations([]);
        const data = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${debouncedSearch}`
        ).then((res) => res.json());
        setLocations(data);
        setLoading(false);
      } else setLocations([]);
    }
    fetchData();
  }, [debouncedSearch]);

  return (
    <SafeAreaProvider>
      <Header
        search={search}
        setSearch={setSearch}
        locations={locations}
        setLocations={setLocations}
        submitLocation={locationSubmitHandler}
      />
      <View style={styles.container}>
        <MaterialTopTabs
          screenOptions={{
            tabBarStyle: { backgroundColor: colors.background_cream },
            tabBarIndicatorStyle: {
              backgroundColor: "gray",
              height: 1,
            },
          }}
        >
          <MaterialTopTabs.Screen
            name="index"
            options={{
              title: "Today",
            }}
            initialParams={locationData}
          />
        </MaterialTopTabs>
      </View>
    </SafeAreaProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    backgroundColor: colors.background_cream,
  },
});
