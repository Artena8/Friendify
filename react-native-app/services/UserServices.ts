import { API_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Récupère les informations de l'utilisateur connecté depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Informations de l'utilisateur.
 */
export const getMe = async () => {
    try {
        // Récupérer le token d'accès depuis AsyncStorage
        const token = await AsyncStorage.getItem('access_token');
        
        if (!token) {
            throw new Error('Token d\'accès manquant');
        }

        // Effectuer la requête GET avec le Bearer Token
        const response = await axios.get(`${API_URL}/me/`, {
            headers: {
                Authorization: `Bearer ${token}` // Ajouter le token dans l'en-tête Authorization
            }
        });

        console.log(response);

        if (response.status === 200) {
            return { data: response.data };
        } else {
            throw new Error('Erreur lors de la récupération des informations de l\'utilisateur');
        }
    } catch (error: unknown) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        throw new Error('Erreur lors de la récupération des informations de l\'utilisateur');
    }
};
