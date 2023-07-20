import { View, Text } from "react-native";
import React, { useState } from "react";
import { Divider, FAB, Dialog, Input, Button } from "@rneui/themed";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SuggestionsScreen() {
  const [showAddSuggestionForm, setShowAddSuggestionForm] = useState(false);
  const plusIcon = (
    <MaterialCommunityIcon name="plus" size={22} color={"#fff"} />
  );
  const suggestionsData = [
    {
      name: "Sensodyne 250gm Tootpaste",
      description:
        "Sensodyne Fresh Mint provides sensitivity protection plus all the benefits you would expect from a daily toothpaste - strong teeth, healthy gums and fresh breath.",
      status: "Added",
    },
    {
      name: "Beef Meat",
      description:
        "Beef is the culinary name for meat from cattle. In prehistoric times, humankind hunted aurochs and later domesticated them. Since that time, numerous breeds of cattle have been bred specifically for the quality or quantity of their meat.",
      status: "Not Added",
    },
    {
      name: "Amrutha Tiffins",
      description:
        "Add Amrutha tiffins for a tasty breakfast. All the prices are affordable.",
      status: "Added",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E7D6FD",
        padding: 10,
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "700",
            color: "#33056F",
            fontSize: 16,
          }}
        >
          PREVIOUS - SUGGESTIONS :
        </Text>

        <View>
          {suggestionsData.map((suggestion, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "#fff",
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 6,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontWeight: "700",
                      fontSize: 14,
                    }}
                  >
                    {suggestion.name}
                  </Text>
                  <Text
                    style={{
                      color: `${
                        suggestion.status === "Added" ? "#023020" : "#FF0000"
                      }`,
                      minWidth: 60,
                      fontWeight: '700',
                    }}
                  >
                    {suggestion.status}
                  </Text>
                </View>
                <Divider
                  style={{
                    marginVertical: 10,
                  }}
                />
                <Text
                  style={{
                    color: "#000",
                    fontSize: 12,
                  }}
                >
                  {suggestion.description}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <FAB
        icon={plusIcon}
        placement="right"
        color="#F37130"
        onPress={() => setShowAddSuggestionForm(true)}
      />

      <Dialog isVisible={showAddSuggestionForm} onBackdropPress={()=> setShowAddSuggestionForm(false)}
      overlayStyle={{
        width: 300,
      }}
      backdropStyle={{
        backgroundColor: 'rgba(0,0,0,0.8)'
      }}>
        <Dialog.Title title="Suggest a Product :" />
        <Divider  style={{marginBottom: 20,}} />
        <View style={{
          gap: 15,
        }}>
        <View>
          <Text style={{fontWeight: '700', marginBottom: 6,}}>Enter Product Name :</Text>
          <View style={{
            borderWidth: 1.5,
            borderColor: '#f5f5f5',
            alignItems: 'center',
            justifyContent: 'center',
            height: 30,
          }}>
          <Input inputContainerStyle={{
           borderBottomWidth: 0,
           height: 30,
           margin: 0,
          }}
          containerStyle={{
            flex: 1,
          }}
          inputStyle={{
            fontSize: 14,
          }}
          />
          </View>
        </View>

        <View>
          <Text style={{fontWeight: '700', marginBottom: 6,}}>Enter Product Description :</Text>
          <View style={{
            borderWidth: 1.5,
            borderColor: '#f5f5f5',
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
          }}>
          <Input 
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          containerStyle={{
            flex: 1,
          }}
          inputStyle={{
            fontSize: 14,
          }}
          multiline={true}
          numberOfLines={4}
          />
          </View>
        </View>
        
        <View>
         <Button title={"Submit"} buttonStyle={{
          backgroundColor: '#33056F',
          borderRadius: 6,
         }} />
        </View>
        </View>
      </Dialog>

    </View>
  );
}
