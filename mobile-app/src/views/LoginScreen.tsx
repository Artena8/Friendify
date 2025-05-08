import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { authenticateUser } from '@services/AuthServices';
import { styles } from './style';

export default function LoginScreen() {
    const [username, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);

    const handleLogin = async () => {
        setLoading(true);
        setMessage(null);

        const result = await authenticateUser({ username, password });

        setLoading(false);
        setError(!result.success);
        setMessage(result.message);

        if (result.success) {
            Alert.alert('Succès', result.message);
        } else {
            Alert.alert('Erreur', result.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>

            {message && (
                <Text style={[styles.message, error ? styles.error : styles.success]}>
                    {message}
                </Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={username}
                onChangeText={setLogin}
            />

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Se connecter</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

