import { API_URL } from "@env";
import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Fonction de connexion à l'API
 * @param username Identifiant de l'utilisateur (email ou autre)
 * @param password Mot de passe de l'utilisateur
 * @returns Objet avec { success, message, data }
 */
export async function loginToAPI(
    username: string,
    password: string
): Promise<{ success: boolean; message: string; data: any }> {
    try {
        const data = new URLSearchParams();
        data.append("username", username);
        data.append("password", password);

        const response = await axios.post(`${API_URL}/login/`, data.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if (response.status === 200) {
            const { access_token, token_type } = response.data;

            // Stockage sécurisé local
            await AsyncStorage.setItem("access_token", access_token);
            await AsyncStorage.setItem("token_type", token_type);

            return {
                success: true,
                message: "Connexion réussie !",
                data: response.data
            };
        } else {
            return {
                success: false,
                message: "Erreur de connexion inattendue.",
                data: null
            };
        }

    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status;

        // Gestion des erreurs en fonction du statut HTTP
        switch (status) {
            case 400:
            case 401:
                return { success: false, message: "Identifiants incorrects.", data: null };
            case 403:
                return { success: false, message: "Accès interdit. Vérifiez vos droits.", data: null };
            case 404:
                return { success: false, message: "Service introuvable. Vérifiez l'URL API.", data: null };
            default:
                return {
                    success: false,
                    message: `Erreur serveur : ${axiosError.message}`,
                    data: null
                };
        }
    }
}
