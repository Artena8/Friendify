import { Link, useParams } from "react-router";
import { Title } from "~/components";

export default function NotFoundPage() {
    const { slug } = useParams();

    return (
        <main
        style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui",
            color: "#e5e7eb",
            textAlign: "center",
            padding: 24,
        }}
        >
        <div>
            <Title title="404" />
            <p style={{ fontSize: 18, opacity: 0.8 }}>
            La page <code>/{slug}</code> n’existe pas.
            </p>

            <p style={{ marginTop: 12, opacity: 0.6 }}>
            Tu t’es peut-être perdu(e) en chemin ?
            </p>

            <div style={{ marginTop: 24 }}>
            <Link
                to="/"
                style={{
                padding: "10px 16px",
                borderRadius: 8,
                background: "#6486B8",
                color: "white",
                textDecoration: "none",
                fontWeight: 500,
                }}
            >
                Retour à l’accueil
            </Link>
            </div>
        </div>
        </main>
    );
}
