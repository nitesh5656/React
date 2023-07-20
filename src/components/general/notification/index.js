import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './notificationStyles'
export default function NotificationPanel({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyNotification}>No New Notifications</Text>
    </View>
  )
}