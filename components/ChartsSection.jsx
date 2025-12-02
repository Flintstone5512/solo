// components/ChartsSection.jsx
import React, { useEffect, useState, useContext } from "react";
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import AuthContext from "../app/auth/AuthContext"; // adjust path if your project stores AuthContext elsewhere
import { getCategoryBreakdown } from "../app/services/api"; // adjust path if different
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function ChartsSection({ income = 0, expenses = 0, selectedPeriod = "Monthly" }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [loadingBreakdown, setLoadingBreakdown] = useState(false);
  const [breakdown, setBreakdown] = useState([]); // expected: [{ category: 'Food', amount: 120 }, ...]
  const [error, setError] = useState(null);

  // Defensive paid / subscription check (tweak to your actual user schema)
  const isPaid =
    !!user &&
    (!!user.isPaid || !!user.subscription?.isActive || user.role === "paid" || user.is_pro === true);

  // Base summary chart data (kept exactly as before)
  const chartData = [
    { name: "Income", amount: Number(income || 0), color: "#4CAF50", legendFontColor: "#1C1C1C", legendFontSize: 14 },
    { name: "Expenses", amount: Number(expenses || 0), color: "#FF4D6D", legendFontColor: "#1C1C1C", legendFontSize: 14 },
  ];

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!isPaid || !user?.userId) {
        setBreakdown([]);
        return;
      }
      setLoadingBreakdown(true);
      setError(null);
      try {
        const list = await getCategoryBreakdown(user.userId, selectedPeriod.toLowerCase());
        if (!mounted) return;
        // Expecting backend to return [{ category, amount }]
        setBreakdown(Array.isArray(list) ? list : []);
      } catch (e) {
        if (!mounted) return;
        setError("Failed to load detailed breakdown");
        console.error("ChartsSection breakdown error:", e);
      } finally {
        if (mounted) setLoadingBreakdown(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [user?.userId, isPaid, selectedPeriod]);

  // Map breakdown to chart-kit format
  const detailedChartData = breakdown
    .filter((b) => Number(b.amount) > 0)
    .map((b, i) => ({
      name: b.category || `Category ${i + 1}`,
      amount: Number(b.amount || 0),
      color: b.color || getColorForIndex(i),
      legendFontColor: "#1C1C1C",
      legendFontSize: 12,
    }));

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>💸 Your Money Overview</Text>

      {/* Always-visible simple pie */}
      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => "#7C00FF",
          labelColor: () => "#1C1C1C",
        }}
        style={{ borderRadius: 12, marginTop: 12 }}
      />

      {/* Paid-only detailed breakdown */}
      <View style={{ marginTop: 16 }}>
        {isPaid ? (
          <>
            <Text style={styles.sectionTitle}>Detailed breakdown ({selectedPeriod})</Text>

            {loadingBreakdown ? (
              <ActivityIndicator style={{ marginTop: 12 }} />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : detailedChartData.length === 0 ? (
              <Text style={styles.emptyText}>No detailed data available for this period.</Text>
            ) : (
              <PieChart
                data={detailedChartData}
                width={screenWidth - 40}
                height={260}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: () => "#7C00FF",
                  labelColor: () => "#1C1C1C",
                }}
                style={{ borderRadius: 12, marginTop: 8 }}
              />
            )}
          </>
        ) : (
          // Locked view for non-paid users
          <View style={styles.lockCard}>
            <Text style={styles.lockTitle}>Unlock detailed breakdown</Text>
            <Text style={styles.lockDesc}>See income & expense categories, trends and insights — available for premium users.</Text>
            <TouchableOpacity style={styles.upgradeBtn} onPress={() => router.push("/pricing")}>
              <Text style={styles.upgradeText}>Upgrade to Pro</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

// small deterministic palette
function getColorForIndex(i) {
  const palette = ["#7C00FF", "#FFAF2A", "#4CAF50", "#2196F3", "#FF6B6B", "#9C27B0", "#00BCD4"];
  return palette[i % palette.length];
}

const styles = {
  sectionTitle: { fontSize: 16, fontWeight: "700", marginTop: 8, marginBottom: 6, textAlign: "center" },
  lockCard: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
  },
  lockTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  lockDesc: { fontSize: 13, color: "#666", textAlign: "center", marginBottom: 12 },
  upgradeBtn: { backgroundColor: "#7C00FF", paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 },
  upgradeText: { color: "#fff", fontWeight: "700" },
  errorText: { color: "#d12", textAlign: "center", marginTop: 8 },
  emptyText: { color: "#666", textAlign: "center", marginTop: 8 },
};
