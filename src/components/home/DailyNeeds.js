import React from "react";
import { View, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { Button, Text, Card } from "@rneui/themed";
import { styles } from "./HomeStyles";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/interceptor";
import { useSelector } from "react-redux";
import { IMAGE_URL } from "@env";

const screenWidth = Dimensions.get("window").width;
const categoryImgWidth = screenWidth / 3 - 10;

const DailyNeeds = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [dailyNeeds, setDailyNeeds] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/dailyneeds?page=1&limit=6");
        setDailyNeeds(data.message);
      } catch (err) {
        setDailyNeeds([]);
      }
    })();
  }, [user.pincode]);

  const DailyNeedsCategories = ({ navigation, category }) => {
    let nameKey =
      user?.language == "ENGLISH"
        ? "name"
        : user?.language?.toLowerCase() + "Name";
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("DailyNeeds Subcategories", {
            _id: category._id,
            name: category[nameKey],
            key: "dailyNeeds",
          })
        }>
        <View
          style={{
            width: categoryImgWidth,
            padding: 0,
            marginBottom: 10,
          }}>
          <Card
            containerStyle={{
              width: categoryImgWidth,
              height: categoryImgWidth,
              padding: 5,
              margin: 0,
              borderRadius: 10,
            }}>
            <Card.Image
              style={{
                padding: 0,
                width: "100%",
                height: "100%",
                borderRadius: 7,
              }}
              source={{
                uri: IMAGE_URL + "/dailyneeds/" + category?.bannerImg,
              }}
            />
          </Card>
          <Text style={styles.cardTitle}>{category[nameKey]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    dailyNeeds && (
      <View style={{ marginVertical: 30, paddingHorizontal: 10 }}>
        <Text style={{ paddingBottom: 10 }} h4>
          Daily Needs
        </Text>

        <FlatList
          data={dailyNeeds}
          renderItem={({ item }) => (
            <DailyNeedsCategories category={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          contentContainerStyle={{}}
        />
        <View>
          <Button
            title='View All'
            color={"#33056F"}
            containerStyle={{
              borderRadius: 7,
              backgroundColor: "#33056F",
            }}
            onPress={() => navigation.navigate("Daily Needs")}
          />
        </View>
      </View>
    )
  );
};

export default DailyNeeds;
