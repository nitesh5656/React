import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Divider } from "@rneui/themed";
import Wallet from "./Wallet";
import { PROFILE_IMAGE_URL, TEMP_PROFILE_IMAGE_URL } from "@env";
import { useSelector } from "react-redux";

export default function ProfilePanel({ navigation }) {
  const { user } = useSelector((state) => state.auth);

  // let image = user?.profilePic
  //   ? {
  //       uri: TEMP_PROFILE_IMAGE_URL + "/user/" + user?.profilePic,
  //     }
  //   : require(`../../../assets/images/maleavatar.jpg`);

  let image = require(`../../../assets/images/maleavatar.jpg`);

    console.log(user);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E7D6FD",
        padding: 20,
      }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}>
            Personal details
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Edit Profile")}>
            <Text
              style={{
                color: "#FF9431",
                fontWeight: "700",
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 30,
            padding: 20,
            flexDirection: "row",
            gap: 10,
          }}>
          <View>
            <Image
              source={image}
              alt='img'
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
            }}>
            <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 5 }}>
              {user?.name || "Not Specified"}
            </Text>
            <Text style={{ fontSize: 13 }}>
              {user?.email || "Not Specified"}
            </Text>
            <Divider style={{ marginVertical: 5 }} />
            <Text style={{ fontSize: 13 }}>+91-{user?.number}</Text>
            <Divider style={{ marginVertical: 5 }} />
          </View>
        </View>
      </View>

      {/* <Wallet navigation={navigation} /> */}
    </View>
  );
}
