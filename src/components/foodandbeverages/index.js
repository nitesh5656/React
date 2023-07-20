import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { styles } from "./FoodAndBeveragesStyles";
import { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { Card } from "@rneui/themed";
import { IMAGE_URL } from "@env";
import { useInfiniteQuery } from "react-query";
import axiosInstance from "../../utils/interceptor";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const categoryImgWidth = screenWidth / 3 - 10;

export default function FoodAndBeveragesPanel({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const [foodAndBeverages, setFoodAndBeverages] = useState(null);
  const isCarousel = useRef(null);

  const fetchFoodAndBeverages = async ({ pageParam = 0 }) => {
    try {
      if (pageParam === 0) setFoodAndBeverages([]);

      const { data } = await axiosInstance.get(
        `/restaurant?page=${pageParam + 1}&limit=20`
      );

      pageParam === 0
        ? setFoodAndBeverages(data.message)
        : setFoodAndBeverages([...foodAndBeverages, ...data.message]);

      return { next: data.hasNextPage };
    } catch (error) {
      console.log(error);
    }
  };

  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["foodAndBeverages"],
    fetchFoodAndBeverages,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.next) return pages.length;
      },
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.carouselContainer} key={index}>
        <Image source={item?.img} style={styles.image} />
      </View>
    );
  };

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const FoodAndBeveragesCategory = ({ navigation, category }) => {
    let nameKey =
      user?.language == "ENGLISH"
        ? "name"
        : user?.language?.toLowerCase() + "Name";
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
    <View style={styles.container}>
      <View>
        <Carousel
          layout='default'
          ref={isCarousel}
          data={[]}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={SLIDER_WIDTH}
          loop
          autoplay
        />

        <FlatList
          data={foodAndBeverages}
          renderItem={({ item }) => (
            <FoodAndBeveragesCategory category={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 150,
          }}
          onEndReached={loadMore}
        />
      </View>
    </View>
  );
}
