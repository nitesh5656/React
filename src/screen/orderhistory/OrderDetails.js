import React from 'react'
import OrderDetailsPanel from '../../components/orderHistory/OrderDetails';

export default function OrderDetailsScreen({ navigation, route}) {

  return (
    // <OrderDetailsPanel navigation={navigation} orderId={route?.params?.orderId} />
    <OrderDetailsPanel navigation={navigation} orderId={route?.params?.orderId} data={route?.params?.orderData} status={route?.params?.status} />
  )
}