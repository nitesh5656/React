import Carousel from "react-native-snap-carousel";
import { useRef } from "react";
import { Dimensions, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./HomeStyles";
import axiosInstance from "../../utils/interceptor";
import { IMAGE_URL } from "@env";
import { useSelector } from "react-redux";

const Advertisment = () => {
  const { user } = useSelector((state)=>state.auth)
  const [advertisment, setAdvertisment] = useState(null);
  const SLIDER_WIDTH = Dimensions.get("window").width + 80;
  const isCarousel = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/advertisment");
        setAdvertisment(data.message);
      } catch (err) {
        setAdvertisment([]);
      }
    })();
  }, [user.pincode]);

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.carouselContainer} key={index}>
        <Image
          source={{ uri: IMAGE_URL + "/advertisment/" + item?.img }}
          style={styles.carouselImage}
        />
      </View>
    );
  };

  return (
    advertisment &&
    advertisment.length !== 0 && (
      <Carousel
        layout='default'
        ref={isCarousel}
        data={advertisment}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={SLIDER_WIDTH}
        loop
        autoplay
      />
    )
  );
};

export default Advertisment;
