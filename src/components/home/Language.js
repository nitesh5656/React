import { View } from "react-native";
import { updateUser } from "../../store/slices/authSlice";
import axiosInstance from "../../utils/interceptor";
import { showToast } from "../../utils/toast";
import { CheckBox } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

const Language = () => {
  const { user } = useSelector((user) => user.auth);
  const dispatch = useDispatch();

  const LanguageSelection = [
    { id: 1, language: "తెలుగు", value: "TELUGU" },
    { id: 2, language: "हिंदी", value: "HINDI" },
    { id: 0, language: "English", value: "ENGLISH" },
  ];

  const changeLanguageHandler = async (value, prevLanguageValue) => {
    try {
      dispatch(
        updateUser({
          language: value,
        })
      );
      await axiosInstance.post("/user/language", {
        language: value,
      });
    } catch (err) {
      dispatch(
        updateUser({
          language: prevLanguageValue,
        })
      );
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        marginTop: 4,
      }}>
      {LanguageSelection.map((language, index) => {
        return (
          <View key={index}>
            <CheckBox
              checked={language?.value === user.language}
              onPress={() =>
                changeLanguageHandler(language?.value, user.language)
              }
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              title={language?.language || ""}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Language;
