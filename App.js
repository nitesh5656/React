import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Font from "expo-font";
import { useFonts } from "@expo-google-fonts/pacifico";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SelectProvider } from "@mobile-reality/react-native-select-pro";
import { Provider } from "react-redux";
import { store } from "./src/store/index.js";
import Layout from "./src/Layout";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const loadFonts = async () => {
    await Font.loadAsync({
      "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf"),
      "BreeSerif-Regular": require("./assets/fonts/BreeSerif-Regular.ttf"),
      "KaushanScript-Regular": require("./assets/fonts/KaushanScript-Regular.ttf"),
      "Amaranth-Regular": require("./assets/fonts/Amaranth-Regular.ttf"),
      "Amaranth-Bold": require("./assets/fonts/Amaranth-Bold.ttf"),
    });
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const [fontsLoaded] = useFonts({
    "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf"),
    "BreeSerif-Regular": require("./assets/fonts/BreeSerif-Regular.ttf"),
    "KaushanScript-Regular": require("./assets/fonts/KaushanScript-Regular.ttf"),
    "Amaranth-Regular": require("./assets/fonts/Amaranth-Regular.ttf"),
    "Amaranth-Bold": require("./assets/fonts/Amaranth-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SelectProvider>
            <Layout />
            <StatusBar style='light' backgroundColor='rgba(0,0,0,0.4)' />
            <Toast />
          </SelectProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}
