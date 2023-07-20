import { View, Text } from 'react-native'
import React from 'react'
import NewAddress from '../../components/profile/NewAddress'

export default function AddNewAddress({ navigation }) {
  return (
    <NewAddress navigation={navigation} />
  )
}