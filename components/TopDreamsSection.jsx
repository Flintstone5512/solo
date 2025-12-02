import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AuthContext from "../app/auth/AuthContext";
import { getDreams } from "../app/services/api";

const TopDreamsSection = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const userId = user?.userId;
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      const list = await getDreams(userId);
      // Sort by progress (highest first)
      const sorted = list.sort((a, b) => (b.progress || 0) - (a.progress || 0));
      setDreams(sorted.slice(0, 3)); // top 3
    };
    load();
  }, [userId]);

  if (!dreams.length) return null;

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Dreams</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Dreams")}>
          <Text style={styles.link}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dreams.map((dream) => (
          <View key={dream._id} style={styles.card}>
            <Text style={styles.name}>{dream.name}</Text>
            <View style={styles.barOuter}>
              <View style={[styles.barInner, { width: `${dream.progress * 100}%` }]} />
            </View>
            <Text style={styles.amount}>
              ${dream.currentAmount.toFixed(2)} / ${dream.targetAmount.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopDreamsSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "700", color: "#1a1a1a" },
  link: { color: "#7C00FF", fontWeight: "600" },
  card: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  name: { fontSize: 14, fontWeight: "700", color: "#1a1a1a", marginBottom: 6 },
  barOuter: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 6,
  },
  barInner: {
    height: 8,
    backgroundColor: "#7C00FF",
  },
  amount: { fontSize: 12, color: "#666" },
});
