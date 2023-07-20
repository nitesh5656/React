import { View, Text } from 'react-native'
import React from 'react'
import HomepagePanel from '../../components/home'
import Shell from '../../components/shells/MainShell';

export default function HomepageScreen({ route, navigation }) {
    const { pincode } = route.params || 522006;

  return (
    <Shell navigation={navigation}>
      <HomepagePanel navigation={navigation} pincode={pincode} />
    </Shell>
  )
}