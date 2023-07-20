import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Button, Card, Tab, TabView } from "@rneui/themed";

export default function TimeSlotPanel({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E7D6FD",
      }}
    >
    <ScrollView contentContainerStyle={{
        flex: 1,
      }}>
      <View
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Service Type :
          </Text>

          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Electrician
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            Available :
          </Text>

          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}
          >
            3
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ChooseAvailaleTime />
        <ChooseEmergencyTime navigation={navigation} />
      </View>
      </ScrollView>
    </View>
  );
}

const ChooseAvailaleTime = () => {
  const [index, setIndex] = React.useState(0);

  const chooseDate = [
    {
      id: 0,
      day: 17,
      month: "June",
    },
    {
      id: 1,
      day: 18,
      month: "June",
    },
    {
      id: 2,
      day: 19,
      month: "June",
    },
    {
      id: 3,
      day: 20,
      month: "June",
    },
    {
      id: 4,
      day: 21,
      month: "June",
    },
  ];

  const slotTimeData = [
    {
      id: 1,
      time: "08:00 AM - 09:00 AM",
      status: "Available",
      spotsLeft: 3,
    },
    {
      id: 2,
      time: "08:00 AM - 09:00 AM",
      status: "Available",
      spotsLeft: 1,
    },
    {
      id: 3,
      time: "09:00 AM - 10:00 AM",
      status: "Booked",
      spotsLeft: 0,
    },
    {
      id: 4,
      time: "10:00 AM - 11:00 AM",
      status: "Available",
      spotsLeft: 3,
    },
    // {
    //   id: 5,
    //   time: "11:00 AM - 12:00 PM",
    //   status: "Available",
    //   spotsLeft: 3,
    // },
  ];
  return (
    <View style={{ padding: 10,flex: 1,}}>
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        flex:1,
      }}
    >
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "transparent",
        }}
        iconPosition="left"
        containerStyle={{
          padding: 10,
        }}
      >
        {chooseDate.map((date) => {
          return (
            <Tab.Item key={date?.id}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "rgba(0,0,0,0.5)",
                  borderWidth: 1,
                  padding: 4,
                  borderRadius: 6,
                  backgroundColor:
                    date.id === index ? "#F37130" : "transparent",
                  width: 50,
                }}
              >
                <Text
                  style={{
                    color: date.id === index ? "#fff" : "#000",
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  {date?.day}
                </Text>

                <Text
                  style={{
                    color: date.id === index ? "#fff" : "#000",
                  }}
                >
                  {date?.month}
                </Text>
              </View>
            </Tab.Item>
          );
        })}
      </Tab>

      <View
        style={{
          width: 300,
          height: 2,
          backgroundColor: "rgba(0,0,0,0.25)",
          marginVertical: 10,
          alignSelf: "center",
        }}
      />

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%",}}>
          <View
            style={{
              padding: 10,
            }}
          >
            {slotTimeData.map((slot) => {
              return (
                <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    height: 70,
                  }}
                >
                  <Card
                    containerStyle={{
                      margin: 0,
                      height: 70,
                    }}
                    wrapperStyle={{
                      flexDirection: "row",
                      flex: 1,
                      gap: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ gap: 6,}}>
                      <Text
                        style={{
                          fontWeight: "700",
                        }}
                      >
                        {slot?.time}
                      </Text>

                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                      }}>
                        <View style={{
                            width: 10,
                            height: 10,
                            backgroundColor: slot.status === "Booked" ? "#9D1414" : "#2A794A",
                            borderRadius: 50,
                            top: 1,
                        }} />
                        <Text
                          style={{
                            fontWeight: "700",
                            color: slot.status === "Booked" ? "#9D1414" : "#2A794A",
                          }}
                        >
                          {slot?.status}
                        </Text>
                      </View>
                    </View>

                    <View style={{
                        justifyContent:'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontWeight:'700',
                            fontSize: 18,
                            color: slot.status === "Booked" ? "#9D1414" : "#000",
                        }}>{slot.spotsLeft}</Text>
                        <Text style={{
                            fontWeight:'600',
                            color: slot.status === "Booked" ? "#9D1414" : "#000",
                        }}>Spots Left</Text>
                    </View>
                  </Card>
                </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </TabView.Item>

        <TabView.Item style={{  width: "100%" }}>
        <View
            style={{
              padding: 10,
            }}
          >
            {slotTimeData.map((slot) => {
              return (
                <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    height: 70,
                  }}
                >
                  <Card
                    containerStyle={{
                      margin: 0,
                      height: 70,
                    }}
                    wrapperStyle={{
                      flexDirection: "row",
                      flex: 1,
                      gap: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ gap: 6,}}>
                      <Text
                        style={{
                          fontWeight: "700",
                        }}
                      >
                        {slot?.time}
                      </Text>

                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                      }}>
                        <View style={{
                            width: 10,
                            height: 10,
                            backgroundColor: slot.status === "Booked" ? "#9D1414" : "#2A794A",
                            borderRadius: 50,
                            top: 1,
                        }} />
                        <Text
                          style={{
                            fontWeight: "700",
                            color: slot.status === "Booked" ? "#9D1414" : "#2A794A",
                          }}
                        >
                          {slot?.status}
                        </Text>
                      </View>
                    </View>

                    <View style={{
                        justifyContent:'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontWeight:'700',
                            fontSize: 18,
                            color: slot.status === "Booked" ? "#9D1414" : "#000",
                        }}>{slot.spotsLeft}</Text>
                        <Text style={{
                            fontWeight:'600',
                            color: slot.status === "Booked" ? "#9D1414" : "#000",
                        }}>Spots Left</Text>
                    </View>
                  </Card>
                </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </TabView.Item>
        <TabView.Item style={{ width: "100%", justifyContent:'center', alignItems:'center' }}>
          <Text style={{
            fontSize: 40,
            backgroundColor: '#f5f5f5',
            padding: 50,
            borderRadius: 20,
            color:'#33056F',
          }}>Unavailable</Text>
        </TabView.Item>
        <TabView.Item style={{ width: "100%", justifyContent:'center', alignItems:'center' }}>
          <Text style={{
            fontSize: 40,
            backgroundColor: '#f5f5f5',
            padding: 50,
            borderRadius: 20,
            color:'#33056F',
          }}>Unavailable</Text>
        </TabView.Item>
        <TabView.Item style={{ width: "100%", justifyContent:'center', alignItems:'center' }}>
          <Text style={{
            fontSize: 40,
            backgroundColor: '#f5f5f5',
            padding: 50,
            borderRadius: 20,
            color:'#33056F',
          }}>Unavailable</Text>
        </TabView.Item>
      </TabView>
    </View>
    </View>
  );
};

const ChooseEmergencyTime = ({ navigation }) => {
    return (
      <View
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            height: 130,
          }}
        >
          <TouchableOpacity>
            <Card
              containerStyle={{
                margin: 0,
                height: 130,
                borderRadius: 10,
              }}
              wrapperStyle={{
                gap: 4,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  color: "#9D1414",
                  fontSize: 18,
                }}
              >
                EMERGENCY
              </Text>
              <View style={{ flexDirection: 'row', gap: 10,}}>
              <Text style={{
                fontWeight: '700',
              }}>Available :</Text>
              <Text style={{
                fontWeight: '700',
              }}>1</Text>
              </View>

              <Button 
                onPress={()=> navigation.goBack()}
                buttonStyle={{
                    backgroundColor: '#F37130',
                    borderRadius: 10,
                    marginVertical: 6,
                }}>
              BOOK NOW
              </Button>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    );
  };