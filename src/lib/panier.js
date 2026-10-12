const CLE = 'mdc_panier';

function lire() {
  try { return JSON.parse(localStorage.getItem(CLE)) || []; } catch { return []; }
}
function ecrire(lignes) {
  localStorage.setItem(CLE, JSON.stringify(lignes));
  window.dispatchEvent(new Event('panier-maj'));
}

export function getPanier() {
  return lire();
}

export function ajouterAuPanier(produit, pointure, quantite = 1) {
  const lignes = lire();
  const existante = lignes.find((l) => l.articleId === produit.id && l.pointure === (pointure || null));
  if (existante) {
    existante.quantite += quantite;
  } else {
    lignes.push({
      articleId: produit.id, designation: produit.designation, photoUrl: produit.photoUrl,
      prixUnitaire: produit.prixVente, pointure: pointure || null, quantite,
    });
  }
  ecrire(lignes);
}

export function modifierQuantite(articleId, pointure, quantite) {
  let lignes = lire();
  if (quantite <= 0) {
    lignes = lignes.filter((l) => !(l.articleId === articleId && l.pointure === pointure));
  } else {
    const ligne = lignes.find((l) => l.articleId === articleId && l.pointure === pointure);
    if (ligne) ligne.quantite = quantite;
  }
  ecrire(lignes);
}

export function retirerDuPanier(articleId, pointure) {
  ecrire(lire().filter((l) => !(l.articleId === articleId && l.pointure === pointure)));
}

export function viderPanier() {
  ecrire([]);
}

export function totalPanier() {
  return lire().reduce((s, l) => s + l.prixUnitaire * l.quantite, 0);
}

export function nombreArticlesPanier() {
  return lire().reduce((s, l) => s + l.quantite, 0);
}
