import { View } from 'react-native'
import React from 'react'
import ComplaintsPanel from '../../components/general/complaints'

export default function ComplaintsScreen({ navigation }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#E7D6FD',
    }}>
     <ComplaintsPanel navigation={navigation} />
    </View>
  )
}