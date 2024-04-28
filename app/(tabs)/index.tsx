import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, fontSize } from "../../constants/token";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/types";

type HomeScreenRouteProp = RouteProp<RootStackParamList, "locationData">;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Home = () => {
  const route = useRoute<HomeScreenRouteProp>();
  const [fulldate, time] = route.params?.location?.localtime.split(" ");

  const d = new Date(fulldate);
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();

  return (
    <View
      style={{
        backgroundColor: colors.background_cream,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 24,
          marginVertical: 24,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{ fontFamily: "GlacialIndifference" }}
          >{`${day}, ${date} ${month}`}</Text>
          <Text
            style={{
              fontSize: 32,
              color: colors.background_dark,
              fontFamily: "Maiandra",
            }}
          >
            {route.params?.location.name}
          </Text>
          <Text style={{ fontFamily: "GlacialIndifference" }}>
            {route.params?.location.country}
          </Text>
        </View>
        <Text
          style={{
            transform: [{ rotate: "90deg" }],
            fontSize: 30,
            fontFamily: "Maiandra",
          }}
        >
          {route.params?.current.condition.text}
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
