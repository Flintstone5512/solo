import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const BillsForm = ({ userId, bills, setBills }) => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    amount: '',
    dueDate: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const submitBill = async () => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/bills`, {
        userId,
        ...form,
        amount: parseFloat(form.amount)
      });
      setBills([...bills, res.data]);
      setForm({ name: '', type: '', amount: '', dueDate: '' });
      Alert.alert("Success", "Bill added!");
    } catch (err) {
      console.error("Error submitting bill:", err);
      Alert.alert("Error", "Could not save bill.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Add a Bill</Text>
      <TextInput placeholder="Bill Name" style={styles.input} value={form.name} onChangeText={val => handleChange('name', val)} />
      <TextInput placeholder="Type" style={styles.input} value={form.type} onChangeText={val => handleChange('type', val)} />
      <TextInput placeholder="Amount" keyboardType="numeric" style={styles.input} value={form.amount} onChangeText={val => handleChange('amount', val)} />
      <TextInput placeholder="Due Date (YYYY-MM-DD)" style={styles.input} value={form.dueDate} onChangeText={val => handleChange('dueDate', val)} />
      <Button title="Add Bill" onPress={submitBill} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, marginBottom: 30 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 }
});

export default BillsForm;
