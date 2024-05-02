import { SplashScreen, Stack } from "expo-router";
import WeatherContexProvider from "../store/context/weather-context";

import { useFonts } from "expo-font";
import { View, Image } from "react-native";

const Layout = () => {
  let [fontsLoaded] = useFonts({
    GlacialIndifference: require("../assets/fonts/GlacialIndifference.otf"),
    MaiandraSD: require("../assets/fonts/Maiandra.otf"),
  });
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eae5ca",
        }}
      >
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={require("../assets/icons/sunny.png")}
        />
      </View>
    );
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
