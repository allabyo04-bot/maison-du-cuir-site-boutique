import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { api, fmt } from "../lib/api.js";
import { getPanier, totalPanier, viderPanier } from "../lib/panier.js";

const BOUTIQUE_DEFAUT = "Boutique Principale";

export default function Commande() {
  const navigate = useNavigate();
  const [lignes, setLignes] = useState([]);
  const [nomClient, setNomClient] = useState("");
  const [telephoneClient, setTelephoneClient] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const [modeLivraison, setModeLivraison] = useState("Retrait");
  const [adresseLivraison, setAdresseLivraison] = useState("");
  const [notes, setNotes] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const p = getPanier();
    setLignes(p);
    if (p.length === 0) navigate("/panier");
  }, [navigate]);

  const soumettre = async (e) => {
    e.preventDefault();
    if (!nomClient.trim() || !telephoneClient.trim()) { setErreur("Nom et téléphone sont obligatoires."); return; }
    if (modeLivraison === "Livraison" && !adresseLivraison.trim()) { setErreur("Adresse de livraison obligatoire."); return; }

    setEnvoi(true); setErreur("");
    try {
      const commande = await api.creerCommande({
        nomClient, telephoneClient, emailClient: emailClient || undefined,
        modeLivraison, adresseLivraison: adresseLivraison || undefined,
        boutique: BOUTIQUE_DEFAUT, notes: notes || undefined,
        lignes: lignes.map((l) => ({ articleId: l.articleId, pointure: l.pointure, quantite: l.quantite })),
      });
      viderPanier();
      navigate(`/confirmation/${commande.numero}`);
    } catch (err) {
      setErreur(err.message);
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <Layout>
      <div className="container" style={{ padding: "40px 24px", maxWidth: 640 }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Finaliser la commande</h1>
        <p style={{ color: "var(--texte-doux)", marginBottom: 32, fontSize: 14 }}>
          Nous vous contacterons au numéro indiqué pour confirmer votre commande.
        </p>

        <form onSubmit={soumettre} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label>Nom complet *</label>
            <input value={nomClient} onChange={(e) => setNomClient(e.target.value)} required />
          </div>
          <div>
            <label>Téléphone *</label>
            <input value={telephoneClient} onChange={(e) => setTelephoneClient(e.target.value)} required />
          </div>
          <div>
            <label>Email (optionnel)</label>
            <input type="email" value={emailClient} onChange={(e) => setEmailClient(e.target.value)} />
          </div>

          <div>
            <label>Mode</label>
            <div style={{ display: "flex", gap: 12 }}>
              <button type="button" onClick={() => setModeLivraison("Retrait")} className={modeLivraison === "Retrait" ? "btn btn-primaire" : "btn btn-secondaire"} style={{ flexGrow: 1 }}>Retrait en boutique</button>
              <button type="button" onClick={() => setModeLivraison("Livraison")} className={modeLivraison === "Livraison" ? "btn btn-primaire" : "btn btn-secondaire"} style={{ flexGrow: 1 }}>Livraison</button>
            </div>
          </div>

          {modeLivraison === "Livraison" && (
            <div>
              <label>Adresse de livraison *</label>
              <textarea rows={2} value={adresseLivraison} onChange={(e) => setAdresseLivraison(e.target.value)} required />
            </div>
          )}

          <div>
            <label>Notes (optionnel)</label>
            <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Précision sur la commande, horaire de retrait souhaité…" />
          </div>

          <div className="carte" style={{ padding: 16 }}>
            {lignes.map((l) => (
              <div key={`${l.articleId}-${l.pointure}`} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                <span>{l.quantite} × {l.designation}{l.pointure ? ` (${l.pointure})` : ""}</span>
                <span>{fmt(l.prixUnitaire * l.quantite)} F</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--bordure)", fontWeight: 600 }}>
              <span>Total</span>
              <span>{fmt(totalPanier())} F</span>
            </div>
          </div>

          {erreur && <p style={{ color: "var(--accent-clair)", fontSize: 14 }}>{erreur}</p>}

          <button type="submit" disabled={envoi} className="btn btn-primaire" style={{ textTransform: "uppercase", padding: "14px" }}>
            {envoi ? "Envoi en cours…" : "Confirmer la commande"}
          </button>
          <Link to="/panier" style={{ textAlign: "center", fontSize: 14, color: "var(--texte-doux)" }}>← Retour au panier</Link>
        </form>
      </div>
    </Layout>
  );
}
