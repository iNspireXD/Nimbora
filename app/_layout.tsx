import { Stack } from "expo-router";
import WeatherContexProvider from "../store/context/weather-context";

const Layout = () => {
  return (
    <WeatherContexProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </WeatherContexProvider>
  );
};

export default Layout;
