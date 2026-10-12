import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Layout from "../components/Layout.jsx";
import { api, fmt } from "../lib/api.js";

export default function ConfirmationCommande() {
  const { numero } = useParams();
  const [commande, setCommande] = useState(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    api.commande(numero).then(setCommande).catch((e) => setErreur(e.message));
  }, [numero]);

  return (
    <Layout>
      <div className="container" style={{ padding: "60px 24px", maxWidth: 560, textAlign: "center" }}>
        <CheckCircle2 size={56} color="var(--succes)" style={{ marginBottom: 16 }} />
        <h1 className="font-display" style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>Commande envoyée !</h1>
        <p style={{ color: "var(--texte-doux)", marginBottom: 24 }}>
          Numéro de commande : <strong>{numero}</strong><br />
          Nous vous contacterons bientôt pour confirmer les détails.
        </p>

        {erreur && <p style={{ color: "var(--accent-clair)" }}>{erreur}</p>}

        {commande && (
          <div className="carte" style={{ padding: 20, textAlign: "left", marginBottom: 24 }}>
            {commande.lignes.map((l) => (
              <div key={l.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                <span>{l.quantite} × {l.designation}{l.pointure ? ` (${l.pointure})` : ""}</span>
                <span>{fmt(l.sousTotal)} F</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--bordure)", fontWeight: 600 }}>
              <span>Total</span>
              <span>{fmt(commande.total)} F</span>
            </div>
          </div>
        )}

        <Link to="/boutique" className="btn btn-primaire">Continuer mes achats</Link>
      </div>
    </Layout>
  );
}
