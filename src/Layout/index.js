import { useState } from "react"
import AppStack from "../navigation/AppStack";
import AuthStack from "../navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { fetchUsers } from "../store/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import OtherFeaturesStack from "../navigation/OtherFeaturesStack";
import {useNetInfo} from "@react-native-community/netinfo";
import { getAsyncStorage } from "../utils/extra";

const Layout = () => {
  const { user, isLogin } = useSelector((state) => state.auth);
  const [refreshToken, setRefreshToken] = useState(null);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  useEffect(() => {
    (async ()=>{
      let refreshToken = await getAsyncStorage("refreshToken");
      setRefreshToken(refreshToken || "login");

      if (refreshToken && !user) dispatch(fetchUsers());
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLogin]);


  console.log(isLogin && netInfo.isConnected && user && !user?.isPresent)

  return (
    <NavigationContainer>
      {isLogin && netInfo.isConnected && user && user?.isPresent && user?.contact?.isActive && <AppStack />}
      {!isLogin && netInfo.isConnected && refreshToken == "login" &&  <AuthStack />}
      {isLogin && netInfo.isConnected && user && !user?.isPresent &&  <OtherFeaturesStack shownItem={"Comingsoon"}/>}
      {isLogin && user && netInfo.isConnected && user?.isPresent && !user.contact?.isActive &&  <OtherFeaturesStack shownItem={"Maintenance"}/>}
      {!netInfo.isConnected&& <OtherFeaturesStack shownItem={"Network Failure"}/>}
      
    </NavigationContainer>
  );
};

export default Layout;
