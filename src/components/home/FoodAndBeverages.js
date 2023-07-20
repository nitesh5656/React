import { View, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { Button, Text, Card } from "@rneui/themed";
import { styles } from "./HomeStyles";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/interceptor";
import { useSelector } from "react-redux";
import { IMAGE_URL } from "@env";

const screenWidth = Dimensions.get("window").width;
const categoryImgWidth = screenWidth / 3 - 10;

const FoodAndBeverages = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [foodAndBeverages, setFoodAndBeverages] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/restaurant?page=1&limit=6");
        setFoodAndBeverages(data.message);
      } catch (err) {
        setFoodAndBeverages([]);
      }
    })();
  }, [user.pincode]);

  const FoodAndBeveragesCategories = ({ navigation, category }) => {
    let nameKey =
      user.language == "ENGLISH"
        ? "name"
        : user.language.toLowerCase() + "Name";

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("Food And Beverages Subcategories", {
            _id: category._id,
            name: category[nameKey],
            key: "restaurant",
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
              padding: 3,
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
                uri: IMAGE_URL + "/restaurant/" + category?.bannerImg,
              }}
            />
          </Card>
          <Text style={styles.cardTitle}>{category[nameKey]}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    foodAndBeverages && (
      <View style={{ marginBottom: 30, paddingHorizontal: 10 }}>
        <Text style={{ paddingBottom: 10 }} h4>
          Food & Beverages
        </Text>

        <FlatList
          data={foodAndBeverages}
          renderItem={({ item }) => (
            <FoodAndBeveragesCategories
              category={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item._id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            // padding: 10,
          }}
          contentContainerStyle={
            {
              // paddingTop: 10,
              // paddingBottom: 150,
            }
          }
        />

        <View>
          <Button
            title='View All'
            color={"#33056F"}
            containerStyle={{
              borderRadius: 7,
            }}
            onPress={() => navigation.navigate("Food And Beverages")}
          />
        </View>
      </View>
    )
  );
};

export default FoodAndBeverages;
