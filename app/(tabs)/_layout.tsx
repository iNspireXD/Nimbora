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
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const API_KEY = "5bb145af4cf5476d8f062421242404";

export interface Locations {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

const Layout = () => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLocationName, setSearchLocationName] = useState("");
  const [locationData, setLocationData] = useState();
  const [fetching, setFetching] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const locationSubmitHandler = (cityName: string): void => {
    setSearchLocationName(cityName);
    console.log(cityName);
  };

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
            initialParams={{
              temp: "20°C",
              time: "12:45 AM",
              condition: "Sunny",
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
