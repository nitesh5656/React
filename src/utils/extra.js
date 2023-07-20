import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorage = async (key) => {
  var value = await AsyncStorage.getItem(key);
  return value;
};
