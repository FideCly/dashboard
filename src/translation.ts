export const errorCode = {
  100: { Continue: 'Continuez' },
  101: { 'Switching Protocols': 'Changement de protocoles' },
  102: { Processing: 'Traitement' },
  103: { Earlyhints: 'Conseils précoces' },
  200: {
    OK: 'OK',
    'Card updated': 'Carte mise à jour',
    'Card deleted': 'Carte supprimée',
    'Shop updated': 'Boutique mise à jour',
    'Shop deleted': 'Boutique supprimée',
    'User updated': 'Utilisateur mis à jour',
    'User deleted': 'Utilisateur supprimé',
    'Balance updated': 'Solde mis à jour',
    'Balance deleted': 'Solde supprimé',
    'Promotion updated': 'Promotion mise à jour',
    'Promotion deleted': 'Promotion supprimée',
    'Campaign updated': 'Campagne mise à jour',
    'Campaign deleted': 'Campagne supprimée',
    'Promotion limit reached': 'Limite de promotions atteinte',
  },
  201: {
    Created: 'Créé',
    'Card created': 'Carte créée',
    'Shop created': 'Boutique créée',
    'User created': 'Utilisateur créé',
    'Campaign created': 'Campagne créée',
    'Promotion created': 'Promotion créée',
    'Balance created': 'Solde créé',
  },
  202: { Accepted: 'Accepté' },
  203: { 'Non authoritative Information': 'Information non fiable' },
  204: { 'No Content': 'Aucun contenu' },
  205: { 'Reset Content': 'Réinitialisation du contenu' },
  206: { 'Partial Content': 'Contenu partiel' },
  300: { Ambiguous: 'Ambigu' },
  301: { 'Moved Permanently': 'Déplacé définitivement' },
  302: { Found: 'Trouvé' },
  303: { 'See Other': 'Voir ailleurs' },
  304: { 'Not modified': 'Non modifié' },
  307: { 'Temporary Redirect': 'Redirection temporaire' },
  308: { 'Permanent Redirect': 'Redirection permanente' },
  400: {
    'Bad Request': 'Mauvaise requête',
    'Validation failed': 'Échec de la validation',
    "Shop doesn't have any clients": 'La boutique n’a aucun client',
    'Missing parameters': 'Paramètres manquants',
    'Invalid date format': 'Format de date invalide',
  },
  401: { Unauthorized: 'Non autorisé' },
  402: { 'Payment Required': 'Paiement nécessaire' },
  403: {
    Forbidden: 'Interdit',
    'Promotion is not active': 'Promotion non active',
    'You are not allowed to read this card':
      'Lecture de cette carte non autorisée',
    'Token is invalid': 'Token invalide',
  },
  404: {
    'Not Found': 'Non trouvé',
    'E-Mail not found': 'E-mail introuvable',
    'Shop not found': 'Boutique introuvable',
    'Promotion not found': 'Promotion introuvable',
    'Campaign not found': 'Campagne introuvable',
    'Card not found': 'Carte introuvable',
    'Shop not found htmlFor this user.':
      'Boutique introuvable pour cet utilisateur',
    'Balance not found': 'Solde introuvable',
    'User not found': 'Utilisateur introuvable',
    'Password wrong': 'Identifiant incorrect',
    'Promotions not found': 'Promotions introuvables',
  },
  405: { 'Method Not Allowed': 'Méthode non permise' },
  406: { 'Not Acceptable': 'Non acceptable' },
  407: {
    'Proxy Authentication Required': 'Authentification du proxy nécessaire',
  },
  408: { 'Request Timeout': 'Temps de requête expiré' },
  409: {
    Conflict: 'Conflit',
    'Email already in use': 'E-mail déjà utilisé',
    'E-Mail already exists': 'E-mail déjà existant',
  },
  410: { Gone: 'Parti' },
  411: { 'Length Required': 'Longueur requise' },
  412: { 'Precondition Failed': 'Précondition échouée' },
  413: { 'Payload Too Large': 'Contenu trop volumineux' },
  414: { 'Uri Too Long': 'URI trop longue' },
  415: { 'Unsupported Media Type': 'Type de média non supporté' },
  416: {
    'Requested Range Not Satisfiable': 'Intervalle demandé non satisfaisable',
  },
  417: { 'Expectation Failed': 'Échec de l’attente' },
  418: { 'I Am A Teapot': 'Je suis une théière' },
  421: { Misdirected: 'Mal redirigé' },
  422: { 'Unprocessable Entity': 'Entité non traitable' },
  424: { 'Failed Dependency': 'Dépendance échouée' },
  428: { 'Precondition Required': 'Précondition nécessaire' },
  429: { 'Too many Requests': 'Trop de requêtes' },
  500: { 'Internal Server Error': 'Erreur serveur interne' },
  501: { 'Not Implemented': 'Non mis en œuvre' },
  502: { 'Bad Gateway': 'Mauvaise passerelle' },
  503: { 'Service Unavailable': 'Service indisponible' },
  504: { 'Gateway Timeout': 'Délai de la passerelle expiré' },
  505: { 'Http Version Not Supported': 'Version HTTP non prise en charge' },
};
