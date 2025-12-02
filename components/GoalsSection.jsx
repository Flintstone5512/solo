import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function GoalsSection({ goals, onChange, onSave }) {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginVertical: 10,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        🎯 Set Your Earning Goals
      </Text>

      {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
        <View key={period} style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 5, fontWeight: '600' }}>
            {period.charAt(0).toUpperCase() + period.slice(1)} Goal
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
            }}
            keyboardType="numeric"
            placeholder={`Enter ${period} amount`}
            value={goals[period]?.toString() || ''}
            onChangeText={(val) =>
              onChange({ ...goals, [period]: parseFloat(val) || 0 })
            }
          />
        </View>
      ))}

      <Button title="Save Goals" onPress={onSave} />
    </View>
  );
}
