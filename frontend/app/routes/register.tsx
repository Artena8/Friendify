import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        const cleanEmail = email.trim();
        if (!cleanEmail) return setErrorMsg("Email requis.");
        if (!password) return setErrorMsg("Mot de passe requis.");
        if (password.length < 8) return setErrorMsg("Mot de passe : 8 caractères minimum.");
        if (password !== confirm) return setErrorMsg("Les mots de passe ne correspondent pas.");

        try {
        setLoading(true);
        // TODO: appeler ton service auth (axios) ici
        // await register({ email: cleanEmail, password })
        await new Promise((r) => setTimeout(r, 500));
        setSuccessMsg("Compte créé ✅ (placeholder)");
        } catch (err: any) {
        setErrorMsg(err?.message ?? "Erreur inconnue");
        } finally {
        setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
        <h2 className="text-lg font-semibold">Inscription</h2>

        <label className="grid gap-1">
            <span className="text-sm text-gray-700">Email</span>
            <input
            type="email"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="toi@mail.com"
            autoComplete="email"
            />
        </label>

        <label className="grid gap-1">
            <span className="text-sm text-gray-700">Mot de passe</span>
            <input
            type="password"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8+ caractères"
            autoComplete="new-password"
            />
        </label>

        <label className="grid gap-1">
            <span className="text-sm text-gray-700">Confirmer</span>
            <input
            type="password"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
            />
        </label>

        <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-4 py-2 font-semibold text-white bg-black disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {loading ? "Création..." : "Créer un compte"}
        </button>

        {successMsg && (
            <div className="rounded-xl bg-green-50 px-3 py-2 text-sm">{successMsg}</div>
        )}
        {errorMsg && (
            <div className="rounded-xl bg-red-50 px-3 py-2 text-sm">{errorMsg}</div>
        )}
        </form>
    );
}
