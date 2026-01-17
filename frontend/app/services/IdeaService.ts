import axios from "axios";
import type { Idea, IdeaCreate } from "../types/Idea";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * GET /ideas
 * Récupère toutes les idées
 */
export async function getIdeas(): Promise<Idea[]> {
    const res = await api.get<Idea[]>("/ideas");
    return res.data;
}

/**
 * POST /ideas
 * Crée une nouvelle idée
 */
export async function createIdea(payload: IdeaCreate): Promise<Idea> {
    const res = await api.post<Idea>("/ideas", payload);
    return res.data;
}