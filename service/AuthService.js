import AsyncStorage from "@react-native-async-storage/async-storage";

export default autheService = {
  getToken: async function () {
    return await AsyncStorage.getItem("token");
  },

  getUserId: async function () {
    return await AsyncStorage.getItem("user_id");
  },

  getAvailablePoints: async function () {
    return await AsyncStorage.getItem("availablePoints");
  },

  setAvailablePoints: function (val) {
    AsyncStorage.setItem("availablePoints", val);
  },

  setUserSession: function (token) {
    AsyncStorage.setItem("token", token);
  },

  setUserId: function (id) {
    AsyncStorage.setItem("user_id", id);
  },

  resetUserSession: function () {
    sessionStorage.removeItem("token");
  },
};
