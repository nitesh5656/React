import React from "react";
import SubCategoryShell from "../../components/shells/SubCategoryShell";
import { AdsBanners } from "../../model/data";
import FoodAndBeveragesProductsPanel from "../../components/foodandbeverages/FoodAndBeveragesProductsPanel";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import axiosInstance from "../../utils/interceptor";
import { View, Text } from "react-native";
import { screenWidth } from "../../utils/Dimensions";
import Loader from "../../components/general/loader/Loader";

export default function FoodAndBeveragesSubCategory({ navigation, route }) {
  const [activeId, setActiveID] = useState(null);
  const [menu, setMenu] = useState([]);

  const fetchRestaurantMenu = async ({ pageParam = 0 }) => {
    try {
      if (pageParam === 0) setMenu([]);

      const { data } = await axiosInstance.get(
        `/restaurant/menu?page=${pageParam + 1}&limit=20&restaurant=${
          route.params._id
        }`
      );

      pageParam === 0
        ? setMenu(data.message)
        : setMenu([...menu, ...data.message]);

        if(pageParam === 0) setActiveID(data.message[0]?._id)

      return { next: data.hasNextPage };
    } catch (error) {
      console.log(error);
    }
  };

  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["restaurantMenu"],
    fetchRestaurantMenu,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.next) return pages.length;
      },
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <SubCategoryShell
      adv={AdsBanners}
      subCategory={menu}
      navigation={navigation}
      activePage={activeId}
      type={"Food And Beverages"}
      setActiveID={setActiveID}
      loadMore={loadMore}>
      {activeId ? (
        <FoodAndBeveragesProductsPanel
          navigation={navigation}
          activeId={activeId}
        />
      ) : (
        <View style={{
          flex: 1,
          width: screenWidth,
        }}>
           <Loader navigation={navigation} />
        </View>
      )}
    </SubCategoryShell>
  );
}
