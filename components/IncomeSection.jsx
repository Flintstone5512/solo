// components/IncomeSection.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const IncomeSection = ({ onAddIncome }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (source && amount) {
      onAddIncome({ source, amount: parseFloat(amount) });
      setSource('');
      setAmount('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Add Other Income</Text>
      <TextInput placeholder="Source" value={source} onChangeText={setSource} style={styles.input} />
      <TextInput placeholder="Amount ($)" value={amount} keyboardType="numeric" onChangeText={setAmount} style={styles.input} />
      <Button title="Add Income" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 }
});

export default IncomeSection;
