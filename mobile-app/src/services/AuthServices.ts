import { API_URL } from "@env";
import axios, { AxiosError } from "axios";
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
    form_data: { username: string; password: string }
    ) => {
        try {
            console.log(`${API_URL}/login/`);
            const fm = new FormData();
            fm.append("username",form_data.username);
            fm.append("password",form_data.password);
            const response = await axios.post(`${API_URL}/login/`, {
                username: form_data.username,
                password: form_data.password
            }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", // très important pour FastAPI
            },
            });
            if (response.status == 200) {
                return {
                    success: true,
                    message: 'Connexion réussie !',
                    data: response.data,
                };
        }
        return {
            success: false,
            message: 'Erreur lors de la connexion',
            data: null,
        };
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            console.error("Erreur réseau Axios:", axiosError.message, axiosError.toJSON?.());
            const status = axiosError.response?.status;
        
            if (status === 401) {
                return { success: false, message: 'Identifiants incorrects', data: null };
            } else if (status === 403) {
                return {
                    success: false,
                    message: 'Vous êtes déjà connectés',
                    data: null,
                };
            } else if (status === 404) {
                return {
                    success: false,
                    message: "Vous n'êtes plus autorisé à vous connecter. Contactez un administrateur",
                    data: null,
                };
            }
        
            return {
                success: false,
                message: 'Erreur lors de la connexion : ' + axiosError,
                data: null,
            };
        }
};