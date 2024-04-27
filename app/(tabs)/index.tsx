import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, fontSize } from "../../constants/token";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/types";

type HomeScreenRouteProp = RouteProp<RootStackParamList, "today">;

const Home = () => {
  const route = useRoute<HomeScreenRouteProp>();
  return (
    <View
      style={{
        backgroundColor: colors.background_cream,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: fontSize.lg, color: colors.background_dark }}>
        {route.params?.time}
      </Text>
      <Text>{route.params?.condition}</Text>
      <Text>{route.params?.temp}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
