import { View, Text } from "react-native";
import React from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Divider, } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

export default function Address({ navigation, onClose }) {
  const [selectedIndex, setIndex] = React.useState(0);
  const addressData = [
    {
      name: "Jayavardhan",
      mobile: "9398159868",
      address:
        "5-5-578/2,Opp. Vconvention Hall, Gujjanagundla, Guntur,A.P-522006",
      addressType: "Home",
    },
    {
      name: "Jayavardhan",
      mobile: "8985264956",
      address: "8/2 Arundalpet,Guntur,A.P-522002",
      addressType: "Office",
    },
    {
      name: "Jayavardhan",
      mobile: "9398159868",
      address: "FT.NO: 204, Jaya Apartments,Vidyanagar,Guntur,A.P-522006",
      addressType: "Other",
    },
    // {
    //   name: "Jayavardhan",
    //   mobile: "9398159868",
    //   address: "Jaya Apartments,Vidyanagar,Guntur,A.P-522006",
    //   addressType: "Other",
    // },
  ];
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "lightgray",
          padding: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          Choose a Delivery Address
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={()=> {navigation.navigate("New Address");onClose()}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 10,
            gap: 10,
          }}
        >
          <FontAwesomeIcon name="plus-circle" size={22} color={"#33056F"} />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Add New Address
          </Text>
        </View>
        </TouchableOpacity>

        <Divider width={2} style={{marginBottom: 10,}} />

        <ScrollView style={{
            height:500,
        }}>
        <View style={{
            gap: 10,
            alignItems:'center',
        }}>
          {addressData.map((data, index) => {
            return (
              <View key={index}>
                 <TouchableOpacity activeOpacity={0.4} onPress={()=> onClose()}>
                  <View
                    style={{
                      borderRadius: 10,
                      padding: 20,
                      backgroundColor: "#fff",
                      gap: 10,
                      borderColor: 'rgba(0,0,0,0.35)',
                      borderWidth: 2,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 18,
                        }}
                      >
                        Jayavardhan
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <FontAwesomeIcon
                        name="mobile-alt"
                        size={22}
                        color={"#33056F"}
                      />
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 14,
                        }}
                      >
                        +91-9398159868
                      </Text>
                    </View>

                    <View
                      style={{
                        gap: 10,
                        flexDirection: "row",
                      }}
                    >
                      <EntypoIcon name="location" size={22} color={"#33056F"} />
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 14,
                        }}
                      >
                        5-5-578/2, Opp. Vconvention hall,
                        Gujjanagundla,Guntur,A.P-522006
                      </Text>
                    </View>
                  </View>
                  </TouchableOpacity>
              </View>
            );
          })}
        </View>
        </ScrollView>
      </View>
    </View>
  );
}
