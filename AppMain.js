import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRootComponent } from "expo";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const getExpoHost = () => {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.manifest2?.extra?.expoGo?.debuggerHost,
    Constants.manifest?.debuggerHost
  ];

  const hostValue = candidates.find(Boolean) ?? "";
  const host = hostValue.split(":")[0];
  return host || "localhost";
};

const getApiBaseUrl = (port) => {
  const host = getExpoHost();
  return `http://${host}:${port}`;
};

const API_BASE_URL = getApiBaseUrl(4106);

function MainApp() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/product`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch(() => setProduct(null));
  }, []);

  const addToCart = async () => {
    const existingCart = JSON.parse((await AsyncStorage.getItem("cart")) || "[]");
    existingCart.push(product);
    await AsyncStorage.setItem("cart", JSON.stringify(existingCart));
    Alert.alert("Saved", "Product added to cart");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {!product ? <Text style={styles.loading}>Loading product...</Text> : null}
        {product ? (
          <View>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Pressable style={styles.button} onPress={addToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ecfeff" },
  loading: { padding: 24, fontSize: 18 },
  image: { width: "100%", height: 300 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#164e63" },
  price: { fontSize: 24, color: "#0891b2", marginVertical: 12 },
  description: { color: "#334155", lineHeight: 22, marginBottom: 24 },
  button: { backgroundColor: "#0891b2", padding: 16, borderRadius: 14, alignItems: "center" },
  buttonText: { color: "#ffffff", fontWeight: "700" }
});

registerRootComponent(MainApp);

export default MainApp;
