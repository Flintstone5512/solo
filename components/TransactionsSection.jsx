// components/TransactionsSection.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const TransactionsSection = ({ transactions }) => {
  const renderItem = ({ item }) => {
    const isExpense = item.amount < 0;
    const displayAmount = (item.amount / 100).toFixed(2);

    return (
      <View style={styles.row}>
        <View style={styles.details}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.name}>{item.name || item.source || "Transaction"}</Text>
        </View>
        <Text style={[styles.amount, isExpense ? styles.expense : styles.income]}>
          {isExpense ? `- $${Math.abs(displayAmount)}` : `+ $${displayAmount}`}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Recent Transactions</Text>
      {transactions.length === 0 ? (
        <Text style={styles.empty}>No transactions found</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => item.transactionId || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default TransactionsSection;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  list: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  details: {
    flexDirection: "column",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
  },
  amount: {
    fontSize: 14,
    fontWeight: "600",
  },
  expense: {
    color: "#FF4D4F",
  },
  income: {
    color: "#00C49F",
  },
  empty: {
    textAlign: "center",
    paddingVertical: 20,
    color: "#888",
  },
});
