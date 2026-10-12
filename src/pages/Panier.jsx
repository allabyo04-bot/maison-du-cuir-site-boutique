import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Layout from "../components/Layout.jsx";
import { fmt } from "../lib/api.js";
import { getPanier, modifierQuantite, retirerDuPanier, totalPanier } from "../lib/panier.js";

export default function Panier() {
  const [lignes, setLignes] = useState([]);

  const rafraichir = () => setLignes(getPanier());
  useEffect(() => { rafraichir(); }, []);

  const changerQuantite = (l, q) => { modifierQuantite(l.articleId, l.pointure, q); rafraichir(); };
  const retirer = (l) => { retirerDuPanier(l.articleId, l.pointure); rafraichir(); };

  return (
    <Layout>
      <div className="container" style={{ padding: "40px 24px", maxWidth: 800 }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Votre panier</h1>

        {lignes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "var(--texte-doux)", marginBottom: 20 }}>Votre panier est vide.</p>
            <Link to="/boutique" className="btn btn-primaire">Découvrir la collection</Link>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {lignes.map((l) => (
                <div key={`${l.articleId}-${l.pointure}`} className="carte" style={{ display: "flex", gap: 16, padding: 16, alignItems: "center" }}>
                  <div style={{ width: 72, height: 72, background: "#F1E9DC", borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                    {l.photoUrl && <img src={l.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <p style={{ fontWeight: 500 }}>{l.designation}</p>
                    {l.pointure && <p style={{ fontSize: 13, color: "var(--texte-doux)" }}>Pointure {l.pointure}</p>}
                    <p style={{ fontSize: 14, marginTop: 4 }}>{fmt(l.prixUnitaire)} F</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="btn btn-secondaire" style={{ padding: "4px 10px" }} onClick={() => changerQuantite(l, l.quantite - 1)}>−</button>
                    <span style={{ minWidth: 20, textAlign: "center" }}>{l.quantite}</span>
                    <button className="btn btn-secondaire" style={{ padding: "4px 10px" }} onClick={() => changerQuantite(l, l.quantite + 1)}>+</button>
                  </div>
                  <p className="font-display" style={{ fontWeight: 600, minWidth: 90, textAlign: "right" }}>{fmt(l.prixUnitaire * l.quantite)} F</p>
                  <button onClick={() => retirer(l)} aria-label="Retirer" style={{ background: "none", border: "none", color: "var(--accent-clair)" }}><Trash2 size={18} /></button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: "1px solid var(--bordure)" }}>
              <p className="font-display" style={{ fontSize: 22, fontWeight: 700 }}>Total : {fmt(totalPanier())} F</p>
              <Link to="/commande" className="btn btn-primaire" style={{ textTransform: "uppercase" }}>Passer la commande</Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
