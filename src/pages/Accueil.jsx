import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import CarteProduit from "../components/CarteProduit.jsx";
import { api } from "../lib/api.js";

export default function Accueil() {
  const [nouveautes, setNouveautes] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    api.produits({ tri: "nouveaute" }).then((r) => setNouveautes(r.produits.slice(0, 8))).finally(() => setChargement(false));
  }, []);

  return (
    <Layout>
      <section style={{ background: "var(--noir)", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, color: "#D9A45B", marginBottom: 8 }}>by Anaïs</p>
        <h1 className="font-display" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 600, color: "#E3C46E", margin: "0 0 20px", lineHeight: 1.1 }}>
          Le cuir, dans toute sa noblesse
        </h1>
        <p style={{ color: "#D8CDBB", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.6 }}>
          Chaussures et sacs en cuir véritable, choisis avec soin pour leur élégance, leur qualité et leur confort.
        </p>
        <Link to="/boutique" className="btn btn-primaire" style={{ textTransform: "uppercase" }}>Découvrir la collection</Link>
      </section>

      <section className="container" style={{ padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700 }}>Nouveautés</h2>
        </div>
        {chargement ? (
          <p style={{ textAlign: "center", color: "var(--texte-doux)" }}>Chargement…</p>
        ) : nouveautes.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--texte-doux)" }}>La collection arrive bientôt.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
            {nouveautes.map((p) => <CarteProduit key={p.id} produit={p} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}
