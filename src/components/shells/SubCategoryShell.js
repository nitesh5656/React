import { View } from "react-native";
import React from "react";
import Advertisements from "../general/advertisments";
import SubCategoryNavigation from "../general/subCategory";
import { screenWidth } from "../../utils/Dimensions";

export default function SubCategoryShell({
  navigation,
  adv,
  subCategory,
  activePage,
  type,
  children,
  loadMore,
  setActiveID,
}) {
  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* <Advertisements data={adv} /> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          backgroundColor: "#E7D6FD",
          flex: 1,
        }}>
        {subCategory.length > 0 && (
          <SubCategoryNavigation
            data={subCategory}
            navigation={navigation}
            loadMore={loadMore}
            activePage={activePage}
            type={type}
            setActiveID={setActiveID}
          />
        )}
        <View style={{ width: screenWidth - 70 }}>{children}</View>
      </View>
    </View>
  );
}
