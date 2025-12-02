import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MoneyStackChartExpoEmoji = ({ income, expenses, goalData, selectedPeriod }) => {
  const MAX_BILLS = 20; // how many bills max
  const BILL_HEIGHT = 12;
  const BILL_WIDTH = 40;

  // Pick goal based on period
  const goal =
    selectedPeriod === "Daily"
      ? goalData.daily
      : selectedPeriod === "Weekly"
      ? goalData.weekly
      : selectedPeriod === "Monthly"
      ? goalData.monthly
      : goalData.yearly;

  // Make sure scale never collapses
  const safeGoal = Math.max(goal || 0, income + expenses, 1);

  // Convert to bill counts
  const incomeBills = Math.min(MAX_BILLS, Math.round((income / safeGoal) * MAX_BILLS));
  const expenseBills = Math.min(MAX_BILLS, Math.round((expenses / safeGoal) * MAX_BILLS));

  // Fillers for empty space
  const filledBills = incomeBills + expenseBills;
  const remainingBills = Math.max(0, MAX_BILLS - filledBills);

  return (
    <View style={styles.container}>
      <View style={[styles.stackContainer, { height: MAX_BILLS * BILL_HEIGHT + 40 }]}>
        {/* Goal Marker */}
        <Text style={styles.goalText}>
          🎯 {selectedPeriod} Goal: ${goal.toFixed(2)}
        </Text>

        {/* Income Bills (green) */}
        {Array.from({ length: incomeBills }).map((_, i) => (
          <Image
            key={`income-${i}`}
            source={require("../assets/images/dollarbill.png")}
            style={[
              styles.bill,
              { bottom: i * BILL_HEIGHT, tintColor: "green" },
            ]}
          />
        ))}

        {/* Expense Bills (red, stacked on top of income) */}
        {Array.from({ length: expenseBills }).map((_, i) => (
          <Image
            key={`expense-${i}`}
            source={require("../assets/images/dollarbill.png")}
            style={[
              styles.bill,
              {
                bottom: (incomeBills + i) * BILL_HEIGHT,
                tintColor: "red",
                opacity: 0.85,
              },
            ]}
          />
        ))}

        {/* Remaining Bills (grey, stacked to fill container) */}
        {Array.from({ length: remainingBills }).map((_, i) => (
          <Image
            key={`remaining-${i}`}
            source={require("../assets/images/dollarbill.png")}
            style={[
              styles.bill,
              {
                bottom: (filledBills + i) * BILL_HEIGHT,
                tintColor: "grey",
                opacity: 0.3,
              },
            ]}
          />
        ))}
      </View>

      {/* Labels */}
      <View style={styles.numbers}>
        <Text>💵 Income: ${income.toFixed(2)}</Text>
        <Text>🔴 Expenses: ${expenses.toFixed(2)}</Text>
        <Text>🎯 Goal: ${goal.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default MoneyStackChartExpoEmoji;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  stackContainer: {
    width: 60,
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden", // prevents overflow bleed
  },
  bill: {
    position: "absolute",
    width: 40,
    height: 12,
    resizeMode: "contain",
  },
  goalText: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  numbers: {
    marginTop: 20,
    alignItems: "center",
  },
});
