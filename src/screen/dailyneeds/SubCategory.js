import React from "react";
import SubCategoryShell from "../../components/shells/SubCategoryShell";
import {
  AdsBanners,
  CookingIngredientsData,
  FloursData,
  MasalaAndSpicesData,
  RiceProductsData,
} from "../../model/data";
import DailyNeedsProductsPanel from "../../components/dailyneeds/DailyNeedsProductsPanel";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import axiosInstance from "../../utils/interceptor";
import { View, Text } from "react-native";
import Loader from "../../components/general/loader/Loader";
import { screenWidth } from "../../utils/Dimensions";

export default function DailyNeedsSubCategory({ navigation, route }) {
  const [activeId, setActiveID] = useState(null);
  const [dailyNeedsSubcategory, setDailyNeedsSubcategory] = useState([]);

  const fetchDailyNeedsSubcategory = async ({ pageParam = 0 }) => {
    try {
      if (pageParam === 0) setDailyNeedsSubcategory([]);

      const { data } = await axiosInstance.get(
        `/dailyneeds/children/${route.params._id}?page=${
          pageParam + 1
        }&limit=20`
      );

      pageParam === 0
        ? setDailyNeedsSubcategory(data.message)
        : setDailyNeedsSubcategory([...dailyNeedsSubcategory, ...data.message]);

        if(pageParam === 0) setActiveID(data.message[0]?._id)

      return { next: data.hasNextPage };
    } catch (error) {
      console.log(error);
    }
  };

  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["dailyNeedsSubcategory"],
    fetchDailyNeedsSubcategory,
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

  console.log(activeId);
  
  return (
    <SubCategoryShell
      adv={AdsBanners}
      subCategory={dailyNeedsSubcategory}
      navigation={navigation}
      activePage={activeId}
      type={"Daily Needs"}
      setActiveID={setActiveID}
      loadMore={loadMore}>
      {activeId ? (
        <DailyNeedsProductsPanel navigation={navigation} activeId={activeId} />
      ) : (
        <View style={{
          flex: 1,
          width: screenWidth,
        }}>
          {/* <Text>We will show animation here !</Text> */}
          <Loader navigation={navigation} />
        </View>
      )}
    </SubCategoryShell>
  );
}
