import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomepageScreen from "../screen/home";
import ProfileScreen from "../screen/profile";
import CartScreen from "../screen/cart";
import OrderHistoryScreen from "../screen/orderhistory";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import EditProfileScreen from "../screen/profile/EditProfile";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={"ProfileScreen"}>
      <Stack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Edit Profile'
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default function FooterNavigation() {
  const { user } = useSelector((user) => user.auth);
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#33056F",
        },
        tabBarInactiveTintColor: "#8e7da8",
        tabBarActiveTintColor: "#fff",
      }}>
      <Tab.Screen
        name='Home'
        component={HomepageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-sharp' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user-alt' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='shopping-cart' color={color} size={size} />
          ),
          tabBarBadge: `${user?.cart?.items?.length > 0 ? user?.cart?.items?.length : ""}`,
          tabBarBadgeStyle: {
            backgroundColor: `${user?.cart?.items?.length > 0 ? "#F37130" : "transparent"}`,
            color: "#fff",
          },
        }}
      />
      <Tab.Screen
        name='Order History'
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='history' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
