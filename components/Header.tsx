import { View, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";
import { colors } from "../constants/token";
import { Locations } from "../app/(tabs)/_layout";

type Props = {
  search: string;
  locations: Locations[];
  setSearch: (search: string) => void;
  setLocations: (locations: Locations[]) => void;
  submitLocation: (cityName: string) => void;
};

const Header = (props: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchBar {...props} />
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
