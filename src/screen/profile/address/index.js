import { View, Text } from 'react-native'
import React from 'react'
import SelectAddressPanel from '../../../components/profile/addres'

export default function AddressScreen({ navigation }) {
  return (
    <SelectAddressPanel navigation={navigation} />
  )
}