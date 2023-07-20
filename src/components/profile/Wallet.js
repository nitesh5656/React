import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native';

export default function Wallet({ navigation }) {
  return (
    <View style={{
        marginTop: 20,
    }}>
      <Text style={{
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 10,
      }}>My Wallet</Text>

      <View>
        <ImageBackground
            source={require('../../../assets/images/WalletCard.png')}
            resizeMode='contain'
            style={{
                height: 200,
                padding: 20,
            }}
            >
                <View style={{
                    flex:1,
                }}>
                    <Text style={{
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: 16,
                    }}>Balance</Text>
                    <Text style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 32,
                    }}>₹ 2400.00/-</Text>
                </View>
                <View>
                    <Text style={{
                        fontWeight: '700',
                        color: '#fff',
                        fontSize: 18,
                        bottom: 10,
                    }}>Jayavardhan</Text>
                </View>
        </ImageBackground>
      </View>
    </View>
  );
}