// components/DreamContributeModal.jsx
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const DreamContributeModal = ({ visible, onClose, onSubmit, dreamName }) => {
  const [amount, setAmount] = useState("");

  const submit = () => {
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) onSubmit(val);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Contribute to “{dreamName}”</Text>
          <TextInput
            placeholder="$ Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />
          <View style={styles.row}>
            <TouchableOpacity onPress={onClose} style={styles.ghost}>
              <Text style={styles.ghostText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submit} style={styles.primary}>
              <Text style={styles.primaryText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DreamContributeModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  card: { width: "88%", backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginTop: 6 },
  row: { flexDirection: "row", justifyContent: "flex-end", gap: 10, marginTop: 14 },
  ghost: { paddingVertical: 10, paddingHorizontal: 12 },
  ghostText: { color: "#444" },
  primary: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: "#7C00FF", borderRadius: 8 },
  primaryText: { color: "#fff", fontWeight: "700" },
});
