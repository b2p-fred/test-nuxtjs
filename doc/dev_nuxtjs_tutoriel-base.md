# Utilisation de NuxtJS

[Nuxt JS](https://fr.nuxtjs.org/) est un framework applicatif basé sur [VueJS](https://fr.vuejs.org).

La doc [existant pour VueJS](dev_vuejs_tutoriel-base.md) reste valide pour NuxtJS -)

## NuxtJS trial

La solution la plus simple pour créer une nouvelle application :  
```shell
$ yarn create nuxt-app my-nuxt-front
  # Répondre aux questions ... et attendre -)
  # Nous on veut une PWA qui soit une Single Page Application !
```

## Serveur de développement

Lancer l'application en mode développement :

```shell
$ yarn dev
```

C'est ce que fait le container Docker `node-nuxtjs` au démarrage.

## Déploiement en production

Lancer la génération :

```shell
$ yarn generate
# Copier le contenu du dossier *.dist* est à placer dans un serveur Web pour accès distant.
```

## Variables d'environnement

[Voir ici](https://fr.nuxtjs.org/docs/2.x/configuration-glossary/configuration-env) et installer le module .env:

```
// Manifest
import pkg from './package.json';
...

  # Update the nuxt.config.js file
  // Environment variables - https://nuxtjs.org/guide/runtime-config
  publicRuntimeConfig: {
    // Application manifest
    APP_NAME: pkg.name,
    APP_VERSION: pkg.version,
    // Backend API root endpoint
    API_URL: process.env.API_URL || 'local',
    // Application base URL
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },

  // fixme: useful ?
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:3001'
    }
  },

```


## Scripts de démarrage (main.client.js)

Les scripts exécutés au démarrage de l’application doivent être déclarés dans la clé `[plugins]` du fichier *nuxt.config.js*. C'est le cas du plugin `main` (*./plugins/min.client.js*)

```
# Update the nuxt.config.js file
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {ssr: false, src: '~plugins/main.client'},
    ...,
  ],
```


## authentification des utilisateurs

[Deux modules](https://auth.nuxtjs.org/) très utiles dans la librairie de Nuxt.js : `axios` et `auth`

```shell
$ yarn add --exact @nuxtjs/auth-next
$ yarn add @nuxtjs/axios

# Update the nuxt.config.js file
```
```
    require('dotenv').config()
    
    export default {
      // your usual nuxt config.
    }
```
