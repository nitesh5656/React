import { View, Text } from 'react-native'
import React from 'react'
import NotificationPanel from '../../../components/general/notification'

export default function NotificationScreen({ navigation }) {
  return (
   <NotificationPanel navigation={navigation} />
  )
}