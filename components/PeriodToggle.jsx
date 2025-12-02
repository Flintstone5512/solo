// components/PeriodToggle.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const periods = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

export default function PeriodToggle({ selected, onChange }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period}
          onPress={() => onChange(period)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
            backgroundColor: selected === period ? '#7c00ff' : '#eee'
          }}
        >
          <Text style={{ color: selected === period ? '#fff' : '#000', fontWeight: 'bold' }}>{period}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
