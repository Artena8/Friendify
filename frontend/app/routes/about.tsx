import { Link } from "react-router";
import { Title } from "~/components";

export default function AboutPage() {
    return (
        <main className="mx-auto w-fit mt-20 text-center">
        <Title title="A propos" />
        <p>Ce site web est créé dans un cadre d'apprentissage !</p>
        <div  className="italic mt-9"><Link to="/">Retour à l'accueil</Link></div>
        </main>
    );
}
