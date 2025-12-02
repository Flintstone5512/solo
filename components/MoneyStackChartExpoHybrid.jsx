// components/MoneyStackChartExpoHybrid.js
import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import { BarChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(124, 0, 255, ${opacity})`,
  labelColor: () => "#000",
  barPercentage: 0.5,
};

const billIcon = "https://img.icons8.com/?size=100&id=8KjmxtKj6Qe0&format=png&color=000000"; // you can replace with custom dollar bill PNG/SVG

const MoneyStackChartExpoHybrid = ({ income = 0, expenses = 0, goalData = {}, selectedPeriod = "daily" }) => {
  const screenWidth = Dimensions.get("window").width;
  const periodKey = selectedPeriod.toLowerCase();
  const goal = goalData?.[periodKey] || 0;

  const data = {
    labels: ["Goal", "Income", "Expenses"],
    datasets: [{ data: [goal, income, expenses] }],
  };

  // Convert each value into stacked bill images
  const renderBills = (amount) => {
    const bills = Math.min(Math.floor(amount / 100), 10); // 1 image = $100, max 10 stacked for visuals
    return Array.from({ length: bills }).map((_, i) => (
      <Image key={i} source={{ uri: billIcon }} style={styles.bill} />
    ));
  };

  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={styles.title}>{selectedPeriod} Overview</Text>

      <BarChart
        data={data}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
      />

      {/* Overlay bills under the chart */}
      <View style={styles.overlay}>
        <View style={styles.billStack}>{renderBills(goal)}</View>
        <View style={styles.billStack}>{renderBills(income)}</View>
        <View style={styles.billStack}>{renderBills(expenses)}</View>
      </View>
    </View>
  );
};

export default MoneyStackChartExpoHybrid;

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  overlay: {
    position: "absolute",
    bottom: 40, // aligns with bar base
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 30,
  },
  billStack: { alignItems: "center" },
  bill: { width: 20, height: 20, marginBottom: -5 }, // overlapping bills look like stacks
});
