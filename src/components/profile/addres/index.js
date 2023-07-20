import { View, Text } from "react-native";
import React, { useState } from "react";
import UserAddressPanel from "./UserAddress";
import { ScrollView } from "react-native";
import { Button, CheckBox, Dialog, Divider, Input } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { screenHeight, screenWidth } from "../../../utils/Dimensions";
import axiosInstance from "../../../utils/interceptor";
import { updateUser } from "../../../store/slices/authSlice";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_API_KEY } from "@env";
import * as Location from "expo-location";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function SelectAddressPanel({ navigation }) {
  const { user } = useSelector((user) => user.auth);
  const [address, setAddress] = useState(null);
  const [showLocationPopUp, setShowLocationPopup] = useState({
    status: false,
    type: null,
  });
  const [showGoogleSearchLocationPopUp, setShowGoogleSearchLocationPopUp] =
    useState(false);
  const [selectedIndex, setIndex] = React.useState(0);
  const [isMapShown, setIsMapShown] = useState(false);
  const dispatch = useDispatch();

  const getLocationFromCoordinates = (coordinate) => {
    Geocoder.init(GOOGLE_MAPS_API_KEY);

    Geocoder.from(coordinate.latitude, coordinate.longitude)
      .then((json) => {
        const result = json.results[0];
        const addressComponents = result.address_components;
        const addressComponent = json.results[0].formatted_address;
        let pincode = "";

        for (let i = 0; i < addressComponents.length; i++) {
          const component = addressComponents[i];
          const componentTypes = component.types;

          if (componentTypes.includes("postal_code")) {
            pincode = component.long_name;
          }
        }

        let address = {
          address: addressComponent,
          longitude: coordinate.longitude,
          latitude: coordinate.latitude,
          pincode: pincode,
          type: "MAP",
        };
        setAddress(address);
        setShowGoogleSearchLocationPopUp(true);
      })
      .catch((error) => console.warn(error));
  };

  const getCurrentLocationHandler = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") throw new Error("");
    let location = await Location.getCurrentPositionAsync({});
    getLocationFromCoordinates(location.coords);
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    // Handle the selected location here
    getLocationFromCoordinates(coordinate);
    setIsMapShown(false);
  };

  const submitNameOrMobileButtonhandler = async () => {
    try {
      if (!address.name || !address.number)
        return showToast("Enter All the Fields", "success");
      await axiosInstance.patch("/user", {
        address: JSON.stringify([...user?.address, address]),
      });

      dispatch(
        updateUser({
          address: [...user?.address, address],
        })
      );

      setShowGoogleSearchLocationPopUp(false);
      navigation.navigate("Cart", {
        address: address,
      });
    } catch (err) {
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  return !isMapShown ? (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E7D6FD",
      }}>
      <ScrollView>
        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              textAlign: "center",
              marginVertical: 10,
            }}>
            Choose a Delivery Address
          </Text>
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            margin: 10,
            borderRadius: 10,
          }}>
          <GooglePlacesAutocomplete
            placeholder='Search Location...'
            onPress={async (data, details = null) => {
              if (details) {
                const { geometry, address_components } = details;
                const { location } = geometry;

                const latitude = location.lat;
                const longitude = location.lng;

                const postalCodeComponent = address_components.find(
                  (component) => {
                    return component.types.includes("postal_code");
                  }
                );

                const postalCode = postalCodeComponent
                  ? postalCodeComponent.long_name
                  : "";
                let address = {
                  address: data.description,
                  longitude: longitude,
                  latitude: latitude,
                  pincode: postalCode,
                  type: "SEARCH",
                };

                setAddress(address);
                setShowGoogleSearchLocationPopUp(true);
              }
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            autoFocus={true}
            fetchDetails={true}
            styles={{
              padding: 10,
              marginTop: 10,
              fontWeight: "600",
            }}
          />
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <MaterialIcon name="search" size={22} />
          </View>
          </View>
          
          <UserAddressPanel navigation={navigation} />
        </View>

        <View
          style={{
            padding: 10,
            marginTop: 10,
          }}>
          <Button
            title={"Current Location"}
            titleStyle={{
              fontWeight: "700",
            }}
            buttonStyle={{
              backgroundColor: "#33056F",
              borderRadius: 10,
              height: 50,
            }}
            onPress={getCurrentLocationHandler}
          />
        </View>

        <View
          style={{
            padding: 10,
            marginTop: 10,
          }}>
          <Button
            title={"Location From Map"}
            titleStyle={{
              fontWeight: "700",
            }}
            buttonStyle={{
              backgroundColor: "#33056F",
              borderRadius: 10,
              height: 50,
            }}
            onPress={() => setIsMapShown(true)}
          />
        </View>
      </ScrollView>

      {showLocationPopUp.status && (
        <Dialog
          isVisible={showLocationPopUp.status}
          onBackdropPress={() => setShowLocationPopup({ status: false })}
          overlayStyle={{
            width: screenWidth - 30,
            height: screenHeight - 30,
            borderRadius: 10,
            padding: 0,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Dialog.Title
              title='Add New Address'
              titleStyle={{
                backgroundColor: "#33056F",
                color: "#fff",
                padding: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                fontSize: 20,
              }}
            />
            <ScrollView>
              <View style={{}}>
                <View>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 18,
                      marginTop: 10,
                      textAlign: "center",
                    }}>
                    Basic Details
                  </Text>
                  <View>
                    <View>
                      <Input placeholder='Enter Full Name' inputMode='text' />
                    </View>
                    <View>
                      <Input
                        placeholder='Enter Mobie Number'
                        inputMode='numeric'
                        maxLength={10}
                      />
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 18,
                      marginVertical: 6,
                      textAlign: "center",
                    }}>
                    Get Location
                  </Text>
                  <Button title={"Select Location from Map"} />
                </View>

                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 18,
                      marginVertical: 6,
                      textAlign: "center",
                    }}>
                    Address Details
                  </Text>
                  <View>
                    <View>
                      <Input
                        placeholder='Enter House No./ Flat No.'
                        inputMode='text'
                      />
                    </View>
                    <View>
                      <Input
                        placeholder='Enter Street No./ Name'
                        inputMode='text'
                      />
                    </View>
                    <View>
                      <Input
                        placeholder='Enter Nearby Landmark'
                        inputMode='text'
                      />
                    </View>
                    <View>
                      <Input placeholder='Enter Area Name' inputMode='text' />
                    </View>
                    <View>
                      <Input placeholder='Enter City Name' inputMode='text' />
                    </View>
                    <View>
                      <Input placeholder='Enter State Name' inputMode='text' />
                    </View>
                    <View>
                      <Input
                        placeholder='Enter Your Pincode/PostalCode'
                        inputMode='numeric'
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
                    }}>
                    Address Type
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 10,
                    }}>
                    <CheckBox
                      checked={selectedIndex === 0}
                      onPress={() => setIndex(0)}
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      title={"Home"}
                    />
                    <Divider />
                    <CheckBox
                      checked={selectedIndex === 1}
                      onPress={() => setIndex(1)}
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      title={"Work"}
                    />
                    <Divider />
                    <CheckBox
                      checked={selectedIndex === 2}
                      onPress={() => setIndex(2)}
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      title={"Other"}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 10,
              }}>
              <Button
                title={"Cancel"}
                onPress={() => setShowLocationPopup({ status: false })}
                buttonStyle={{
                  borderRadius: 10,
                  backgroundColor: "#33056F",
                  minWidth: 100,
                }}
              />
              <Button
                title={"Submit"}
                buttonStyle={{
                  borderRadius: 10,
                  backgroundColor: "#33056F",
                  minWidth: 100,
                }}
              />
            </View>
          </View>
        </Dialog>
      )}

      {showGoogleSearchLocationPopUp && (
        <Dialog
          isVisible={showGoogleSearchLocationPopUp}
          onBackdropPress={() => setShowGoogleSearchLocationPopUp(false)}
          overlayStyle={{
            width: screenWidth - 30,
            height: screenHeight - 30,
            borderRadius: 10,
            padding: 0,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Dialog.Title
              title='Add Basic Details'
              titleStyle={{
                backgroundColor: "#33056F",
                color: "#fff",
                padding: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                fontSize: 20,
              }}
            />
            <ScrollView>
              <View style={{}}>
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 18,
                      marginVertical: 6,
                      textAlign: "center",
                    }}>
                    Address Details
                  </Text>
                  <View>
                    <View>
                      <Input
                        placeholder='Enter Name'
                        onChangeText={(value) =>
                          setAddress({ ...address, name: value })
                        }
                        inputMode='text'
                      />
                    </View>
                    <View>
                      <Input
                        placeholder='Enter Phone Number'
                        onChangeText={(value) =>
                          setAddress({ ...address, number: value })
                        }
                        inputMode='number'
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 10,
              }}>
              <Button
                title={"Cancel"}
                onPress={() => setShowLocationPopup(false)}
                buttonStyle={{
                  borderRadius: 10,
                  backgroundColor: "#33056F",
                  minWidth: 100,
                }}
              />
              <Button
                title={"Submit"}
                onPress={submitNameOrMobileButtonhandler}
                buttonStyle={{
                  borderRadius: 10,
                  backgroundColor: "#33056F",
                  minWidth: 100,
                }}
              />
            </View>
          </View>
        </Dialog>
      )}
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 17.8,
          longitude: 80.3,
          latitudeDelta: 3.9,
          longitudeDelta: 4,
        }}>
        <Marker
          coordinate={{
            latitude: address?.lattitude || 17.385044,
            longitude: address?.longitude || 78.486671,
          }}
        />
      </MapView>
    </View>
  );
}
