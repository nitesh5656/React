import React from 'react'
import PaymentsPanel from '../../components/payments'

export default function PaymentsScreen({ navigation, route }) {
  return (
      <PaymentsPanel navigation={navigation} totalPrice={route.params.totalPrice} address={route.params.address} />
  )
}