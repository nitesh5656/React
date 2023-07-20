import { View, Text } from 'react-native'
import React from 'react'
import { Button, Card, Icon, Input } from '@rneui/themed'
import { useState } from 'react'
export default function SuggestionsBox() {
  const [showSuggestionForm, setShowSuggestionForm]=useState(false);
  const [onFormSubmit, setOnFormSubmit] = useState(false);
  return (
    <Card
    containerStyle={{
      marginTop: 10,
      marginHorizontal: 0,
      borderRadius: 10,
    }}
  >
    <Card.Title style={{
      textAlign: 'left',
    }}>Suggestions :</Card.Title>
    {onFormSubmit ?
    <View style={{flexDirection: 'row', gap: 5,}}>
      <Icon name="check-circle" type="materialicons" color="#33056F" size={32} />
      <Text style={{width: 200, textAlign: 'left', fontSize: 12}}>Thank you for suggesting a new product. We will try to provide this product as early as possible.</Text>
    </View>
    :
    <View style={{flexDirection: 'row', gap: 5,}}>
      <Text style={{fontSize: 20}}>😢</Text>
      <Text style={{width: 200, textAlign: 'left', fontSize: 12}}>Didn’t find the product your looking for. Please let us know by filling this form</Text>
    </View>
    }

    {showSuggestionForm && 
      <Card 
        containerStyle={{
          backgroundColor: '#33056F',
          borderRadius: 20,
          marginHorizontal: 0,

        }}
        >
          <View style={{marginBottom: 10,}}>
            <Text style={{
              color: '#fff',
              fontWeight: "700",
            }}>Enter Product Name</Text>

            <Input
              inputContainerStyle={{
                borderColor: 'transparent',
              }}
              containerStyle={{
                backgroundColor: '#fff',
                height: 30,
                borderRadius: 7,
                marginTop: 5,
              }}/>
          </View>

          <View style={{marginBottom: 10,}}>
            <Text style={{
              color: '#fff',
              fontWeight: "700",
            }}>Enter Product Description</Text>

            <Input
              numberOfLines={3}
              multiline={true}
              inputContainerStyle={{
                borderColor: 'transparent',
              }}
              containerStyle={{
                backgroundColor: '#fff',
                // height: 30,
                borderRadius: 7,
                marginTop: 5,
              }}/>
          </View>

          <Button
           onPress={() => {setOnFormSubmit(true); setShowSuggestionForm(false)}}
           containerStyle={{
            borderRadius: 7,
          }}>
            Submit
          </Button>
      </Card>
    }
    <View>
      {showSuggestionForm && !onFormSubmit ? 
      <Icon name="keyboard-arrow-up" type="materialicons" color="#33056F" size={32} onPress={()=>  setShowSuggestionForm(false)} />
      :
      !showSuggestionForm && !onFormSubmit &&
      <Icon name="keyboard-arrow-down" type="materialicons" color="#33056F" size={32} onPress={()=> setShowSuggestionForm(true)} />
      }
    </View>
  </Card>
  )
}