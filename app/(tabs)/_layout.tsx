import { View, Text, StyleSheet } from "react-native";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors } from "../../constants/token";
import Header from "../../components/Header";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <SafeAreaProvider>
      <Header />
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
