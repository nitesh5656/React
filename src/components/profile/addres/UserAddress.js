import { View, Text } from "react-native";
import React from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Button, ListItem } from "@rneui/themed";

export default function UserAddressPanel({ navigation }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <View
      style={{
        gap: 10,
        alignItems: "center",
        padding: 10,
      }}
    >
      {user?.address?.map((data, index) => {
        return (
          <View
            key={index}
            style={{
              width: 320,
            }}
          >
            {/* <ListItem.Swipeable
              // leftContent={(reset) => (
              //   <Button
              //     title="Info"
              //     onPress={() => reset()}
              //     icon={{ name: "info", color: "white" }}
              //     buttonStyle={{ minHeight: "100%" }}
              //   />
              // )}
              rightContent={(reset) => (
                <Button
                  title="Delete"
                  onPress={() => reset()}
                  icon={{ name: "delete", color: "white" }}
                  buttonStyle={{ 
                    minHeight: "100%", 
                    backgroundColor: "red",
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                 }}
                />
              )}
              containerStyle={{
                borderRadius: 10,
                padding: 0,
                backgroundColor: "#fff",
                width: "100%",
              }}
            > */}
              {/* <Icon name="My Icon" /> */}
              {/* <ListItem.Content> */}
              <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Cart", { address: data })}
              style={{ width: '100%',}}
            >
              <View
                style={{
                  width:'100%',
                  borderRadius: 10,
                  padding: 20,
                  backgroundColor: "#fff",
                  gap: 10,
                  borderColor: "rgba(0,0,0,0.35)",
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
                    {data.name}
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
                    +91-{data.number}
                  </Text>
                </View>

                <View
                  style={{
                    gap: 10,
                    flexDirection: "row",
                    width: '90%',
                    justifyContent: 'flex-start'
                  }}
                >
                  <EntypoIcon name="location" size={22} color={"#33056F"} />
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 14,
                    }}
                  >
                    {data.address}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
              {/* </ListItem.Content> */}
              {/* <ListItem.Chevron /> */}
            {/* </ListItem.Swipeable> */}

            
          </View>
        );
      })}
    </View>
  );
}
