import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import type { Group } from "three";
import { getReviews, createReview } from "../services/ReservationService";
import type { Review, ReviewCreate } from "../types/Review";
import weekendBoxUrl from "../assets/flyer.glb";

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function Stars({ value }: { value: number }) {
    const v = clamp(Math.round(value), 0, 5);
    return (
        <span aria-label={`${v} sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ fontSize: 16, marginRight: 2 }}>
            {i < v ? "⭐" : "☆"}
            </span>
        ))}
        </span>
    );
}


function SpinningModel({ url }: { url: string }) {
    const groupRef = useRef<Group>(null);
    const [hovered, setHovered] = useState(false);
    const gltf = useGLTF(url);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const baseSpeed = hovered ? 0.9 : 0.01;
        groupRef.current.rotation.y += delta * baseSpeed;
    });

    return (
        <group
        ref={groupRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        position={[0.2, -2.3, 0]}
        rotation={[0.05, -0.9, 0]}
        scale={1.3}
        dispose={null}
        >
        <primitive object={gltf.scene} />
        </group>
    );
}
useGLTF.preload(weekendBoxUrl);

function Box3DPanel() {
    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <Canvas
            camera={{ position: [5, 0, 5], fov: 50 }}
            dpr={[1, 2]}
        >            
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 4, 2]} intensity={1.1} />
            <Environment preset="studio" />
            <SpinningModel url={weekendBoxUrl} />
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        </div>
    );
}

export default function WeekendShopPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [errorReviews, setErrorReviews] = useState<string | null>(null);

    const [wantOpen, setWantOpen] = useState(false);

    // Form review
    const [name, setName] = useState("");
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const avgRating = useMemo(() => {
        if (!reviews.length) return 0;
        const sum = reviews.reduce((acc, r) => acc + (r.rating ?? 0), 0);
        return sum / reviews.length;
    }, [reviews]);

    async function loadReviews() {
        setLoadingReviews(true);
        setErrorReviews(null);
        try {
        const data = await getReviews(); // doit retourner Review[]
        setReviews(Array.isArray(data) ? data : []);
        } catch (e: any) {
        setErrorReviews(e?.message ?? "Impossible de charger les avis.");
        } finally {
        setLoadingReviews(false);
        }
    }

    useEffect(() => {
        loadReviews();
    }, []);

    async function handleCreateReview(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);

        const payload: ReviewCreate = {
        author: name.trim() || "Anonyme",
        rating: clamp(Number(rating), 1, 5),
        description: comment.trim(),
        };

        if (!payload.description) {
        setSubmitting(false);
        setSubmitError("Ajoute un commentaire 🙂");
        return;
        }

        try {
        await createReview(payload);
        await loadReviews();

        // reset form
        setName("");
        setRating(5);
        setComment("");
        } catch (e: any) {
        setSubmitError(e?.message ?? "Impossible d’envoyer l’avis.");
        } finally {
        setSubmitting(false);
        }
    }

    return (
        <div style={styles.page}>
        <div style={styles.container}>
            <div style={styles.heroCard}>
            <div style={styles.left}>
                <Box3DPanel />
            </div>

            <div style={styles.right}>
                <h1 style={styles.title}>Un week-end à Troyes</h1> 

                <p style={styles.lead}>
                Quelques jours chez une hôte vachement sympa dans une jolie ville
                médiévale au bord de la Seine. Parfait pour déconnecter de la ville et
                se faire plaisir !
                </p>

                <div style={styles.section}>
                <h3 style={styles.h3}>À prévoir</h3>
                <ul style={styles.ul}>
                    <li>Écouteurs / casque Bluetooth</li>
                    <li>Boules Quies (son extérieur la nuit)</li>
                    <li>
                    Brosse à dents + dentifrice (ici on a du dentifrice{" "}
                    <b>framboise bleue</b>)
                    </li>
                </ul>
                </div>

                <div style={styles.section}>
                <h3 style={styles.h3}>Sur place</h3>
                <ul style={styles.ul}>
                    <li>Serviettes & gel douche fournis</li>
                    <li>Coussins & couvertures à disposition</li>
                    <li>Un canapé de fou (je l'aime mon canap)</li>
                </ul>
                </div>

                <div style={styles.section}>
                <h3 style={styles.h3}>Activités possibles</h3>
                <ul style={styles.ul}>
                    <li>Balade dans la ville & bords de Seine</li>
                    <li>Shopping en centre-ville</li>
                    <li>Restaurants & bars chill</li>
                    <li>
                    <b>NOUVEAU</b> : peinture sur céramique (dès le 7 février)
                    </li>
                </ul>
                </div>

                <div style={styles.ctaRow}>
                <button
                    style={styles.cta}
                    onClick={() => setWantOpen(true)}
                    type="button"
                >
                    Je veux !
                </button>

                <div style={styles.ratingBox}>
                    <div style={styles.smallMuted}>
                    Paiement: bonne humeur !
                    </div>
                </div>
                </div>

                {/* Mini “modal” simple quand on clique Je veux ! */}
                {wantOpen && (
                <div style={styles.modalOverlay} onClick={() => setWantOpen(false)}>
                    <div
                    style={styles.modal}
                    onClick={(e) => e.stopPropagation()}
                    >
                    <h2 style={{ margin: 0 }}>Réservation par Discord !</h2>
                    <p style={{ marginTop: 8, color: "#444" }}>
                        Envoie juste un message à l’hôte pour caler la date + tes
                        préférences (balade / resto / chill / shopping / restrictions alimentaires)
                    </p>
                    <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    </div>
                    </div>
                </div>
                )}

                <p style={styles.footnote}>
                * L’hôte prend en charge la nourriture <b>dans l’appartement</b>.
                Les restaurants/bars sont à la charge de l’invité pour sa part :p
                </p>
            </div>
            </div>

            {/* REVIEWS */}
            <div style={styles.reviewsCard}>
            <div style={styles.reviewsHeader}>
                <h2 style={{ margin: 0 }}>Avis clients</h2>
                <button
                style={styles.secondaryBtn}
                onClick={loadReviews}
                type="button"
                disabled={loadingReviews}
                >
                Rafraîchir
                </button>
            </div>

            {errorReviews && (
                <div style={styles.errorBox}>❌ {errorReviews}</div>
            )}

            <div style={styles.reviewsGrid}>
                {/* Liste */}
                <div style={styles.reviewsList}>
                {loadingReviews ? (
                    <div style={styles.muted}>Chargement des avis…</div>
                ) : reviews.length === 0 ? (
                    <div style={styles.muted}>
                    Aucun avis pour l’instant. Sois la première légende 👑
                    </div>
                ) : (
                    reviews.map((r, idx) => (
                    <div key={(r.id ?? idx).toString()} style={styles.reviewItem}>
                        <div style={styles.reviewTop}>
                        <div style={styles.reviewName}>{r.author}</div>
                        <Stars value={r.rating} />
                        </div>
                        <div style={styles.reviewComment}>{r.description}</div>
                    </div>
                    ))
                )}
                </div>

                {/* Formulaire */}
                <div style={styles.reviewForm}>
                <h3 style={{ marginTop: 0 }}>Laisser un avis</h3>
                <form onSubmit={handleCreateReview}>
                    <label style={styles.label}>
                    Ton nom !
                    <input
                        style={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </label>

                    <label style={styles.label}>
                    Ta note
                    <select
                        style={styles.input}
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                            {n} / 5
                        </option>
                        ))}
                    </select>
                    </label>

                    <label style={styles.label}>
                    Commentaire sur ton expérience
                    <textarea
                        style={{ ...styles.input, minHeight: 90, resize: "vertical" }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Ex: Canapé incroyable, hôte parfaite, 10/10 je reviens ^^"
                    />
                    </label>

                    {submitError && (
                    <div style={styles.errorBox}>⚠️ {submitError}</div>
                    )}

                    <button style={styles.cta} type="submit" disabled={submitting}>
                    {submitting ? "Envoi…" : "Publier l’avis"}
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        padding: "28px 14px"
    },
    container: {
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 18,
    },
    heroCard: {
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: 18,
        background: "white",
        borderRadius: 18,
        padding: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
    },
    left: {
        borderRadius: 14,
        overflow: "hidden",
        background: "#eee",
        minHeight: 520,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    flyer: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },
    right: {
        padding: "6px 8px 10px 6px",
    },
    badge: {
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        background: "#f2e9ff",
        color: "#740148",
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: 0.3,
        marginBottom: 10,
    },
    title: {
        margin: "0 0 10px 0",
        fontSize: 40,
        lineHeight: 1.05,
    },
    metaRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 12,
    },
    metaPill: {
        border: "1px solid #e7e2d8",
        background: "#fbfaf7",
        padding: "7px 10px",
        borderRadius: 999,
        fontSize: 13,
    },
    lead: { margin: "10px 0 14px", color: "#333", lineHeight: 1.5 },
    section: {
        borderTop: "1px solid #eee",
        paddingTop: 12,
        marginTop: 10,
    },
    h3: { margin: "0 0 8px", fontSize: 16 },
    ul: { margin: 0, paddingLeft: 18, color: "#333", lineHeight: 1.6 },
    muted: { color: "#666" },
    smallMuted: { color: "#777", fontSize: 12 },
    ctaRow: {
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginTop: 14,
        flexWrap: "wrap",
    },
    cta: {
        padding: "12px 16px",
        borderRadius: 14,
        border: "none",
        cursor: "pointer",
        fontWeight: 800,
        fontSize: 14,
        background: "#740148",
        color: "white",
    },
    secondaryBtn: {
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid #e7e2d8",
        background: "#fff",
        cursor: "pointer",
        fontWeight: 700,
    },
    ratingBox: {
        flex: 1,
        minWidth: 260,
        border: "1px solid #eee",
        borderRadius: 14,
        padding: 12,
        background: "#fff",
    },
    ratingText: { fontWeight: 700, color: "#222" },
    footnote: { marginTop: 12, fontSize: 12, color: "#666" },

    reviewsCard: {
        background: "white",
        borderRadius: 18,
        padding: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },
    reviewsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginBottom: 12,
    },
    reviewsGrid: {
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: 14,
    },
    reviewsList: {
        border: "1px solid #eee",
        borderRadius: 14,
        padding: 12,
        minHeight: 200,
    },
    reviewItem: {
        borderBottom: "1px solid #f0f0f0",
        padding: "10px 0",
    },
    reviewTop: {
        display: "flex",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
    },
    reviewName: { fontWeight: 800 },
    reviewComment: { marginTop: 6, color: "#333", lineHeight: 1.4 },
    reviewForm: {
        border: "1px solid #eee",
        borderRadius: 14,
        padding: 12,
    },
    label: {
        display: "block",
        fontWeight: 700,
        fontSize: 13,
        marginBottom: 10,
        color: "#222",
    },
    input: {
        width: "100%",
        marginTop: 6,
        borderRadius: 12,
        border: "1px solid #e7e2d8",
        padding: "10px 10px",
        outline: "none",
        fontSize: 14,
        background: "#fff",
    },
    errorBox: {
        marginTop: 10,
        padding: "10px 12px",
        borderRadius: 12,
        background: "#fff2f2",
        border: "1px solid #ffd2d2",
        color: "#8a1f1f",
        fontWeight: 700,
    },

    modalOverlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 50,
    },
    modal: {
        width: "min(520px, 100%)",
        background: "white",
        borderRadius: 18,
        padding: 16,
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
    },
};
