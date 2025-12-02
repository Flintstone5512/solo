// components/BillsSection.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const BillsSection = ({ bills, onAddBill }) => {
  const [form, setForm] = useState({ name: '', type: '', amount: '', dueDate: '' });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (form.name && form.amount && form.dueDate) {
      onAddBill({ ...form, amount: parseFloat(form.amount) });
      setForm({ name: '', type: '', amount: '', dueDate: '' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Track Your Bills</Text>
      <TextInput placeholder="Bill Name" value={form.name} onChangeText={v => handleChange('name', v)} style={styles.input} />
      <TextInput placeholder="Bill Type" value={form.type} onChangeText={v => handleChange('type', v)} style={styles.input} />
      <TextInput placeholder="Amount ($)" value={form.amount} keyboardType="numeric" onChangeText={v => handleChange('amount', v)} style={styles.input} />
      <TextInput placeholder="Due Date (YYYY-MM-DD)" value={form.dueDate} onChangeText={v => handleChange('dueDate', v)} style={styles.input} />
      <Button title="Add Bill" onPress={handleSubmit} />
      <FlatList
        data={bills}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - ${item.amount} - {item.dueDate}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 },
  item: { padding: 5, backgroundColor: '#eee', marginBottom: 5 }
});

export default BillsSection;
