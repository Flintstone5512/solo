import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const GoalsForm = ({ userId, goalData, setGoalData }) => {
  const handleChange = (period, value) => {
    setGoalData(prev => ({
      ...prev,
      [period]: parseFloat(value) || 0
    }));
  };

  const saveGoals = async () => {
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/goal`, {
        userId,
        ...goalData
      });
      Alert.alert("Success", "Goals saved successfully!");
    } catch (err) {
      console.error("Failed to save goals:", err);
      Alert.alert("Error", "Failed to save goals.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Set Your Savings Goals</Text>
      {['daily', 'weekly', 'monthly', 'yearly'].map(period => (
        <TextInput
          key={period}
          placeholder={`${period.charAt(0).toUpperCase() + period.slice(1)} Goal ($)`}
          keyboardType="numeric"
          style={styles.input}
          value={String(goalData[period] || '')}
          onChangeText={(val) => handleChange(period, val)}
        />
      ))}
      <Button title="Save Goals" onPress={saveGoals} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, marginBottom: 30 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 }
});

export default GoalsForm;
