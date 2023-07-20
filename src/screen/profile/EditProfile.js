import { View, Text } from 'react-native'
import React from 'react'
import Shell from "../../components/shells/MainShell";
import EditProfilePanel from '../../components/profile/EditProfilePanel';

export default function EditProfileScreen({ navigation }) {
  return (
   <Shell navigation={navigation}>
    <EditProfilePanel navigation={navigation} />
   </Shell>
  )
}