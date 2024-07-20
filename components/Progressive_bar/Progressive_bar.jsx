import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const ProgressiveBar = ({ percentage, color }) => {
    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: percentage,
            duration: 1000,
            delay: 1000,
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.progressBar, { height: heightAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
            }), backgroundColor: color }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 18,
        height: 150,
        backgroundColor: '#CCCCCC',
        borderRadius: 30,
        overflow: 'hidden',
        justifyContent: 'flex-end',  
    },
    progressBar: {
        width: '100%',
        borderRadius: 30,
        position: 'absolute',  
        bottom: 0,  
    },
});

export default ProgressiveBar;
