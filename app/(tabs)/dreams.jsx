// app/dreams/index.jsx
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import AuthContext from "../auth/AuthContext"; // your existing context
import { getDreams, createDream, contributeToDream, deleteDream } from "../services/api";
import DreamCard from "../../components/DreamCard";
import DreamContributeModal from "../../components/DreamContributeModal";

const Dreams = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.userId;

  const [dreams, setDreams] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", targetAmount: "", targetDate: "" });

  const [modal, setModal] = useState({ visible: false, goalId: null, name: "" });

  const load = async () => {
    if (!userId) return;
    const list = await getDreams(userId);
    setDreams(list);
  };

  useEffect(() => { load(); }, [userId]);

  const create = async () => {
    try {
      const payload = {
        userId,
        name: createForm.name.trim(),
        targetAmount: parseFloat(createForm.targetAmount || 0),
        targetDate: createForm.targetDate ? new Date(createForm.targetDate) : undefined,
        allocationRule: { mode: "digit_micro", maxDaily: 5 }, // default Digit-style
      };
      if (!payload.name || !payload.targetAmount) return Alert.alert("Missing info", "Name and Target are required.");
      await createDream(payload);
      setShowCreate(false);
      setCreateForm({ name: "", targetAmount: "", targetDate: "" });
      load();
    } catch (e) {
      Alert.alert("Error", "Failed to create dream.");
    }
  };

  const contribute = async (amount) => {
    try {
      await contributeToDream(modal.goalId, amount);
      setModal({ visible: false, goalId: null, name: "" });
      load();
    } catch {
      Alert.alert("Error", "Failed to contribute.");
    }
  };

  const remove = async (id) => {
    Alert.alert("Delete Dream", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => { await deleteDream(id); load(); } },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.h1}>Your Dreams</Text>

      {/* Create panel */}
      {showCreate ? (
        <View style={styles.panel}>
          <Text style={styles.h2}>Create Dream</Text>
          <TextInput style={styles.input} placeholder="Name (e.g., Bali Trip)" value={createForm.name}
            onChangeText={(v) => setCreateForm((s) => ({ ...s, name: v }))} />
          <TextInput style={styles.input} placeholder="Target Amount ($)" keyboardType="numeric" value={createForm.targetAmount}
            onChangeText={(v) => setCreateForm((s) => ({ ...s, targetAmount: v }))} />
          <TextInput style={styles.input} placeholder="Target Date (YYYY-MM-DD)" value={createForm.targetDate}
            onChangeText={(v) => setCreateForm((s) => ({ ...s, targetDate: v }))} />
          <View style={styles.rowEnd}>
            <TouchableOpacity onPress={() => setShowCreate(false)} style={styles.ghost}><Text>Cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={create} style={styles.primary}><Text style={styles.primaryText}>Save</Text></TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setShowCreate(true)} style={styles.addBtn}>
          <Text style={styles.addBtnText}>＋ Add Dream</Text>
        </TouchableOpacity>
      )}

      {/* List */}
      {dreams.map((d) => (
        <View key={d._id} style={{ marginBottom: 10 }}>
          <DreamCard
            dream={d}
            onContributePress={() => setModal({ visible: true, goalId: d._id, name: d.name })}
            onEditPress={() => setShowCreate(true) /* (for v1, reuse create panel to edit) */}
          />
          <TouchableOpacity onPress={() => remove(d._id)} style={styles.deleteLink}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}

      <DreamContributeModal
        visible={modal.visible}
        dreamName={modal.name}
        onClose={() => setModal({ visible: false, goalId: null, name: "" })}
        onSubmit={contribute}
      />
    </ScrollView>
  );
};

export default Dreams;

const styles = StyleSheet.create({
  wrap: { padding: 16, paddingBottom: 40 },
  h1: { fontSize: 22, fontWeight: "800", color: "#1a1a1a", marginBottom: 12 },
  panel: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 14,
           shadowColor: "#000", shadowOpacity: 0.06, shadowOffset: { width: 0, height: 3 }, shadowRadius: 8, elevation: 2 },
  h2: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginTop: 8 },
  rowEnd: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 12 },
  ghost: { paddingVertical: 10, paddingHorizontal: 12 },
  primary: { backgroundColor: "#7C00FF", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16 },
  primaryText: { color: "#fff", fontWeight: "700" },
  addBtn: { borderStyle: "dashed", borderWidth: 1.5, borderColor: "#7C00FF", borderRadius: 10, padding: 12, alignItems: "center", marginBottom: 12 },
  addBtnText: { color: "#7C00FF", fontWeight: "700" },
  deleteLink: { alignSelf: "flex-end", marginTop: 4, marginRight: 2 },
  deleteText: { color: "#d12", fontSize: 12 },
});
