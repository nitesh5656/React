import Toast from "react-native-toast-message";

export const showToast = (text, status, position) => {
  Toast.show({
    type: status,
    text1: text,
    position: position || "top",
  });
};
