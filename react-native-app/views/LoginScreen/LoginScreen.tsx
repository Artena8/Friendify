import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { loginToAPI } from '../../services/AuthServices';
import { styles } from './style';
import { getMe } from '../../services/UserServices';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setMessage(null);

        try {
        const result = await loginToAPI( username, password );
        setLoading(false);
        setError(!result.success);
        

        if (result.success) {
            Alert.alert('Succès', result.message);
            const me = await getMe();
            if (me) {
                setMessage(me.data.name + " code " + me.data.id);
            }
        } else {
            Alert.alert('Erreur', result.message);
        }
        } catch (err) {
        setLoading(false);
        console.error('Erreur inattendue dans handleLogin :', err);
        Alert.alert('Erreur', 'Une erreur inconnue est survenue.');
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
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
        />

        <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
        >
            {loading ? (
            <ActivityIndicator color="#fff" />
            ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
            )}
        </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
