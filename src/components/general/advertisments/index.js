import { View, Text, Image } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useRef } from "react";
import { AdsBanners } from "../../../model/data";
import { screenWidth } from "../../../utils/Dimensions";
import { styles } from "./AdvertismentsStyles";



export default function Advertisements({data}) {
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
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={screenWidth+80}
        itemWidth={screenWidth+80}
        loop
        autoplay
      />
    </View>
  );
}
