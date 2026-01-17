import { useEffect, useState } from "react";
import { Link } from "react-router";
import { createIdea, getIdeas} from "../services/IdeaService";
import type { Idea } from "../types/Idea";
import { Title } from "~/components";

export default function SondageListPage() {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loadingIdeas, setLoadingIdeas] = useState(true);

    async function refreshIdeas() {
        try {
        setLoadingIdeas(true);
        const data = await getIdeas();
        setIdeas(data);
        } catch (err: any) {
        const apiMsg = err?.response?.data?.detail || err?.message || "Erreur inconnue";
        setErrorMsg(`Impossible de charger les idées : ${apiMsg}`);
        } finally {
        setLoadingIdeas(false);
        }
    }

    useEffect(() => {
        refreshIdeas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSuccessMsg(null);
        setErrorMsg(null);

        const clean = description.trim();
        if (!clean) return setErrorMsg("Écris une idée 🙂");
        if (clean.length > 500) return setErrorMsg("Max 500 caractères.");

        try {
        setLoading(true);
        const created = await createIdea({ description: clean });
        setSuccessMsg(`Idée envoyée ✅ (id: ${created.id})`);
        setDescription("");

        // refresh liste après création
        await refreshIdeas();
        } catch (err: any) {
        const apiMsg = err?.response?.data?.detail || err?.message || "Erreur inconnue";
        setErrorMsg(`Impossible d’envoyer l’idée : ${apiMsg}`);
        } finally {
        setLoading(false);
        }
    }

    return (
            <section className="rounded-2xl border bg-white p-4 shadow-sm mt-6 text-black">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Idées proposées</h2>
                <button
                type="button"
                onClick={refreshIdeas}
                className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                disabled={loadingIdeas}
                >
                {loadingIdeas ? "..." : "Rafraîchir"}
                </button>
            </div>

            <div className="mt-3">
                {loadingIdeas ? (
                <p className="text-sm text-gray-500">Chargement...</p>
                ) : ideas.length === 0 ? (
                <p className="text-sm text-gray-500">Aucune idée pour l’instant.</p>
                ) : (
                <ul className="divide-y">
                    {ideas.map((idea) => (
                    <li key={idea.id} className="py-3">
                        <p className="text-sm">
                        <span className="mr-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                            #{idea.id}
                        </span>
                        {idea.description ?? <span className="text-gray-400">(vide)</span>}
                        </p>
                    </li>
                    ))}
                </ul>
                )}
            </div>
            </section>
    );
}
