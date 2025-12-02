import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../app/auth/AuthContext";
import ThemeContext from "../theme/ThemeContext";
import axios from "axios";

const API_BASE_URL = "https://884a9edb-2422-4222-b55a-b7d6b7be530a.us-east-1.cloud.genez.io";

const ReceiptScanner = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePickReceipt = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "You must allow camera access to scan receipts.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await handleScanReceipt(result.assets[0].uri);
    }
  };

  const handleScanReceipt = async (uri) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("receipt", {
        uri,
        type: "image/jpeg",
        name: "receipt.jpg",
      });
      formData.append("userId", user?.userId);

      const res = await axios.post(`${API_BASE_URL}/api/receipts/scan`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.addedToExpenses) {
        Alert.alert("✅ Success", "Receipt scanned and added to expenses!");
      } else if (res.data?.duplicate) {
        Alert.alert("ℹ️ Already Exists", "This receipt is already in your expenses.");
      } else {
        Alert.alert("⚠️ Notice", "Receipt processed, but no matching data found.");
      }
    } catch (err) {
      console.error("❌ Error scanning receipt:", err);
      Alert.alert("Error", "Failed to process receipt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardbg3 }]}>
      <Text style={[styles.title, { color: theme.color }]}>📸 Scan Receipt</Text>

      <TouchableOpacity style={styles.button} onPress={handlePickReceipt} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Processing..." : "Scan New Receipt"}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#FF5733" style={{ marginTop: 10 }} />}

      {image && <Image source={{ uri: image }} style={styles.preview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FF5733",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ReceiptScanner;
