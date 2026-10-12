import Layout from "../components/Layout.jsx";

export default function QuiSommesNous() {
  return (
    <Layout>
      <div className="container" style={{ padding: "48px 24px 72px", maxWidth: 780 }}>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Qui sommes-nous ?</h1>

        <p style={s.p}>
          La Maison du Cuir by Anaïs est une maison dédiée aux chaussures et sacs en cuir
          véritable, pensée pour celles qui recherchent élégance, qualité et confort au quotidien.
        </p>
        <p style={s.p}>
          Chaque pièce de notre collection est choisie avec soin, pour sa finition et sa durabilité,
          afin de vous offrir des articles qui vous accompagnent longtemps.
        </p>
        <p style={s.p}>
          Commandez en ligne en toute simplicité : choisissez votre article, précisez votre mode de
          retrait ou de livraison, et nous vous recontactons rapidement pour confirmer votre commande.
        </p>

        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 36, marginBottom: 14 }}>Nos engagements</h2>
        <ul style={s.ul}>
          <li>Du cuir véritable, choisi pour sa qualité</li>
          <li>Un service attentif, à l'écoute de chaque cliente</li>
          <li>Retrait en boutique ou livraison, selon votre préférence</li>
        </ul>

        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 36, marginBottom: 14 }}>Nous contacter</h2>
        <p style={s.p}>
          [Téléphone à compléter]<br />
          [Adresse à compléter]
        </p>
      </div>
    </Layout>
  );
}

const s = {
  p: { color: "var(--texte-doux)", fontSize: 15, lineHeight: 1.7, marginBottom: 16 },
  ul: { color: "var(--texte-doux)", fontSize: 15, lineHeight: 1.9, paddingLeft: 20, margin: 0 },
};
