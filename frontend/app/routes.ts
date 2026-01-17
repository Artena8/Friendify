import {
    type RouteConfig,
    route,
} from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
    ...(await flatRoutes()),
] satisfies RouteConfig;

/* Commentary: Convention des routes utilisée pour le routage basé sur le système de fichiers avec React Router.

Basic routes : frontend/app/routes/
Chaque fichier et dossier dans ce répertoire correspond à une route dans l'application.
Les fichiers _index.tsx représentent les routes par défaut pour un dossier donné.

Dots delimiters : Les points dans les noms de fichiers sont remplacés par des barres obliques dans les chemins de route.
Par exemple, un fichier nommé user.profile.tsx correspond à la route /user/profile.

Dynamic segments : Les segments dynamiques dans les noms de fichiers sont indiqués par des $.
app/routes/concerts.$city.tsx ou city est une variable capturée dans l'URL.

Nested routes : Les dossiers imbriqués représentent des routes imbriquées.
Par exemple, un fichier dashboard.settings.tsx est une route imbriquée sous /dashboard.
Pour ne pas avoir de route imbriquée, on peut l'indiquer avec dashboard_.settings.tsx

Leading underscore for pathless routes 
: Les fichiers ou dossiers commençant par un _ ne créent pas de segment de chemin.
Par exemple, un fichier _auth.login.tsx et _auth.register.tsx dans un dossier auth correspondent tous deux à la route /auth mais sans ajouter de segment supplémentaire.

app/routes/$.tsx => Correspond a toutes les routes non définies (404)
app/routes/index.tsx => Correspond a la route racine (/)

# these are the same route:
app/routes/app.tsx
app/routes/app/route.tsx

# as are these
app/routes/app._index.tsx
app/routes/app._index/route.tsx

*/