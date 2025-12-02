import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const MoneyStackChartExpo = ({ income = 0, expenses = 0, goalData = {}, selectedPeriod = "daily" }) => {
  const screenWidth = Dimensions.get("window").width;

  const periodKey = selectedPeriod.toLowerCase();
  const goal = goalData?.[periodKey] || 0;

  const data = {
    labels: ["Goal", "Income", "Expenses"],
    datasets: [
      {
        data: [goal, income, expenses],
        colors: [
          () => "#7C00FF", // Purple for Goal
          () => "#00C49F", // Teal Green for Income
          () => "#FF6B6B", // Coral Red for Expenses
        ],
      },
    ],
  };

  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 }}>
        {selectedPeriod} Overview
      </Text>
      <BarChart
        data={data}
        width={screenWidth - 32}
        height={240}
        chartConfig={{
          backgroundGradientFrom: "#F9F9FF",
          backgroundGradientTo: "#EAF6FF",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(124, 0, 255, ${opacity})`,
          labelColor: () => "#1C1C1C",
        }}
        fromZero
        showValuesOnTopOfBars
        withCustomBarColorFromData
        flatColor
        style={{ borderRadius: 12 }}
      />
    </View>
  );
};

export default MoneyStackChartExpo;
