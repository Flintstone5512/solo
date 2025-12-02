import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const IncomeForm = ({ userId, onNewIncome }) => {
  const [form, setForm] = useState({
    source: '',
    amount: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const submitIncome = async () => {
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/income`, {
        userId,
        source: form.source,
        amount: parseFloat(form.amount)
      });
      setForm({ source: '', amount: '' });
      onNewIncome();
      Alert.alert("Success", "Income added!");
    } catch (err) {
      console.error("Error submitting income:", err);
      Alert.alert("Error", "Could not add income.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Add Manual Income</Text>
      <TextInput placeholder="Source" style={styles.input} value={form.source} onChangeText={val => handleChange('source', val)} />
      <TextInput placeholder="Amount" keyboardType="numeric" style={styles.input} value={form.amount} onChangeText={val => handleChange('amount', val)} />
      <Button title="Add Income" onPress={submitIncome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, marginBottom: 30 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 }
});

export default IncomeForm;
