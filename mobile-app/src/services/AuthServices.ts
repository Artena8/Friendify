import { API_URL } from "@env";
import axios from "axios";
//import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Authentifie un utilisateur en vérifiant ses informations de connexion.
 *
 * @param {Object} formData - Les données de connexion fournies par l'utilisateur. Contient le login et le password
 * @throws {Error} Si les informations de connexion (email ou mot de passe) sont incorrectes.
 *
 * @returns {Promise<Object>} résultat de l'authentification.
 */
export const authenticateUser = async (
    formData: { login: string; password: string }
    ) => {
        try {
        const response = await axios.post(`${API_URL}login/`, formData);
        if (response.status == 200) {
            if (response.data.type !== 'user') {
                return {
                    success: false,
                    message: 'Connexion non autorisée',
                    data: null,
                };
            } else {    
                return {
                    success: true,
                    message: 'Connexion réussie !',
                    data: response.data,
                };
            }
        }
        return {
            success: false,
            message: 'Erreur lors de la connexion',
            data: null,
        };
        } catch (error: any) {
        console.error("Erreur lors de l'authentification:", error.message);
        if (error.status == 401) {
            return { success: false, message: 'Identifiants incorrects', data: null };
        } else if (error.status == 403) {
            return {
            success: false,
            message: 'Vous êtes déjà connectés',
            data: null,
            };
        } else if (error.status == 404) {
            return {
            success: false,
            message:
                "Vous n'êtes plus autorisé à vous connecter. Contactez un administrateur",
            data: null,
            };
        }
        return {
            success: false,
            message: 'Erreur lors de la connexion',
            data: null,
        };
        }
};