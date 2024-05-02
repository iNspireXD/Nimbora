import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeLocationName = async (location: string) => {
  try {
    await AsyncStorage.setItem("locationName", location);
  } catch (error) {
    console.log(error);
  }
};

export const getLocationName = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem("locationName");
    return value;
  } catch (e) {
    console.log(e);
    return null;
  }
};
