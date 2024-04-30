import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors, fontSize } from "../../constants/token";
import WeatherBox from "../../components/WeatherBox";

type Props = {};

const Hourly = (props: Props) => {
  return (
    <View style={styles.mainContainer}>
      <WeatherBox />
    </View>
  );
};

export default Hourly;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background_cream,
    padding: 12,
  },
});
