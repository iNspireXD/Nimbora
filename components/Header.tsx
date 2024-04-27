import { View, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";
import { colors } from "../constants/token";

type Props = {};

const Header = (props: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchBar />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background_cream,
    paddingHorizontal: 8,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E3",
    position: "absolute",
    zIndex: 50,
  },
});
