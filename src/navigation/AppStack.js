import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DailyNeedsScreen from "../screen/dailyneeds";
import FoodAndBeveragesScreen from "../screen/foodandbeverages";
import AskForAServicesScreen from "../screen/askforaservice";
import NotificationScreen from "../screen/home/notification";
import SearchScreen from "../screen/home/search";
import DailyNeedsSubCategory from "../screen/dailyneeds/SubCategory";
import FoodAndBeveragesSubCategory from "../screen/foodandbeverages/SubCategory";
import AskForAServiceSubCategory from "../screen/askforaservice/SubCategory";
import FooterNavigation from "./FooterStack";
import ProductDetailsPage from "../screen/dailyneeds/ProductDetails";
import FoodAndBeveragesProductDetailsPage from "../screen/foodandbeverages/ProductDetails";
import AskForAServiceProductDetailsPage from "../screen/askforaservice/ProductDetails";
import TimeSlotScreen from "../screen/askforaservice/TimeSlot";
import MenuStack from "./MenuStack";
import SupportScreen from "../screen/support";
import SuggestionsScreen from "../screen/suggestions";
import ComplaintsScreen from "../screen/complaints";
import PrivacyPolicyScreen from "../screen/privacyPolicy";
import TicketDetailsScreen from "../screen/complaints/TicketDetails";
import ChangeLanguageScreen from "../screen/changeLanguage";
import OffersAndPromosScreen from "../screen/Offers";
import PaymentsScreen from "../screen/payments";
import AddNewAddress from "../screen/payments/AddNewAddress";
import { useSelector } from "react-redux";
import OrderDetailsScreen from "../screen/orderhistory/OrderDetails";
import SearchResultsScreen from "../screen/home/search/SearchResults";
import AddressScreen from "../screen/profile/address";
import CartScreen from "../screen/cart";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={user.isOnboardingCompleted ? "Homepage" : "Onboarding"}
    >
      <Stack.Screen
        name="Homepage"
        component={FooterNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="Menu" component={MenuStack} />
      <Stack.Screen
        name="Daily Needs"
        component={DailyNeedsScreen}
        options={{
          title: "Daily Needs",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="DailyNeeds Subcategories"
        component={DailyNeedsSubCategory}
        options={{
          title: "Daily Needs",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="DailyNeeds ProductDetails"
        component={ProductDetailsPage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Food And Beverages"
        component={FoodAndBeveragesScreen}
        options={{
          title: "Food And Beverages",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Food And Beverages Subcategories"
        component={FoodAndBeveragesSubCategory}
        // component={DailyNeedsSubCategory}
        // component={SubCategoryShell}
        options={{
          title: "Food And Beverages",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="FoodAndBeverages ProductDetails"
        component={FoodAndBeveragesProductDetailsPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ask for a Service"
        component={AskForAServicesScreen}
        options={{
          title: "Ask for a Service",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Ask For A Service Subcategories"
        component={AskForAServiceSubCategory}
        // component={DailyNeedsSubCategory}
        // component={SubCategoryShell}
        options={{
          title: "Ask For A Service",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="AskForAService ProductDetails"
        component={AskForAServiceProductDetailsPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "NOTIFICATIONS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Choose Timeslot"
        component={TimeSlotScreen}
        options={{
          title: "CHOOSE TIME-SLOT",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          title: "PAYMENTS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Select Address"
        component={AddressScreen}
        options={{
          title: "SELECT ADDRESS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="New Address"
        component={AddNewAddress}
        options={{
          title: "ADD NEW ADDRESS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{
          title: "ORDER DETAILS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="Offers and Promos"
        component={OffersAndPromosScreen}
        options={{
          title: "OFFERS AND PROMOS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="Change Language"
        component={ChangeLanguageScreen}
        options={{
          title: "CHANGE LANGUAGE",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="Complaints"
        component={ComplaintsScreen}
        options={{
          title: "COMPLAINTS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="Ticket Details"
        component={TicketDetailsScreen}
        options={{
          title: "TICKET DETAILS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
          title: "PRIVACY POLICY",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="Suggestions"
        component={SuggestionsScreen}
        options={{
          title: "SUGGESTIONS",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          title: "SUPPORT",
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Search Result"
        component={SearchResultsScreen}
        options={({route})=>({
          title: route.params.data,
          headerStyle: {
            backgroundColor: "#33056F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        })}
      />
    </Stack.Navigator>
  );
}
