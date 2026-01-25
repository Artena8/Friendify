import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json",
    },
});

export type TokenSchema = {
    access_token: string;
    token_type: string;
};

/**
 * Authentifie un utilisateur en vérifiant ses informations de connexion.
 *
 * @param {Object} form_data - Les données de connexion fournies par l'utilisateur. Contient le login et le password
 * @throws {Error} Si les informations de connexion (email ou mot de passe) sont incorrectes.
 *
 * @returns {Promise<Object>} résultat de l'authentification.
 */
export const authenticateUser = async (form_data: { login: string; password: string }) => {
    const body = new URLSearchParams();
    body.set("grant_type", "password");
    body.set("username", form_data.login);
    body.set("password", form_data.password);
    body.set("scope", "");
    body.set("client_id", "");
    body.set("client_secret", "");

    try {
        const response = await api.post<TokenSchema>("/login", body, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        console.log('LA');
        console.log(response);
        if (response.status === 200) {
            localStorage.setItem('access', response.data.access_token);
            return { success: true, message: 'Connexion réussie !', data: response.data };
        } else {
            throw new Error('Erreur de connexion');
        }
    } catch (error : any) {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                console.log('ici');
                return { success: false, message: "Identifiants incorrects", data: null };
            } else if (status === 403) {
                return { success: false, message: 'Vous êtes déjà connectés', data: null };
            } else {
                throw new Error('Erreur de connexion');
            }
        } else {
            throw error;
        }
    }
};