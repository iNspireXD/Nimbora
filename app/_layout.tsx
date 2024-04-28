import { Stack } from "expo-router";

import { useFonts } from "expo-font";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    GlacialIndifference: require("../assets/fonts/GlacialIndifference.otf"),
    Maiandra: require("../assets/fonts/Maiandra.ttf"),
  });
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
