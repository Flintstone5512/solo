import React, { useEffect, useRef, useMemo } from "react";
import { View, Text, Image, Animated, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const MoneyStackChartBar = ({ income = 0, expenses = 0, goal = 1, selectedPeriod = "Daily" }) => {
  const barHeight = 250;
  const validGoal = goal > 0 ? goal : 1;

  // Animated ratios (0..1)
  const incomeRatio = Math.min(Number(income || 0) / validGoal, 1);
  const expensesRatio = Math.min(Number(expenses || 0) / validGoal, 1);

  const incomeAnim = useRef(new Animated.Value(0)).current; // animates ratio
  const expensesAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // animate to the new ratios (0..1)
    Animated.timing(incomeAnim, {
      toValue: incomeRatio,
      duration: 800,
      useNativeDriver: false,
    }).start();

    Animated.timing(expensesAnim, {
      toValue: expensesRatio,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [incomeRatio, expensesRatio, validGoal]);

  // interpolate into pixel heights (0..barHeight)
  const incomeHeight = incomeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, barHeight],
    extrapolate: "clamp",
  });

  const expensesHeight = expensesAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, barHeight],
    extrapolate: "clamp",
  });

  // profit calculation & color
  const profit = useMemo(() => Number(income || 0) - Number(expenses || 0), [income, expenses]);
  const profitColor = profit >= 0 ? "#4CAF50" : "#E53935";

  return (
    <View style={styles.container}>
      {/* 🎯 Goal bullseye + value */}
      <View style={styles.goalWrapper}>
        <Image
          source={require("../assets/images/goal.png")}
          style={styles.goalIcon}
          resizeMode="contain"
        />
        <Text style={styles.goalValue}>${Number(goal || 0).toLocaleString()}</Text>
        <Text style={styles.goalLabel}>Goal ({selectedPeriod})</Text>
      </View>

      {/* Unified dual bar chart */}
      <View style={styles.barRow}>
        <View style={styles.combinedBar}>
          {/* Left column wrapper — positions the colored bar absolutely so it grows from bottom */}
          <View style={styles.halfWrapper}>
            <Animated.View
              style={[
                styles.halfBar,
                {
                  height: incomeHeight,
                  backgroundColor: "#4CAF50",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                },
              ]}
            />
          </View>

          {/* Right column wrapper */}
          <View style={styles.halfWrapper}>
            <Animated.View
              style={[
                styles.halfBar,
                {
                  height: expensesHeight,
                  backgroundColor: "#E53935",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
              ]}
            />
          </View>
        </View>

        {/* Floating icons — their bottom is driven by the corresponding pixel height so they move with bar */}
        <Animated.View style={[styles.iconWrapperLeft, { bottom: incomeHeight }]}>
          <Image source={require("../assets/images/income.png")} style={styles.icon} resizeMode="contain" />
          <Text style={styles.amountText}>${Number(income || 0).toLocaleString()}</Text>
        </Animated.View>

        <Animated.View style={[styles.iconWrapperRight, { bottom: expensesHeight }]}>
          <Image source={require("../assets/images/Tick.png")} style={styles.icon} resizeMode="contain" />
          <Text style={styles.amountText}>${Number(expenses || 0).toLocaleString()}</Text>
        </Animated.View>
      </View>

      {/* Labels with Profit in Center */}
      <View style={styles.labelsRow}>
        <Text style={styles.label}>Income</Text>

        <Text style={[styles.profitLabel, { color: profitColor }]}>
          Profit = ${Number(profit).toLocaleString()}
        </Text>

        <Text style={styles.label}>Expenses</Text>
      </View>
    </View>
  );
};

export default MoneyStackChartBar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  goalWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  goalIcon: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  goalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3629B7",
  },
  goalLabel: {
    fontSize: 12,
    color: "#666",
  },

  /* Bar area */
  barRow: {
    position: "relative",
    width: width * 0.4,
    height: 260,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  combinedBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 250,
    overflow: "hidden",
  },

  /* Each half column wrapper */
  halfWrapper: {
    width: "50%",
    justifyContent: "flex-end", // ensure inner (absolute) bar anchors to bottom visually
    alignItems: "center",
    position: "relative",
  },

  /* The colored bar itself is absolute anchored at bottom via wrapper and height */
  halfBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  iconWrapperLeft: {
    position: "absolute",
    left: "15%",
    alignItems: "center",
  },
  iconWrapperRight: {
    position: "absolute",
    right: "15%",
    alignItems: "center",
  },

  icon: {
    width: 26,
    height: 26,
  },
  amountText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginTop: 2,
  },

  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 0.65,
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
  },
  profitLabel: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
