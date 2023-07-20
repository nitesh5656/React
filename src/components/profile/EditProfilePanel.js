import { View, Text } from "react-native";
import React from "react";
import { Button, Input } from "@rneui/themed";
import { ScrollView } from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "../../utils/interceptor";
import { updateUser } from "../../store/slices/authSlice";
import { showToast } from "../../utils/toast";
import { TEMP_PROFILE_IMAGE_URL } from "@env";
export default function EditProfilePanel({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setData] = useState({});
  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      editData["file"] = result.assets[0].uri;
      setData({ ...editData });
    }
  };

  const editProfileHandler = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      if (editData.name) formData.append("name", editData.name);
      if (editData.file) formData.append("file", editData.file);
      if (editData.email) formData.append("email", editData.email);

      const { data } = await axiosInstance.patch("/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (editData?.file) {
        delete editData["file"];
        editData["profilePic"] = data.profilePic;
      }

      dispatch(updateUser(editData));
      setIsLoading(false);
      showToast("Edit Profile Successfully");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          fontWeight: "700",
          fontSize: 22,
          textAlign: "center",
          marginTop: 10,
        }}>
        Edit Profile
      </Text>

      <ScrollView>
        <View style={{ padding: 20, gap: 10 }}>
          <View>
            <Text
              style={{
                fontWeight: "700",
                marginBottom: 5,
              }}>
              FULL NAME
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                height: 40,
                borderRadius: 6,
              }}>
              <Input
                containerStyle={{ flex: 1, borderRadius: 6 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onChangeText={(value) => {
                  console.log(value);
                  editData["name"] = value;
                  setData({ ...editData });
                }}
                defaultValue={user?.name || ""}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontWeight: "700",
                marginBottom: 5,
              }}>
              EMAIL
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                height: 40,
                borderRadius: 6,
              }}>
              <Input
                containerStyle={{ flex: 1, borderRadius: 6 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onChangeText={(value) => {
                  editData["email"] = value;
                  setData({ ...editData });
                }}
                defaultValue={user?.email || ""}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                fontWeight: "700",
                marginBottom: 5,
              }}>
              MOBILE NUMBER
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                height: 40,
                borderRadius: 6,
              }}>
              <Input
                inputMode='numeric'
                containerStyle={{ flex: 1, borderRadius: 6 }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                disabled={true}
                defaultValue={user?.number + ""}
              />
            </View>
          </View>

          {/* <View>
            <Button
              title={"UPLOAD IMAGE"}
              onPress={pickImage}
              buttonStyle={{
                backgroundColor: "#33056f",
                width: 150,
                borderRadius: 6,
                marginBottom: 10,
              }}
            />
            <View></View>
            {editData["file"] || user?.profilePic ? (
              <Image
                source={{ uri: editData["file"] || TEMP_PROFILE_IMAGE_URL + "/user/" +  user?.profilePic }}
                style={{ width: 250, height: 250 }}
              />
            ) : (
              <Image
                source={require("../../../assets/images/maleavatar.jpg")}
                alt='img'
                style={{ width: 250, height: 250 }}
              />
            )}
          </View> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginVertical: 20,
            }}>
            <Button
              title={"CANCEL"}
              onPress={() => navigation.goBack()}
              buttonStyle={{
                backgroundColor: "#33056f",
                borderRadius: 6,
                width: 150,
              }}
            />
            <Button
              title={isLoading ? "Saving" : "SAVE"}
              onPress={editProfileHandler}
              disabled={isLoading}
              buttonStyle={{
                backgroundColor: "#33056f",
                borderRadius: 6,
                width: 150,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
