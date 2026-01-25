import { Title } from "~/components";
import { NavBar } from "~/components/molecules";

export default function IndexPage() {
    return (
        <>
            <NavBar />
            <main className="mx-auto w-fit mt-20 text-center">
            
            <Title title="Friendify" />
            <p className="italic">Page d'accueil</p>

            </main>
        </>
    );
}
