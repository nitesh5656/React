import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Button } from '@rneui/themed'

export default function NetworkFailureScreen() {
  return (
    <View style={{
        flex: 1,
        backgroundColor: '#E7D6FD',
        justifyContent: 'center',
        paddingTop: 28,
    }}>
      <View style={{
        paddingHorizontal: 20,
      }}>
        <View>
        <Text style={{
            fontSize: 34,
            opacity: 0.6,
        }}>No Internet</Text>
        <Text style={{
            fontWeight: '700',
            fontSize: 40,
            bottom: 2,
        }}>Connection</Text>
        </View>
        <Text style={{
            fontSize: 16,
            marginTop: 10,
            width: 300,
            marginBottom: 20,
        }}>Please check your internet connection and try again.</Text>

        <Button 
            title={"Try Again"}
            buttonStyle={{
                backgroundColor: '#FF9431',
                width: 120,
                borderRadius: 8,
            }}
        />
      </View>

        <Image source={require('.././../../assets/images/shopping-cart.png')} alt="img" style={{
            width: 200,
            height: 200,
            position: 'absolute',
            top: 80,
            left: 10,
            opacity: 0.20,
        }} />
    </View>
  )
}