import { useState } from "react";
import { Link, Outlet } from "react-router";
import { createIdea } from "../services/IdeaService";
import { Title } from "~/components";

export default function SondagePage() {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSuccessMsg(null);
        setErrorMsg(null);

        const clean = description.trim();
        if (!clean) {
        setErrorMsg("Écris une idée 🙂");
        return;
        }
        if (clean.length > 500) {
        setErrorMsg("Max 500 caractères.");
        return;
        }

        try {
        setLoading(true);
        const created = await createIdea({ description: clean });
        setSuccessMsg(`Idée envoyée ✅ (id: ${created.id})`);
        setDescription("");
        } catch (err: any) {
        // axios errors
        const apiMsg =
            err?.response?.data?.detail ||
            err?.message ||
            "Erreur inconnue";
        setErrorMsg(`Impossible d’envoyer l’idée : ${apiMsg}`);
        } finally {
        setLoading(false);
        }
    }

    return (
        <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 720, margin: "0 auto" }}>
        <Title title="Sondage"/>
        <p>Envoie une idée pour Friendify !</p>

        <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
            <label style={{ display: "grid", gap: 6 }}>
            <span>Description (max 500)</span>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Ex: ajouter un système de tags + recherche…"
                style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                outline: "none",
                }}
            />
            </label>

            <button
            type="submit"
            disabled={loading}
            style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                background: loading ? "#9ca3af" : "#6366f1",
                color: "white",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
            }}
            >
            {loading ? "Envoi..." : "Envoyer"}
            </button>

            {successMsg && (
            <div style={{ padding: 12, borderRadius: 10, background: "#1F6D00" }}>
                {successMsg}
            </div>
            )}
            {errorMsg && (
            <div style={{ padding: 12, borderRadius: 10, background: "#B30000" }}>
                {errorMsg}
            </div>
            )}
        </form>
        <Outlet />
        </main>
    );
}
