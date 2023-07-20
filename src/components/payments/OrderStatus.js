import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { screenWidth } from '../../utils/Dimensions'

export default function OrderStatus({ navigation, status }) {
  return (
    <View style={{
        flex: 1,
        backgroundColor: '#E7D6FD',
    }}>
      {status === "success" &&
      <TouchableOpacity activeOpacity={0.9} style={{flex: 1,}} onPress={()=> navigation.navigate('Order History')}>
      <Image source={require('../../../assets/images/OrderPlaced.gif')} alt='gif' style={{ flex: 1,width: screenWidth}} />
      </TouchableOpacity>
      }
    </View>
  )
}