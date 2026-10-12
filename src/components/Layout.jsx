import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { nombreArticlesPanier } from "../lib/panier.js";

export default function Layout({ children }) {
  const [nbPanier, setNbPanier] = useState(0);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [recherche, setRecherche] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const maj = () => setNbPanier(nombreArticlesPanier());
    maj();
    window.addEventListener("panier-maj", maj);
    return () => window.removeEventListener("panier-maj", maj);
  }, []);

  const soumettreRecherche = (e) => {
    e.preventDefault();
    navigate(`/boutique${recherche ? `?q=${encodeURIComponent(recherche)}` : ""}`);
    setMenuOuvert(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "var(--accent)", color: "#FBF3EC", textAlign: "center", fontSize: 13, letterSpacing: "0.1em", padding: "8px 16px", textTransform: "uppercase" }}>
        Élégance · Qualité · Confort
      </div>

      <header style={{ background: "var(--noir)", borderBottom: "2px solid #8C3B2E" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 128, gap: 24 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={logo} alt="La Maison du Cuir by Anaïs" style={{ height: 100, width: "auto" }} />
          </Link>

          <nav style={{ display: "none", gap: 32, fontSize: 15, letterSpacing: "0.04em" }} className="nav-desktop">
            <Link to="/boutique" style={{ color: "#F1E4D5" }}>Boutique</Link>
            <Link to="/boutique?famille=Chaussure" style={{ color: "#F1E4D5" }}>Chaussures</Link>
            <Link to="/boutique?famille=Sac" style={{ color: "#F1E4D5" }}>Sacs</Link>
          </nav>

          <form onSubmit={soumettreRecherche} style={{ display: "none", flexGrow: 1, maxWidth: 320 }} className="recherche-desktop">
            <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher…" style={{ background: "#1A1410", color: "#F1E4D5", border: "1px solid #3A2A20" }} />
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link to="/panier" style={{ position: "relative", color: "#F1E4D5" }} aria-label="Panier">
              <ShoppingBag size={22} />
              {nbPanier > 0 && (
                <span style={{ position: "absolute", top: -8, right: -10, background: "var(--accent)", color: "#fff", fontSize: 11, borderRadius: "999px", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{nbPanier}</span>
              )}
            </Link>
            <button onClick={() => setMenuOuvert((v) => !v)} style={{ background: "none", border: "none", color: "#F1E4D5" }} className="menu-mobile-bouton" aria-label="Menu">
              {menuOuvert ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOuvert && (
          <div style={{ borderTop: "1px solid #3A2A20", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
            <form onSubmit={soumettreRecherche} style={{ display: "flex", gap: 8 }}>
              <input value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher…" />
              <button type="submit" className="btn btn-primaire"><Search size={16} /></button>
            </form>
            <Link to="/boutique" onClick={() => setMenuOuvert(false)} style={{ color: "#F1E4D5" }}>Boutique</Link>
            <Link to="/boutique?famille=Chaussure" onClick={() => setMenuOuvert(false)} style={{ color: "#F1E4D5" }}>Chaussures</Link>
            <Link to="/boutique?famille=Sac" onClick={() => setMenuOuvert(false)} style={{ color: "#F1E4D5" }}>Sacs</Link>
          </div>
        )}
      </header>

      <main style={{ flexGrow: 1 }}>{children}</main>

      <footer style={{ background: "var(--noir)", color: "#D8CDBB", marginTop: 64 }}>
        <div className="container" style={{ padding: "48px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
          <div>
            <img src={logo} alt="La Maison du Cuir by Anaïs" style={{ height: 110, width: "auto", marginBottom: 12 }} />
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>Chaussures et sacs en cuir, élégance et qualité.</p>
          </div>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#E3C46E", marginBottom: 10 }}>Boutique</p>
            <p style={{ fontSize: 14, lineHeight: 2 }}>
              <Link to="/boutique">Tous les articles</Link><br />
              <Link to="/boutique?famille=Chaussure">Chaussures</Link><br />
              <Link to="/boutique?famille=Sac">Sacs</Link>
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#E3C46E", marginBottom: 10 }}>Livraison</p>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>Retrait en boutique ou livraison — choisissez le mode au moment de la commande. Vous serez contactée pour confirmer les détails.</p>
          </div>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#E3C46E", marginBottom: 10 }}>À propos</p>
            <p style={{ fontSize: 14, lineHeight: 2 }}>
              <Link to="/qui-sommes-nous">Qui sommes-nous</Link><br />
              <Link to="/mentions-legales">Mentions légales & CGV</Link>
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #3A2A20", textAlign: "center", padding: "16px", fontSize: 12, color: "#8A7A68" }}>
          Gestion Commerciale by Phil
        </div>
      </footer>

      <style>{`
        @media (min-width: 900px) {
          .nav-desktop { display: flex !important; }
          .recherche-desktop { display: block !important; }
          .menu-mobile-bouton { display: none !important; }
        }
      `}</style>
    </div>
  );
}
