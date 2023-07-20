import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { CheckBox } from '@rneui/themed';

export default function MaintenanceScreen({ navigation }) {
    const [selectedIndex, setIndex] = React.useState(0);

      // Language selection
  const LanguageSelection = [
    { id: 1, language: "తెలుగు", value: "TELUGU" },
    { id: 2, language: "हिंदी", value: "HINDI" },
    { id: 0, language: "English", value: "ENGLISH" },
  ];

  return (
    <View style={{
        flex: 1,
        backgroundColor: '#E7D6FD',
        // paddingTop: 28,
        alignItems:'center',
        justifyContent: 'center',
    }}>
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
        }}>
            <Image source={require('../../../assets/images/maintenance.png')} alt="img" style={{ width: 150, height: 200}} />

            <Text style={{
                fontWeight: '700',
                fontSize: 18,
                textTransform: 'uppercase',
                textAlign: 'center',
                marginTop:5
            }}>We are currently undergoing maintenance.</Text>
            <Text style={{textAlign:"center", marginTop:5, fontSize:15}}>We will come back soon.</Text>
            {/* <View style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 20,
            }}>
            <Text style={{
                fontWeight: '700',
                fontSize: 16,
                textTransform: 'uppercase',
                textAlign: 'center',
            }}>Availale at :</Text>
            <Text style={{
                fontWeight: '700',
                fontSize: 16,
                textTransform: 'uppercase',
                textAlign: 'center',
            }}>01-07-2023 / 10:00 AM</Text>
            </View> */}
        </View>

        {/* Language Selection */}
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          marginTop: 4,
          position: 'absolute',
          bottom: 10,
        }}>
        {LanguageSelection.map((language, index) => {
          return (
            <View key={index}>
              <CheckBox
                // checked={language?.value === user.language}
                // onPress={() =>
                //   changeLanguageHandler(language?.value, user.language)
                // }
                checked={selectedIndex === index}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                title={language?.language || ""}
                onPress={() => setIndex(index)}
              />
            </View>
          );
        })}
      </View>
    </View>
  )
}