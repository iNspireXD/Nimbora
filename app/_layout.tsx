import { Stack } from "expo-router";
import WeatherContexProvider from "../store/context/weather-context";

import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

const Layout = () => {
  let [fontsLoaded] = useFonts({
    GlacialIndifference: require("../assets/fonts/GlacialIndifference.otf"),
    MaiandraSD: require("../assets/fonts/Maiandra.otf"),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <WeatherContexProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </WeatherContexProvider>
  );
};

export default Layout;
