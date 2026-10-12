import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { api, fmt } from "../lib/api.js";
import { ajouterAuPanier } from "../lib/panier.js";

export default function Produit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produit, setProduit] = useState(null);
  const [erreur, setErreur] = useState("");
  const [photoActive, setPhotoActive] = useState(0);
  const [pointure, setPointure] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    setProduit(null); setErreur(""); setPhotoActive(0); setPointure(""); setQuantite(1); setConfirmation(false);
    api.produit(id).then(setProduit).catch((e) => setErreur(e.message));
  }, [id]);

  if (erreur) return <Layout><div className="container" style={{ padding: 60, textAlign: "center" }}><p>{erreur}</p></div></Layout>;
  if (!produit) return <Layout><div className="container" style={{ padding: 60 }}><p style={{ color: "var(--texte-doux)" }}>Chargement…</p></div></Layout>;

  const pointuresPossibles = [...new Set(produit.pointuresDisponibles.filter((p) => p.pointure).map((p) => p.pointure))];
  const besoinPointure = pointuresPossibles.length > 0;
  const photos = produit.photos?.length ? produit.photos : (produit.photoUrl ? [{ url: produit.photoUrl }] : []);

  const ajouter = () => {
    if (besoinPointure && !pointure) { setErreur("Choisissez une pointure."); return; }
    ajouterAuPanier(produit, pointure || null, quantite);
    setErreur(""); setConfirmation(true);
    setTimeout(() => setConfirmation(false), 2500);
  };

  return (
    <Layout>
      <div className="container" style={{ padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
        <div className="produit-grille" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
          <div>
            <div style={{ aspectRatio: "1/1", background: "#F1E9DC", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
              {photos.length ? (
                <img src={photos[photoActive].url} alt={produit.designation} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--texte-doux)" }}>Photo à venir</div>
              )}
            </div>
            {photos.length > 1 && (
              <div style={{ display: "flex", gap: 8 }}>
                {photos.map((ph, i) => (
                  <button key={i} onClick={() => setPhotoActive(i)} style={{ width: 64, height: 64, borderRadius: 8, overflow: "hidden", border: i === photoActive ? "2px solid var(--accent)" : "1px solid var(--bordure)", padding: 0, background: "none" }}>
                    <img src={ph.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p style={{ fontSize: 13, color: "var(--texte-doux)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{produit.marque}</p>
            <h1 className="font-display" style={{ fontSize: 32, fontWeight: 700, margin: "4px 0 12px" }}>{produit.designation}</h1>
            <p className="font-display" style={{ fontSize: 28, fontWeight: 600, color: "var(--accent)", marginBottom: 20 }}>{fmt(produit.prixVente)} F</p>

            {besoinPointure && (
              <div style={{ marginBottom: 16 }}>
                <label>Pointure</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {pointuresPossibles.map((p) => (
                    <button key={p} onClick={() => setPointure(p)}
                      className={pointure === p ? "btn btn-primaire" : "btn btn-secondaire"} style={{ minWidth: 48, padding: "8px 12px" }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label>Quantité</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12, width: "fit-content" }}>
                <button className="btn btn-secondaire" style={{ padding: "6px 14px" }} onClick={() => setQuantite((q) => Math.max(1, q - 1))}>−</button>
                <span style={{ minWidth: 24, textAlign: "center" }}>{quantite}</span>
                <button className="btn btn-secondaire" style={{ padding: "6px 14px" }} onClick={() => setQuantite((q) => q + 1)}>+</button>
              </div>
            </div>

            {erreur && <p style={{ color: "var(--accent-clair)", fontSize: 14, marginBottom: 12 }}>{erreur}</p>}
            {confirmation && <p style={{ color: "var(--succes)", fontSize: 14, marginBottom: 12 }}>Ajouté au panier !</p>}

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={ajouter} disabled={!produit.enStock} className="btn btn-primaire" style={{ flexGrow: 1, textTransform: "uppercase" }}>
                {produit.enStock ? "Ajouter au panier" : "Rupture de stock"}
              </button>
            </div>
            {produit.enStock && (
              <button onClick={() => { ajouter(); navigate("/panier"); }} className="btn btn-secondaire" style={{ marginTop: 12, width: "100%", textTransform: "uppercase" }}>
                Acheter maintenant
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 800px) {
          .produit-grille { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </Layout>
  );
}
