import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getUsers } from '@services/UserServices';

export default function UserList() {
    const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (err: any) {
            setError(err.message || 'Erreur inconnue');
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={styles.centered} />;
    if (error) return <Text style={styles.error}>{error}</Text>;

    return (
        <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            </View>
        )}
        contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    list: {
        padding: 16,
    },
    item: {
        backgroundColor: '#f0f0f0',
        marginBottom: 12,
        padding: 12,
        borderRadius: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    email: {
        fontSize: 14,
        color: '#555',
    },
});
