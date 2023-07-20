import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SearchBar, Icon } from "@rneui/themed";

export default function SearchPanel({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 28,
        backgroundColor: "#E7D6FD",
      }}>
      <View
        style={{
          backgroundColor: "rgba(51, 5, 111,1)",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          paddingHorizontal: 10,
        }}>
        <Icon
          name='arrow-back'
          type='ionicons'
          color='#fff'
          size={28}
          onPress={() => navigation.goBack()}
        />
        <SearchBar
          placeholder='Search Here...'
          onChangeText={(search) => setSearch(search)}
          value={search}
          containerStyle={{
            backgroundColor: "transparent",
            flex: 1,
            padding: 0,
            margin: 0,
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}
          inputContainerStyle={{
            backgroundColor: "#fff",
            width: "100%",
            height: 40,
          }}
        />
      </View>

      {search.length > 0 && (
        <View
          style={{
            width: 280,
            position: "absolute",
            left: 55,
            top: 90,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("Search Result", {
                data: search,
                type: "DAILYNEEDS",
              })
            }>
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "rgba(0,0,0,0.1)",
              }}>
              <Text
                style={{
                  flex: 1,
                }}>
                {search}
              </Text>
              <Text> | </Text>
              <Text style={{ fontSize: 11, minWidth: 88 }}>Daily Needs</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("Search Result", {
                data: search,
                type: "RESTAURANT",
              })
            }>
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                borderBottomWidth: 1.5,
                borderBottomColor: "rgba(0,0,0,0.1)",
              }}>
              <Text
                style={{
                  flex: 1,
                }}>
                {search}
              </Text>
              <Text> | </Text>
              <Text style={{ fontSize: 11 }}>Food & Beverages</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("Search Result", {
                data: search,
                type: "SERVICES",
              })
            }>
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
              }}>
              <Text
                style={{
                  flex: 1,
                }}>
                {search}
              </Text>
              <Text> | </Text>
              <Text style={{ fontSize: 11, minWidth: 88 }}>Services</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
