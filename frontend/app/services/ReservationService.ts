import axios from "axios";
import type { Review, ReviewCreate } from "../types/Review";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * GET /reviews
 * Récupère toutes les reviews
 */
export async function getReviews(): Promise<Review[]> {
    const res = await api.get<Review[]>("/reviews");
    return res.data;
}

/**
 * POST /reviews
 * Crée une nouvelle reviews
 */
export async function createReview(payload: ReviewCreate): Promise<Review> {
    const res = await api.post<Review>("/review", payload);
    return res.data;
}