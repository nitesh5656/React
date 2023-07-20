import { View, Text } from "react-native";
import React, { useState } from "react";
import GetLocations from "../general/locations/GetLocation";
import { Button, CheckBox, Dialog, Divider, Input } from "@rneui/themed";
import { screenWidth } from "../../utils/Dimensions";
import { ScrollView } from "react-native";

export default function NewAddress({ navigation }) {
  const [showMap, setShowMap] = useState(false);
  const [selectedIndex, setIndex] = React.useState(0);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  return (
    <>
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#E7D6FD",
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              marginVertical: 6,
              textAlign: "center",
            }}
          >
            Get Location
          </Text>
          <Button
            title={"Select Location from Map"}
            onPress={() => setShowMap(true)}
          />
        </View>

        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Basic Details
          </Text>
          <View>
            <View>
              <Input
                placeholder="Enter Full Name"
                onChangeText={(value) => setName(value)}
                value={name}
                inputMode="text"
              />
            </View>
            <View>
              <Input
                placeholder="Enter Mobie Number"
                onChangeText={(value) => setMobile(value)}
                value={mobile}
                inputMode="numeric"
                maxLength={10}
              />
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              marginVertical: 6,
              textAlign: "center",
            }}
          >
            Address Details
          </Text>
          <View>
            <View>
              <Input
                placeholder="Enter House No./ Flat No."
                inputMode="text"
              />
            </View>
            <View>
              <Input
                placeholder="Enter Street No./ Name"
                inputMode="text"
              />
            </View>
            <View>
              <Input
                placeholder="Enter Nearby Landmark"
                inputMode="text"
              />
            </View>
            <View>
              <Input
                placeholder="Enter Area Name"
                inputMode="text"
              />
            </View>
            <View>
              <Input
                placeholder="Enter City Name"
                inputMode="text"
              />
            </View>
            <View>
              <Input
                placeholder="Enter State Name"
                inputMode="text"
              />
            </View>
            <View>
              <Input
                placeholder="Enter Your Pincode/PostalCode"
                inputMode="numeric"
              />
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              marginVertical: 6,
              textAlign: "center",
            }}
          >
            Address Type
          </Text>
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
          }}>
            <CheckBox
              checked={selectedIndex === 0}
              onPress={() => setIndex(0)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={"Home"}
            />
            <Divider  />
            <CheckBox
              checked={selectedIndex === 1}
              onPress={() => setIndex(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={"Work"}
            />
            <Divider />
            <CheckBox
              checked={selectedIndex === 2}
              onPress={() => setIndex(2)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={"Other"}
            />
          </View>
        </View>

        <View style={{
            flexDirection:'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 20,
        }}>
            <Button title={"Cancel"}
            buttonStyle={{
                backgroundColor: '#33056F',
                borderRadius: 6,
                width: 150,
            }}
            onPress={() => navigation.goBack()}
            />
            <Button title={"Submit"}
            buttonStyle={{
                backgroundColor: '#33056F',
                borderRadius: 6,
                width: 150,
            }}
            onPress={() => navigation.goBack()}
            />
        </View>
      </View>
      </ScrollView>


      {showMap && (
        <Dialog
          isVisible={showMap}
          overlayStyle={{
            flex: 1,
            width: screenWidth,
          }}
        >
          <GetLocations
            navigation={navigation}
            onClose={() => setShowMap(false)}
          />
        </Dialog>
      )}
    </>
  );
}
