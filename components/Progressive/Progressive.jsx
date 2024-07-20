import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { Cabin_700Bold } from '@expo-google-fonts/cabin';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { duration_data, progressive_days } from '../../components/Data/Data';
import ProgressiveBar from '../Progressive_bar/Progressive_bar';
import ThemeContext from '../../theme/ThemeContext';


const Progressive = () => {
    const { theme,  darkMode } = useContext(ThemeContext);
    const [activecircle, setActivecircle] = useState(duration_data[0].id);

    const click = (id) => {
        setActivecircle(id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.balance_row}>
                <View style={styles.balance_column1}>
                    <Text style={[styles.balance, {color:theme.color3}]}>Total Balance</Text>
                    <Text style={styles.amount}>$3,469.52</Text>
                </View>
                <View style={styles.duration_container}>
                    {duration_data.map((d) => (
                        <TouchableOpacity
                            style={[styles.circle, activecircle === d.id && styles.activecircle]}
                            key={d.id}
                            onPress={() => click(d.id)}
                        >
                            <Text style={[styles.duration, activecircle === d.id && styles.activeduration]}>
                                {d.time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.progressive_container}>
                <View style={styles.progress_day_row}>
                    {progressive_days.map((d) => (
                        <View style={styles.progress_column} key={d.id}>
                            <ProgressiveBar percentage={d.percentage} color={d.color} />
                            <Text style={[styles.days, {color:theme.color3}]}>{d.time}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.amount_column}>
                    <Text style={[styles.price, {color:theme.color3}]}>$320</Text>
                    <Text style={[styles.price, {color:theme.color3}]}>$110</Text>
                    <Text style={[styles.starting_price, {color:theme.color3}]}>$0</Text>
                </View>
            </View>
        </View>
    );
};

export default Progressive;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    balance_row: {
        paddingTop: 31,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    balance_column1: {
        gap: 5,
    },
    balance: {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: 'Lato_400Regular',
        color: '#757575',
        textTransform: 'capitalize',
    },
    amount: {
        fontSize: 22,
        lineHeight: 26,
        fontFamily: 'Cabin_700Bold',
        color: '#121212',
    },
    duration_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    circle: {
        borderRadius: 30,
        backgroundColor: '#F6F6F6',
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activecircle: {
        backgroundColor: '#FFAF2A',
    },
    duration: {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: 'Lato_400Regular',
        color: '#757575',
        textTransform: 'capitalize',
    },
    activeduration: {
        color: '#ffffff',
    },
    progressive_container: {
        marginVertical: 25,
        flexDirection: 'row',
    },
    progress_day_row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    progress_column: {
        alignItems: 'center',
    },
    days: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#757575',
    },
    amount_column:{
        flexDirection: 'column',
        alignItems: 'center',
        gap: 17,
        paddingTop: 10,
        paddingLeft: 4,
    },
    price: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: 'Lato_400Regular',
        color: '#757575',
    },
    starting_price: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: 'Lato_400Regular',
        color: '#757575',
        marginTop: 30,
    }
});
