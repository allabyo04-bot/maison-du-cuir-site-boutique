// IMPORTANT : à définir dans les variables d'environnement Railway (VITE_API_URL),
// avec l'URL réelle du backend de la gestion + "/api/boutique" à la fin.
// Exemple : https://maison-du-cuir-gestion-backend-production.up.railway.app/api/boutique
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/boutique';

export async function appelApi(methode, chemin, corps) {
  const reponse = await fetch(`${BASE_URL}${chemin}`, {
    method: methode,
    headers: { 'Content-Type': 'application/json' },
    body: corps ? JSON.stringify(corps) : undefined,
  });
  const texte = await reponse.text();
  let data;
  try { data = texte ? JSON.parse(texte) : null; } catch { data = texte; }
  if (!reponse.ok) {
    const message = (data && data.error) || 'Une erreur est survenue.';
    throw new Error(message);
  }
  return data;
}

export const api = {
  produits: (params = {}) => {
    const qs = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([, v]) => v))).toString();
    return appelApi('GET', `/produits${qs ? `?${qs}` : ''}`);
  },
  produit: (id) => appelApi('GET', `/produits/${id}`),
  marques: () => appelApi('GET', '/marques'),
  creerCommande: (data) => appelApi('POST', '/commandes', data),
  commande: (numero) => appelApi('GET', `/commandes/${numero}`),
};

export function fmt(n) {
  return new Intl.NumberFormat('fr-FR').format(n || 0);
}
