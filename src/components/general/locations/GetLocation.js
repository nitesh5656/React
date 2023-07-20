import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { Button } from "@rneui/themed";

export default function GetLocation({ navigation, onClose}) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 16.635416,
    longitude: 80.859863,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationAddress, setLocationAddress] = useState([]);
  // const [mapRegion, setMapRegion] = useState({
  //   latitude: 16.321997,
  //   longitude: 80.409813,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to location was denied.");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setLocationAddress(address);
    console.log(location);
    // console.log(location.coords.latitude, location.coords.longitude);
    // console.log(address);
  };

  useEffect(()=> {
    userLocation();
  }, []);

  // console.log(locationAddress);
  return (
    <View style={styles.container}>
      <MapView region={mapRegion} style={styles.map}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <View style={{
        gap:10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
      }}>
      <Button title={"Get Current Location"} onPress={userLocation} />
      <Button title={"Confirm Location"} onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
});
