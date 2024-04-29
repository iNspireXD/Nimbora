import { Stack } from "expo-router";
import WeatherContexProvider from "../store/context/weather-context";
import { useFonts } from "expo-font";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    "GlacialIndifference": require("../assets/fonts/GlacialIndifference.otf"),
    "MaiandraSD": require('../assets/fonts/Maiandra.otf')
  });
  return (
    <WeatherContexProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </WeatherContexProvider>
  );
};

export default Layout;
