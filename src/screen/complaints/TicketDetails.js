import React from 'react'
import TicketDetails from '../../components/general/complaints/TicketDetails'

export default function TicketDetailsScreen({ navigation, route }) {
  return (
    <TicketDetails navigation={navigation} ticket={route?.params?.ticket} />
  )
}