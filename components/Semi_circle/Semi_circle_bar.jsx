import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const SemiCircleProgressBar = ({ percentages, colors }) => {
  const radius = 100;
  const strokeWidth = 30;
  const center = radius + strokeWidth / 2;
  const circumference = Math.PI * radius;
  const halfCircumference = circumference / 2;

  const getStrokeDashoffset = (percentage) => {
    return halfCircumference - (halfCircumference * percentage) / 100;
  };

  return (
    <View style={styles.container}>
      <Svg width={center * 2} height={center} viewBox={`0 0 ${center * 2} ${center}`}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          <Path
            d={`M ${center} ${strokeWidth / 2} A ${radius} ${radius} 0 0 1 ${center * 2 - strokeWidth / 2} ${center}`}
            fill="none"
            stroke="#CCCCCC"
            strokeWidth={strokeWidth}
          />
          {percentages.map((percentage, index) => (
            <Path
              key={index}
              d={`M ${center} ${strokeWidth / 2} A ${radius} ${radius} 0 0 1 ${center * 2 - strokeWidth / 2} ${center}`}
              fill="none"
              stroke={colors[index]}
              strokeWidth={strokeWidth}
              strokeDasharray={halfCircumference}
              strokeDashoffset={getStrokeDashoffset(percentage)}
              strokeLinecap="round"
            />
          ))}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default SemiCircleProgressBar;
