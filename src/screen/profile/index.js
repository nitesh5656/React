import { View, Text } from "react-native";
import React from "react";
import Shell from "../../components/shells/MainShell";
import ProfilePanel from "../../components/profile";

export default function ProfileScreen({ navigation }) {
  return (
    <Shell navigation={navigation} >
      <ProfilePanel navigation={navigation} />
    </Shell>
  );
}
