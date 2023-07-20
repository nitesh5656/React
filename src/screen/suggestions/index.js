import { View, Text } from "react-native";
import { useState } from "react";
import { Input, Button } from "@rneui/themed";
import { showToast } from "../../utils/toast";
import axiosInstance from "../../utils/interceptor"

export default function SuggestionsScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      if (!name || !description) throw new Error("Enter all the fields !");
      await axiosInstance.post("/suggestion", {
        name,
        description,
      });
      showToast("Suggestion Submited Successfully", "success");
      navigation.goBack();
    } catch (err) {
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E7D6FD",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <View
        style={{
          gap: 15,
          width: "90%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
        }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 20,
            textDecorationLine: "underline",
            color: "#FF9431",
          }}>
          SUGGESTION
        </Text>
        <View>
          <Text style={{ fontWeight: "700", marginBottom: 6 }}>
            Enter Product Name :
          </Text>
          <View
            style={{
              borderWidth: 1.5,
              borderColor: "#f5f5f5",
              alignItems: "center",
              justifyContent: "center",
              height: 30,
            }}>
            <Input
              inputContainerStyle={{
                borderBottomWidth: 0,
                height: 30,
                margin: 0,
              }}
              value={name}
              onChangeText={(value) => setName(value)}
              containerStyle={{
                flex: 1,
              }}
              inputStyle={{
                fontSize: 14,
              }}
            />
          </View>
        </View>

        <View>
          <Text style={{ fontWeight: "700", marginBottom: 6 }}>
            Enter Product Description :
          </Text>
          <View
            style={{
              borderWidth: 1.5,
              borderColor: "#f5f5f5",
              height: 100,
            }}>
            <Input
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              value={description}
              onChangeText={(value) => setDescription(value)}
              containerStyle={{
                flex: 1,
              }}
              inputStyle={{
                fontSize: 14,
              }}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        <View>
          <Button
            title={"Submit"}
            buttonStyle={{
              backgroundColor: "#33056F",
              borderRadius: 6,
            }}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
}
