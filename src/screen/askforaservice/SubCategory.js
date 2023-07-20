import React from "react";
import SubCategoryShell from "../../components/shells/SubCategoryShell";
import {
  AdsBanners,
} from "../../model/data";
import AskForAServiceProductsPanel from "../../components/askforaservice/AskForAServiceProductsPanel";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import axiosInstance from "../../utils/interceptor";
import { View, Text } from "react-native";
import Loader from "../../components/general/loader/Loader";
import { screenWidth } from "../../utils/Dimensions";

export default function AskForAServiceSubCategory({ navigation, route }) {
  const [activeId, setActiveID] = useState(null);
  const [servicesSubcategory, setServicesSubcategory] = useState([]);

  const fetchServicesSubcategory = async ({ pageParam = 0 }) => {
    try {
      if (pageParam === 0) setServicesSubcategory([]);

      const { data } = await axiosInstance.get(
        `/service/type?page=${pageParam + 1}&limit=20&service=${
          route.params._id
        }`
      );

      pageParam === 0
        ? setServicesSubcategory(data.message)
        : setServicesSubcategory([...servicesSubcategory, ...data.message]);

        if(pageParam === 0) setActiveID(data.message[0]?._id)

      return { next: data.hasNextPage };
    } catch (error) {
      console.log(error);
    }
  };

  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["servicesSubcategory"],
    fetchServicesSubcategory,
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
      subCategory={servicesSubcategory}
      activePage={activeId}
      navigation={navigation}
      type={"Ask For A Service"}
      setActiveID={setActiveID}
      loadMore={loadMore}>
      {activeId ? (
        <AskForAServiceProductsPanel
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
