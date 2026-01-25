import { useState } from "react";
import { Title } from "~/components";
import { NavBar } from "~/components/molecules";
import { authenticateUser } from "~/services/AuthService";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        let r = await authenticateUser({ login: email.trim(), password });
        if (r.success) {
            setSuccessMsg(r.message);
        } else {
            setErrorMsg(r.message);
        }
    }

    return (
        <>
        <NavBar />
        <div className="mx-auto w-fit mt-20 text-center">
        
        <Title title="Connexion" />

        <form onSubmit={onSubmit} className="grid gap-4 w-1/2 mx-auto bg-white p-6 rounded-xl">

        <label className="grid gap-1">
            <span className="text-sm text-gray-700 text-left font-bold">Pseudo</span>
            <input
            type="textfield"
            className="w-full rounded-xl border border-gray-200 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            />
        </label>

        <label className="grid gap-1">
            <span className="text-sm text-gray-700 text-left font-bold">Mot de passe</span>
            <input
            type="password"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            />
        </label>

        <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-4 py-2 font-semibold text-white bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {loading ? "Connexion..." : "Se connecter"}
        </button>

        {successMsg && (
            <div className="rounded-xl bg-green-50 px-3 py-2 text-sm">{successMsg}</div>
        )}
        {errorMsg && (
            <div className="rounded-xl bg-red-50 px-3 py-2 text-sm">{errorMsg}</div>
        )}
        </form>
        </div>
        </>
    );
}
