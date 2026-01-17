import { Link } from "react-router";
import { Title } from "~/components";

export default function IndexPage() {
    return (
        <main className="mx-auto w-fit mt-20 text-center">
        
        <Title title="Friendify" />
        <p className="italic">Page d'accueil</p>

        <nav className="rounded-3xl bg-amber-50 text-teal-950 flex flex-col p-4 m-4 underline gap-2 font-semibold">
            <Link to="/about">About</Link>
            <Link to="/sondage">Sondage (Test Api)</Link>
            <Link to="/sondage/list">Sondage - Liste des idées (Test Api)</Link>
            <Link to="/test">Page 404 </Link>
        </nav>
        </main>
    );
}
