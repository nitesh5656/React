import { View, Text, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useSelector } from 'react-redux';

export default function SupportScreen({ navigation }) {
  const { user } = useSelector((user)=>user.auth);
  const supportData = {
    email: 'support@askyourneeds.com',
    mobile: '9398159868',
    whatsapp: '9398159868',
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E7D6FD',
    }}>
      <View style={{
        width: 320,
        height: 350,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'flex-start',
        padding: 20,
      }}> 
        <Text style={{
          fontWeight: '700',
          fontSize: 22,
          color: '#F37130',
          borderBottomWidth: 2,
          borderBottomColor: "#F37130",
          alignSelf: 'center',
          marginBottom: 15,
        }}>CONTACT - US</Text>

        <TouchableOpacity onPress={() => Linking.openURL(`tel:${user.contact.mobile}`)}>
        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          marginVertical: 10,
        }}>
          <View style={{
            width:40,
            height: 40,
            borderRadius: 50,
            backgroundColor: '#33056F',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon name="mobile" size={28} color={'#fff'} />
          </View>
          <Text style={{
            color: '#33056F',
            fontWeight: '700',
            fontSize: 16,
          }}>+91-{user.contact.mobile}</Text>
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() =>
            Linking.openURL(`whatsapp://send?phone=${user.contact.whatsapp}`)
          }>
        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          marginVertical: 10,
        }}>
          <View style={{
            width:40,
            height: 40,
            borderRadius: 50,
            backgroundColor: '#33056F',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon name="whatsapp" size={26} color={'#fff'} />
          </View>
          <Text style={{
            color: '#33056F',
            fontWeight: '700',
            fontSize: 16,
          }}>+91-{user.contact.whatsapp}</Text>
        </View>
        </TouchableOpacity>

        <View style={{
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          marginVertical: 10,
        }}>
          <View style={{
            width:40,
            height: 40,
            borderRadius: 50,
            backgroundColor: '#33056F',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <EntypoIcon name="email" size={20} color={'#fff'} />
          </View>
          <Text style={{
            color: '#33056F',
            fontWeight: '700',
            fontSize: 16,

          }}>{user.contact.email}</Text>
        </View>

        <View style={{marginVertical: 10,}}>
          <Text style={{fontWeight: '700'}}>Note :</Text>
          <Text style={{}}>Our support team is available from 08:00 AM - 10:00 PM, For any quires or complaints contact with our support team.</Text>
        </View>
      </View>
    </View>
  )
}