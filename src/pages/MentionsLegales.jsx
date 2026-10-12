import Layout from "../components/Layout.jsx";

export default function MentionsLegales() {
  return (
    <Layout>
      <div className="container" style={{ padding: "48px 24px 72px", maxWidth: 780 }}>
        <h1 className="font-display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Mentions légales & Conditions générales de vente</h1>

        <h2 style={s.h2}>Éditeur du site</h2>
        <p style={s.p}>
          Le présent site est édité par La Maison du Cuir by Anaïs.<br />
          Adresse : [Adresse à compléter]<br />
          Téléphone : [Téléphone à compléter]<br />
          [Numéro RCCM à compléter, si la boutique est formellement enregistrée]
        </p>

        <h2 style={s.h2}>Produits et prix</h2>
        <p style={s.p}>
          Les prix affichés sont exprimés en Francs CFA (XOF), toutes taxes comprises. La Maison du
          Cuir se réserve le droit de modifier ses prix à tout moment, les produits étant facturés
          sur la base du tarif en vigueur au moment de la validation de la commande. Les photos et
          descriptions des produits sont fournies à titre indicatif et n'engagent pas
          contractuellement La Maison du Cuir.
        </p>

        <h2 style={s.h2}>Commande</h2>
        <p style={s.p}>
          Toute commande passée sur le site est transmise à notre équipe, qui vous recontacte au
          numéro indiqué pour confirmer les détails (disponibilité, délai, modalités de paiement).
          La commande n'est définitive qu'après cette confirmation.
        </p>

        <h2 style={s.h2}>Paiement</h2>
        <p style={s.p}>
          [À compléter selon les modes de paiement acceptés — par exemple : paiement à la livraison,
          Mobile Money, virement, etc.]
        </p>

        <h2 style={s.h2}>Livraison et retrait</h2>
        <p style={s.p}>
          Les commandes peuvent être retirées ou livrées selon le mode choisi lors de la commande.
          Les délais indiqués sont donnés à titre indicatif et peuvent varier selon la disponibilité
          des produits et la zone de livraison.
        </p>

        <h2 style={s.h2}>Retours et échanges</h2>
        <p style={s.p}>
          Pour toute question relative à un retour, un échange ou une réclamation sur un produit
          reçu, merci de nous contacter directement avec votre numéro de commande — nous étudierons
          chaque situation au cas par cas.
        </p>

        <h2 style={s.h2}>Données personnelles</h2>
        <p style={s.p}>
          Les informations collectées lors d'une commande (nom, téléphone, email, adresse) sont
          utilisées uniquement pour le traitement de votre commande et notre relation client. Elles
          ne sont ni revendues ni transmises à des tiers à des fins commerciales.
        </p>

        <h2 style={s.h2}>Contact</h2>
        <p style={s.p}>
          Pour toute question, réclamation ou demande d'information, contactez-nous au [Téléphone à
          compléter].
        </p>
      </div>
    </Layout>
  );
}

const s = {
  h2: { fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700, marginTop: 28, marginBottom: 8 },
  p: { color: "var(--texte-doux)", fontSize: 15, lineHeight: 1.7, margin: 0 },
};
