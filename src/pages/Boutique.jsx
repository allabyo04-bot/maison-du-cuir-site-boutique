import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import CarteProduit from "../components/CarteProduit.jsx";
import { api } from "../lib/api.js";

const FAMILLES = ["Chaussure", "Sac", "Article d'entretien"];

export default function Boutique() {
  const [params, setParams] = useSearchParams();
  const [resultat, setResultat] = useState({ produits: [], page: 1, totalPages: 1 });
  const [marques, setMarques] = useState([]);
  const [chargement, setChargement] = useState(true);

  const q = params.get("q") || "";
  const famille = params.get("famille") || "";
  const marqueId = params.get("marqueId") || "";
  const tri = params.get("tri") || "nouveaute";
  const page = Number(params.get("page")) || 1;

  useEffect(() => { api.marques().then(setMarques).catch(() => {}); }, []);

  useEffect(() => {
    setChargement(true);
    api.produits({ q, famille, marqueId, tri, page }).then(setResultat).finally(() => setChargement(false));
  }, [q, famille, marqueId, tri, page]);

  const majFiltre = (cle, valeur) => {
    const next = new URLSearchParams(params);
    if (valeur) next.set(cle, valeur); else next.delete(cle);
    next.delete("page");
    setParams(next);
  };

  return (
    <Layout>
      <div className="container" style={{ padding: "40px 24px" }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
          {famille || "Toute la collection"}
        </h1>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
          <select value={famille} onChange={(e) => majFiltre("famille", e.target.value)} style={{ width: "auto" }}>
            <option value="">Toutes les familles</option>
            {FAMILLES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <select value={marqueId} onChange={(e) => majFiltre("marqueId", e.target.value)} style={{ width: "auto" }}>
            <option value="">Toutes les marques</option>
            {marques.map((m) => <option key={m.id} value={m.id}>{m.nom}</option>)}
          </select>
          <select value={tri} onChange={(e) => majFiltre("tri", e.target.value)} style={{ width: "auto" }}>
            <option value="nouveaute">Nouveautés</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="nom">Nom A-Z</option>
          </select>
        </div>

        {chargement ? (
          <p style={{ color: "var(--texte-doux)" }}>Chargement…</p>
        ) : resultat.produits.length === 0 ? (
          <p style={{ color: "var(--texte-doux)" }}>Aucun article ne correspond à cette recherche.</p>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
              {resultat.produits.map((p) => <CarteProduit key={p.id} produit={p} />)}
            </div>
            {resultat.totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
                {Array.from({ length: resultat.totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} onClick={() => majFiltre("page", String(n))}
                    className={n === page ? "btn btn-primaire" : "btn btn-secondaire"} style={{ minWidth: 40, padding: "8px 14px" }}>
                    {n}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
