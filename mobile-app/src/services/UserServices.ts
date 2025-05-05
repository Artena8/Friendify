import { API_URL } from '@env';
import axios from 'axios';

/**
 * Récupère la liste des users depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Array>} Liste des salles.
 */
export const getUsers = async () => {
    try {
    const response = await axios.get(`${API_URL}/users/`);
    console.log(response);
    if (response.status === 200) {
        return { data: response.data };
    } else {
        throw new Error('Erreur lors de la récupération des comptes');
    }
    } catch (error: any) {
        console.error('Erreur lors de la récupération des users:', error.message);
        throw new Error(error.message);
    }
};
