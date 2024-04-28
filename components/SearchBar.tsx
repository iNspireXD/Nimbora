import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import { colors } from "../constants/token";
import { Locations } from "../app/(tabs)/_layout";

type Props = {
  search: string;
  locations: Locations[];
  setSearch: (search: string) => void;
  setLocations: (locations: Locations[]) => void;
  submitLocation: (cityName: string) => void;
};

// const tempData = [
//   {
//     id: 1,
//     name: "London",
//     country: "United Kingdom",
//   },
//   {
//     id: 2,
//     name: "Kathmandu",
//     country: "Nepal",
//   },
// ];
const SearchBar = ({
  search,
  setLocations,
  setSearch,
  locations,
  submitLocation,
}: Props) => {
  // const [locations, setLocations] = useState(tempData);
  // const [search, setSearch] = useState<string>("");
  // const [laoding, setLoading] = useState(false);

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          keyboardType="visible-password"
          style={styles.textInput}
          placeholder="Search For Cities"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <Feather name="search" size={24} color="gray" />
      </View>
      {locations.length > 0 && (
        <View>
          {locations.map((location) => {
            return (
              <TouchableOpacity
                key={location.id}
                style={styles.locationContainer}
                onPress={() => submitLocation(location.name)}
              >
                <Entypo name="location-pin" size={24} color="black" />
                <Text>{`${location.name}, ${location.country}.`}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
    backgroundColor: colors.background_cream,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    elevation: 5,
    borderColor: "gray",
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: colors.background_cream,
    textAlign: "left",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background_cream,
    padding: 3,
    paddingHorizontal: 4,
    marginTop: 6,
    marginBottom: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
});
