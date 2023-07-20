import { View, Text } from 'react-native'
import React from 'react'

export default function OffersAndPromosScreen({ navigation }) {
  return (
    <View style={{
      flex:1,
      backgroundColor:'#E7D6FD',
      justifyContent: 'center',
      alignItems:'center',
    }}>
      <Text style={{
        fontWeight: '700',
        fontSize: 22,
      }}>OFFERS NOT AVAILABLE</Text>
    </View>
  )
}