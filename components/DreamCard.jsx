// components/DreamCard.jsx
import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";

const PROGRESS_HEIGHT = 10;

const DreamCard = ({ dream, onContributePress, onEditPress }) => {
  const progressPct = Math.min(1, dream?.progress ?? (dream.currentAmount / dream.targetAmount || 0));
  const progressWidth = useMemo(() => new Animated.Value(0), []);
  React.useEffect(() => {
    Animated.timing(progressWidth, { toValue: progressPct, duration: 800, useNativeDriver: false }).start();
  }, [progressPct]);

  const etaText = React.useMemo(() => {
    if (!dream?.targetDate) return "No deadline";
    const daysLeft = Math.max(0, Math.ceil((new Date(dream.targetDate) - new Date()) / (1000 * 60 * 60 * 24)));
    return `${daysLeft} days left`;
  }, [dream?.targetDate]);

  const progressBarStyle = {
    width: progressWidth.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    }),
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{dream?.name}</Text>
        {!!dream?.icon && <Text style={styles.tag}>{dream.icon}</Text>}
      </View>

      <View style={styles.progressWrap}>
        <Animated.View style={[styles.progressFill, progressBarStyle]} />
      </View>

      <View style={styles.row}>
        <Text style={styles.amount}>
          ${Number(dream.currentAmount || 0).toFixed(2)}
          <Text style={styles.muted}> / ${Number(dream.targetAmount || 0).toFixed(2)}</Text>
        </Text>
        <Text style={styles.eta}>{etaText}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.ctaPrimary} onPress={onContributePress}>
          <Text style={styles.ctaPrimaryText}>Contribute</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaGhost} onPress={onEditPress}>
          <Text style={styles.ctaGhostText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DreamCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 16, fontWeight: "700", color: "#1a1a1a" },
  tag: { fontSize: 12, color: "#6b6b6b", backgroundColor: "#f2f2f7", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  progressWrap: { marginTop: 10, height: PROGRESS_HEIGHT, backgroundColor: "#eee", borderRadius: PROGRESS_HEIGHT / 2, overflow: "hidden" },
  progressFill: { height: PROGRESS_HEIGHT, backgroundColor: "#7C00FF", borderRadius: PROGRESS_HEIGHT / 2 },
  row: { marginTop: 10, flexDirection: "row", justifyContent: "space-between" },
  amount: { fontSize: 14, fontWeight: "600", color: "#222" },
  muted: { color: "#888", fontWeight: "400" },
  eta: { fontSize: 12, color: "#666" },
  actions: { marginTop: 12, flexDirection: "row", gap: 10 },
  ctaPrimary: { backgroundColor: "#7C00FF", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  ctaPrimaryText: { color: "#fff", fontWeight: "700" },
  ctaGhost: { paddingVertical: 10, paddingHorizontal: 12 },
  ctaGhostText: { color: "#7C00FF", fontWeight: "700" },
});
