import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Back from "../../assets/images/Back.svg";
import Dark_back from "../../assets/images/White_back.svg";
import { router } from "expo-router";
import ThemeContext from "../../theme/ThemeContext";
import AuthContext from "../auth/AuthContext";

import { getTransactions } from "../services/api";
import TransactionsSection from "../../components/TransactionsSection"; // ✅ use your new component

const Transaction = () => {
  const back = () => {
    router.push("home");
  };

  const { theme, darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const userId = user?.userId;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions(userId);
      console.log("📥 Received userId:", data);
      setTransactions(data || []);
    } catch (err) {
      console.error("❌ Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.transaction_page, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={back}>
            {darkMode ? <Dark_back /> : <Back />}
          </TouchableOpacity>
          <Text style={[styles.heading, { color: theme.color }]}>Transactions</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 20, color: theme.color }}>
            Loading transactions...
          </Text>
        ) : (
          <TransactionsSection transactions={transactions} />
        )}
      </ScrollView>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  transaction_page: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    color: "#121212",
    textTransform: "capitalize",
  },
});
