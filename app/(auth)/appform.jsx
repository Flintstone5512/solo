import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import ThemeContext from '../../theme/ThemeContext';
import Button from '../../components/Button/Button';

const AppForm = () => {
    const { theme } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        ssn: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US',
        email: '',
        phone: '',
        ein: '',
        dba: '',
        businessVertical: '',
        numberOfEmployees: '',
        website: '',
        userId: '' // Assume this is fetched from the user session
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (name, value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.ssn || formData.ssn.length < 9) {
            setError('SSN must be 9 digits');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const TOKEN = 'your_access_token_here';
            const response = await fetch('https://api.s.unit.sh/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    data: {
                        type: "individualApplication",
                        attributes: {
                            ...formData,
                            fullName: {
                                first: formData.firstName,
                                last: formData.lastName
                            },
                            phone: {
                                countryCode: "1",
                                number: formData.phone
                            }
                        }
                    }
                })
            });

            const result = await response.json();
            setIsLoading(false);

            if (response.ok) {
                alert('Application submitted successfully.');
            } else {
                throw new Error(result.errors.map(e => e.detail).join(', '));
            }
        } catch (error) {
            setError(`Failed to submit application: ${error.message}`);
            setIsLoading(false);
        }
    };

    const location = () => {
        setIsModalVisible(false);
        router.push('homedashboard');
    };

    const back = () => {
        router.push('create_account');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text style={[styles.heading, { color: theme.color }]}>Application Form</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {Object.keys(formData).map((key) => (
                    <View style={styles.inputBox} key={key}>
                        <Text style={[styles.label, { color: theme.color }]}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.cardbg, color: theme.color }]}
                            onChangeText={(text) => handleChange(key, text)}
                            value={formData[key]}
                            placeholder={`Enter ${key}`}
                            placeholderTextColor={theme.color}
                            secureTextEntry={key === 'ssn' || key === 'ein'}
                        />
                    </View>
                ))}
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button buttonText="Submit Application" onPress={handleSubmit} />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scroll: {
        paddingTop: 50,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputBox: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    }
});

export default AppForm;
