import { View, Image, Dimensions, Text, } from "react-native";
import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { styles } from "./DailyNeedsStyles";
import { Card } from "@rneui/themed";
import { GroceriesData, AdsBanners, DailyNeedsData } from "../../model/data";

const screenWidth = Dimensions.get("window").width;
const SLIDER_WIDTH = Dimensions.get("window").width + 80;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const categoryImgWidth = screenWidth / 3 - 10;

export default function DailyNeedsSubCategory({ navigation, route }) {
  const [_id] = useState(route.params._id);

  const isCarousel = useRef(null);



  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.carouselContainer} key={index}>
        <Image source={item?.img} style={styles.image} />
      </View>
    );
  };


  return (
    <View>
      <Carousel
        layout="default"
        //   layoutCardOffset={9}
        ref={isCarousel}
        data={AdsBanners}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_WIDTH}
        //   inactiveSlideShift={0}
        //   useScrollView={true}
        loop
        autoplay
      />

      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#E7D6FD',
      }}>
        <View style={{
          // flex: 1,
          backgroundColor: '#fff',
          width: 70,
          height: '100%',
          paddingTop: 20,
        }}>
          {GroceriesData.map((category) => {
            return (
              <View style={{width: '100%', backgroundColor:'#fff', marginBottom: 20, justifyContent: 'center', alignItems:'center'}}>
              <View style={{width: 55, height: 55, backgroundColor: '#E7D6FD' , borderRadius: 50, justifyContent: 'center', alignItems:'center'}}>
                <Image source={category?.img} style={{
                  width: 40,
                  height: 40,
                }} />
              </View>
              <Text>{category?.name}</Text>
              </View>
            );
          })}
        </View>

        <View style={{paddingTop: 15}}>
        {DailyNeedsData.map((category, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: categoryImgWidth,
                    padding: 0,
                    marginBottom: 10,
                  }}
                >
                  <Card
                    containerStyle={{
                      width: categoryImgWidth,
                      height: categoryImgWidth,
                      padding: 5,
                      margin: 0,
                      borderRadius: 10,
                    }}

                  >
                    <Card.Image
                      style={{
                        padding: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: 7,
                      }}
                      source={category?.img}
                      onPress={() =>navigation.navigate('DailyNeeds Subcategories', { _id: category._id})}
                    />
                  </Card>
                  <Text style={styles.cardTitle}>{category?.name}</Text>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
}
