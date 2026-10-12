import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil.jsx";
import Boutique from "./pages/Boutique.jsx";
import Produit from "./pages/Produit.jsx";
import Panier from "./pages/Panier.jsx";
import Commande from "./pages/Commande.jsx";
import ConfirmationCommande from "./pages/ConfirmationCommande.jsx";
import QuiSommesNous from "./pages/QuiSommesNous.jsx";
import MentionsLegales from "./pages/MentionsLegales.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/boutique" element={<Boutique />} />
      <Route path="/produit/:id" element={<Produit />} />
      <Route path="/panier" element={<Panier />} />
      <Route path="/commande" element={<Commande />} />
      <Route path="/confirmation/:numero" element={<ConfirmationCommande />} />
      <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
    </Routes>
  );
}
