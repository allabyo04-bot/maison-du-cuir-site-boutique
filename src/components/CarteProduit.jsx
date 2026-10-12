import { Link } from "react-router-dom";
import { fmt } from "../lib/api.js";

export default function CarteProduit({ produit }) {
  return (
    <Link to={`/produit/${produit.id}`} className="carte" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ aspectRatio: "1 / 1", background: "#F1E9DC", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {produit.photoUrl ? (
          <img src={produit.photoUrl} alt={produit.designation} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: 13, color: "var(--texte-doux)" }}>Photo à venir</span>
        )}
      </div>
      <div style={{ padding: 16 }}>
        <p style={{ fontSize: 12, color: "var(--texte-doux)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{produit.marque}</p>
        <p style={{ fontSize: 15, fontWeight: 500, margin: "4px 0 8px" }}>{produit.designation}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>{fmt(produit.prixVente)} F</p>
          {!produit.enStock && <span style={{ fontSize: 11, color: "var(--accent-clair)" }}>Rupture</span>}
        </div>
      </div>
    </Link>
  );
}
