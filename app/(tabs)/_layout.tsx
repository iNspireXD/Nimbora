import { View, StyleSheet, Text } from "react-native";

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
import React, { useEffect, useState, useCallback } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useContext } from "react";
import { WeatherContext } from "../../store/context/weather-context";
import { Locations } from "../../types/types";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const API_KEY = "e33fc6720622469691d42100242804";

const Layout = () => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLocationName, setSearchLocationName] = useState("New Zealand");

  const debouncedSearch = useDebounce(search, 500);

  const locationSubmitHandler = (cityName: string): void => {
    setSearch("");
    setSearchLocationName(cityName);
  };

  const weatherDataCtx = useContext(WeatherContext);

  useEffect(() => {
    async function fetchForecastData() {
      if (searchLocationName) {
        weatherDataCtx?.setFetching(true);
        weatherDataCtx?.setLocationData([]);
        try {
          const forecastData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchLocationName}&days=2&aqi=no&alerts=no`
          ).then((res) => res.json());
          weatherDataCtx?.setLocationData(forecastData);
        } catch (error) {
          console.log(error);
        } finally {
          weatherDataCtx?.setFetching(false);
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
