import { View } from "react-native";
import React from "react";
import { Button, CheckBox, Divider } from "@rneui/themed";
import { updateUser } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/interceptor";
import { showToast } from "../../utils/toast";

export default function ChangeLanguageScreen({ navigation }) {
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
      showToast("Language Updated Successfull", "success");
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
        flex: 1,
        backgroundColor: "#E7D6FD",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}>
      <View
        style={{
          width: 250,
          borderRadius: 10,
          padding: 10,
          backgroundColor: "#fff",
        }}>
        {LanguageSelection.map((language, index) => {
          return (
            <>
              <CheckBox
                key={index}
                checked={language?.value === user.language}
                onPress={() =>
                  changeLanguageHandler(language?.value, user.language)
                }
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                title={language?.language || ""}
              />
              {index !== LanguageSelection.length - 1 && <Divider />}
            </>
          );
        })}
      </View>

      <View
        style={{
          width: 250,
          borderRadius: 10,
          padding: 10,
          backgroundColor: "#fff",
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-around",
          alignItems: "center",
        }}>
        <Button
          title={"CANCEL"}
          buttonStyle={{
            backgroundColor: "#33056F",
            borderRadius: 6,
          }}
          onPress={() => navigation.goBack()}
        />
        <Button
          title={"SUBMIT"}
          buttonStyle={{
            backgroundColor: "#33056F",
            borderRadius: 6,
          }}
        />
      </View>
    </View>
  );
}
