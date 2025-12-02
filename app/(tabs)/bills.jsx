import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import Back from "../../assets/images/Back.svg";
import Dark_back from "../../assets/images/White_back.svg";
import { router } from "expo-router";
import axios from "axios";
import ThemeContext from "../../theme/ThemeContext";
import AuthContext from "../auth/AuthContext";
import ReceiptScanner from "../../components/ReceiptScanner";


import { getBills, saveBill } from "../services/api";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://884a9edb-2422-4222-b55a-b7d6b7be530a.us-east-1.cloud.genez.io";


const Bills = () => {
  const back = () => {
    router.push("home");
  };

  const { theme, darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const userId = user?.userId;

  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ name: "", type: "", amount: "", dueDate: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) fetchBills();
  }, [userId]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const data = await getBills(userId);
      setBills(data || []);
    } catch (err) {
      console.error("❌ Failed to fetch bills:", err);
      Alert.alert("Error", "Could not load bills");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.amount || !form.dueDate) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }
    try {
      await saveBill({ userId, ...form, amount: parseFloat(form.amount) });
      setForm({ name: "", type: "", amount: "", dueDate: "" });
      fetchBills();
    } catch (err) {
      console.error("❌ Failed to save bill:", err);
      Alert.alert("Error", "Could not save bill");
    }
  };

  const sendTestMotivation = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/api/motivation/test/${user._id}`);
    alert(`✅ Sent: ${res.data.message}`);
  } catch (err) {
    console.error("Failed to send test motivation:", err);
    alert("❌ Failed to send test motivation");
  }
};


  return (
    <View style={[styles.page, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={back}>
            {darkMode ? <Dark_back /> : <Back />}
          </TouchableOpacity>
          <Text style={[styles.heading, { color: theme.color }]}>Bills</Text>
        </View>
      </View>

      {/* Test Button */}
      <TouchableOpacity style={styles.debugButton} onPress={sendTestMotivation}>
          <Text style={styles.debugButtonText}>🚀 Send Test Motivation</Text>
      </TouchableOpacity>


      {/* Content */}
      <ScrollView style={styles.scroll}>
        <Text style={[styles.sectionTitle, { color: theme.color }]}>📋 Your Bills</Text>

        {bills.length === 0 ? (
          <Text style={{ color: theme.color, textAlign: "center", marginVertical: 12 }}>
            No bills yet
          </Text>
        ) : (
          bills.map((bill, i) => (
            <View key={i} style={[styles.billCard, { backgroundColor: theme.cardbg3 }]}>
              <Text style={styles.billName}>{bill.name}</Text>
              <Text style={styles.billText}>Type: {bill.type}</Text>
              <Text style={styles.billText}>Amount: ${bill.amount}</Text>
              <Text style={styles.billText}>Due: {bill.dueDate}</Text>
            </View>
          ))
        )}

        {/* Add new bill form */}
        <View style={styles.form}>
          <Text style={[styles.sectionTitle, { color: theme.color }]}>➕ Add a Bill</Text>
          <TextInput
            placeholder="Bill Name"
            placeholderTextColor="#888"
            value={form.name}
            onChangeText={(t) => handleChange("name", t)}
            style={styles.input}
          />
          <TextInput
            placeholder="Bill Type"
            placeholderTextColor="#888"
            value={form.type}
            onChangeText={(t) => handleChange("type", t)}
            style={styles.input}
          />
          <TextInput
            placeholder="Amount"
            placeholderTextColor="#888"
            value={form.amount}
            onChangeText={(t) => handleChange("amount", t)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Due Date (YYYY-MM-DD)"
            placeholderTextColor="#888"
            value={form.dueDate}
            onChangeText={(t) => handleChange("dueDate", t)}
            style={styles.input}
          />
          <Button title="Add Bill" onPress={handleSubmit} />
        </View>

        {/* Receipt Scanner — Paywall Protected */}
{user?.subscriptionStatus === "active" ? (
  <ReceiptScanner />
) : (
  <View style={{ marginVertical: 20, alignItems: "center" }}>
    <Text style={{ color: theme.color, marginBottom: 10 }}>
      🔒 Receipt scanning is available for Pro users only.
    </Text>
    <TouchableOpacity
      style={{
        backgroundColor: "#FF5733",
        padding: 12,
        borderRadius: 8,
      }}
      onPress={() => router.push("upgrade")}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Upgrade to Unlock</Text>
    </TouchableOpacity>
  </View>
)}

      </ScrollView>
    </View>
  );
};

export default Bills;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  heading: {
    fontSize: 26,
    lineHeight: 36,
    fontFamily: "Cabin_700Bold",
    textTransform: "capitalize",
  },
  scroll: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  billCard: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  billName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  billText: {
    fontSize: 14,
    marginTop: 2,
  },
  form: {
    marginTop: 20,
    paddingBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "#000",
  },

  debugButton: {
  backgroundColor: "#FF0080",
  paddingVertical: 10,
  borderRadius: 8,
  marginTop: 20,
  },
  debugButtonText: {
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
  fontFamily: "Cabin_700Bold",
  },

});
