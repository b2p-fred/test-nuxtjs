## Utilisation de bootstrap-vue
A [voir ici](https://bootstrap-vue.js.org/docs/) en détail et la partie qui nous intéresse plus
particulièrement est [le chapitre concernant vue-cli](https://bootstrap-vue.js.org/docs/#vue-cli-3-plugin.
 
```shell
    $ cd pwa-portal
    $ vue add bootstrap-vue
      # Use Babel/polyfill -> Yes
      # Use scss -> Yes
```

Adapter le fichier *assets/scss/vendors/bootstrap-vue/_custom.scss* pour définir des personnalisations ; par exemple les couleurs !

## Internationalisation

 Plusieurs solutions existent mais on privilégie *vue-i18n* car c'est fait pour vuejs ...
 
 A voir ici : https://kazupon.github.io/vue-i18n/
 
```
    $ vue add i18n
     Locale of project -> en
     Fallback locale -> en
     Directory -> locales
     Locale in SFC -> Y
```

 On note l'ajout d'un fichier _.env_ dans le projet, ce qui permettrait de différencier la configuration entre l'environnement de développement et l'environnement de production. On pourra utiliser la variable d'environnement `VUE_APP_I18N_LOCALE` pour spécifier la langue par défaut...
 Plus d'information sur les variables d'environnement ici : https://cli.vuejs.org/guide/mode-and-env.html
 
 On note également le fichier _config.vue.js_ qui contient la configuration renseignée lors de l'installation du plugin. 
 
 Les fichiers de traduction sont en Json dans le répertoire locales. Les traductions peuvent être imbriquées, ce qui permet des regroupements thématiques (eg. main, login, ...)
 
 Le composant _HelloWorld_ est modifié pour intégrer une **card** bootstrap dans la 1ère colonne. On y trouve:
 - un sélecteur de langue qui permet de basculer entre anglais et français
 - des textes traduits (title) ou pas (header, footer)
 - des dates
 - des nombres


## Sign in / sign up

 A terme il faudra utiliser un back-end implémentant une API JSON. Dans l'attente de la disponibilité de ce backend, on peut simuler ce back-end pour l'enregistrement et la connexion des utilisateurs du front-end.
 
 On va en profiter aussi pour utiliser VueX (https://vuex.vuejs.org/) qui permet de gérer un store commun à tous les composants d'une application tout en gérant les états de ce store. Parfait pour stocker les informations d'un utilisateur connecté à l'application et les données qu'il manipule ...

```
    $ cd pwa-portal
    $ yarn add vuex
```

 On va également utiliser Vue Router (https://router.vuejs.org/) pour gérer les routes au sein de l'application. Vu qu'il va nous falloir une page d'inscription, une page de connexion, une page d'accueil, ... ça fait des routes !

```
    $ cd pwa-portal
    $ yarn add vue-router
```
 
 Le code va commencer à se complexifier ... on va faire un peu d'organisation : 
 - _src/_store_ pour ce qui concerne le stockage et les données
 - _src/_services_ pour ce qui concerne les services de l'application
 - _src/_helpers_ pour des fonctions utilitaires, par ex. :
    - configuration 
    - routage entre les pages (login -> home -> logout -> ...)
    - gestion des headers HTTP
 
 On créé trois "pages" dans le répertoire _src/views_ :
 - HomePage.vue, la home page de l'application protégée par une authentification utilisateur
 - LoginPage.vue, la page de connexion pour authentifier un autilisateur
 - RegisterPage.vue, la page de demande d'inscription des utilisateurs

 Le faux backend va enregistrer les utilisateurs qui s'inscrivent en interceptant les demandes _/register_ et en gérant une liste des utilisateurs dans le stockage local du navigateur. Pour la vraie application, cette liste sera gérée dans le backend...
 A l'enregistrement d'un utilisateur, un champ _Password_ est automatiquement ajouté en copiant le nom renseigné pour l'utilisateur.
 
 Lorsqu'une demande de connexion est soumise, le faux backend recherche le nom d'utilisateur dans les emails des utilisateurs inscrits.
 
 Si le login est valide, la home page est affichée et elle présente un panneau avec les fonctions de localisation et un panneau avec la liste des utilisateurs. cette liste permet de supprimer chacun des utilisateurs enregistrés  

# Construction de l'application

**Note :** on ne revient pas sur les pages de login et d'inscription dans cette partie du tutoriel.

## Déploiement de l'application
### Packaging

En utilisant `vue ui` on peut "construire" l'application à déployer. Dans l'onglet _Build_, on peut configurer et lancer le packaging de l'application. Tout le contenu du répertoire _dist_ est à copier sur le serveur Web pour disposer d'une version de l'application utilisable depuis la racine d'un site Web.

**A noter** que le traditionnel `npm run build` réalise la même opération ...

### Configuration

Il est recommandé de configurer l'application, si nécessaire, en utilisant des variables d'environnement. Voir [cette documentation](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables) sur les possibilités.

Voir les fichiers _.env_, _.env.development_ et _.env.production_ ... la variable `VUE_APP_SECRET` sera valorisée différemment selon l'environnement d'exécution de l'application.

### Web App

Le fichier manifeste de l'application _public/manifest.json_. S'il n'existe pas, il est construit par défaut lors du packaging de l'application pour build. Le contenu [est défini ici](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Pour ce qui concerne tous les icones de l'application, voir [cet excellent article](https://bigint.fr/blog/2014-03-29/Informations-sur-le-favicon) et utiliser le [générateur d'icones](https://realfavicongenerator.net/) qui est référencé dans cet article.

Pour une explication des possibilités offertes par ce manifeste [voir cet article](https://medium.com/@guillaumeandre/progressive-web-app-pwa-fichier-web-app-manifest-7292db378af5).

La quasi totalité des navigateurs supportant les PWA proposerons à l'utilisateur d'installer l'app localement. Le plus souvent, il y a une icone dans l'info barre pour cela mais il n'existe pas une règle unique... [Voir ici pour les détails](https://developers.google.com/web/tools/lighthouse/audits/install-prompt) et [pour iOS, voir ici](https://superpwa.com/doc/test-pwa-ios-devices/). Le point important est _Meets a user engagement heuristic_ qui dépend de chaque navigateur: chrome attend deux visites espacées de 5 minutes sur le site, Samsung propose dès la 1ère navigation, ...

Un bon état des lieux de ce que proposent les browsers [sur ce site](https://love2dev.com/pwa/add-to-homescreen-library/) et ce site présente bien les choses pour ce qui concerne l'installation d'une application en local. En particulier, on va utiliser la librairie proposée par ce site. Toutefois, du fait de quelques problèmes existants et qu'on a corrigé, on va intégrer cette librairie dans l'application:
- fichier _public/css/a2hs.css_ pour les styles
- fichier _src/_helpers/a2hs.js_ pour le code source

Cette librairie va permettre de proposer l'installation de façon un peu homogène sur tous les devices.  Le repo original [se trouve ici](https://github.com/docluv/add-to-homescreen), mais attention il y a 2/3 trucs qui ne sont pas très corrects ... les noms des images entre autres.


### Indexation

Le fichier _robots.txt_ utilisé par défaut est localisé dans les fichiers statiques de l'application, voir le répertoire _public_ qui contient également le favicon, le index.html, ...

On modifie le contenu de ce fichier pour interdire l'indexation de tout le site:
```
    User-agent: *
    Disallow: /
``` 

### Ciblage des navigateurs

L'utilisation de _Babel_ permet de transpiler le code Javascript ou Typescript de l'application pour qu'il s'exécute sur des versions différentes de navigateurs Web.

Les versions ciblées par l'application sont définies par le fichier de configuration _.browserlistrc_ :
```
    > 1%
    last 3 versions
``` 

Pour voir la liste des navigateurs concernés :
```
    $ npx browserslist
    and_chr 76
    and_ff 68
    and_qq 1.2
    and_uc 12.12
    android 76
    baidu 7.12
    bb 10
    bb 7
    chrome 77
    chrome 76
    chrome 75
    edge 18
    edge 17
    edge 16
    firefox 69
    firefox 68
    firefox 67
    ie 11
    ie 10
    ie 9
    ie_mob 11
    ie_mob 10
    ios_saf 13
    ios_saf 12.2-12.3
    ios_saf 12.0-12.1
    kaios 2.5
    op_mini all
    op_mob 46
    op_mob 12.1
    op_mob 12
    opera 62
    opera 60
    opera 58
    safari 13
    safari 12.1
    safari 12
    samsung 9.2
    samsung 8.2
    samsung 7.2-7.4
```

## Généralités
### Personnalisation de Bootstrap

Ajout d'un fichier scss pour (re)définir des variables SASS. Voir le fichier _src_assets/custom-vars.scss_.

Et voir [cette page](https://bootstrap-vue.js.org/docs/reference/theming) qui explique comment on personnalise Bootstrap.

### Persistance des données

Pour persister les données en local sur le client, on utilise le Local storage du navigateur. Si, toutefois, cette fonctionnalité n'était pas disponible, il faudrait pouvoir utiliser un autre mécanisme (eg. IndexedDB, stockage distant) ou pallier à ce manque. On a intérêt à ce que l'accès au stockage local soit groupé au sein d'un même service. Voir le fichier _src/_services/local-storage.service.js_.

### Manifeste de l'application

La page About... de l'application permet à l'utilisateur de connaitre quelques détails sur l'application. Pour cela, nos allons récupérer les données de manifeste de l'application et les exposer sur une page modale.

Une [astuce ici](https://medium.com/hceverything/how-to-show-your-app-version-from-package-json-in-your-vue-application-11e882b97d8c) pour récupérer la version courante et d'autres informations.

### Messages d'alerte

Le store VueX qui est implémenté permet de mémoriser un message d'alerte à destination de l'utilisateur. Pour le moment, ce message est un _success_ ou une _error_ et il est utilisé pour les connexions et inscriptions ds utilisateurs.

La page d'accueil et la page de login incluent un **b-alert** si un mesasge est présent. L'application (_App.vue_) supprime le message stocké lors d'un changement de route.

### Icones

On va utiliser [Font Awesome](https://fontawesome.com/) pour ses nombreuses icones et facilités d'utilisation. Font awesome dispose d'un package pour Vue.js : https://github.com/FortAwesome/vue-fontawesome.

On installe les packages nécessaires :
```
    $ npm i --save @fortawesome/fontawesome-svg-core
    $ npm i --save @fortawesome/free-solid-svg-icons
    $ npm i --save @fortawesome/vue-fontawesome
```

A noter que la version gratuite ne prévoit que le package *solid* ! Il n'est donc pas nécessaire d'installer tous les autres...

Ensuite, on va importer les icones dans notre _src_main.js_  :
 ```vue
    // Font Awesome icons importation
    import { library } from "@fortawesome/fontawesome-svg-core";
    import { faCoffee } from "@fortawesome/free-solid-svg-icons";
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    
    // Add icons to our livbrary
    library.add(faCoffee, faSpinner);
    
    Vue.component("font-awesome-icon", FontAwesomeIcon);
    // On peut maintenant utiliser <font-awesome-icon icon="coffee" /> pour afficher l'icone coffee
```

L'intérêt de cette approche par rapport aux versions précédentes de FA et à l'utilisation des Web fonts: on ne prend que les icones qui sont utilisées, ce qui limite la taille des bundles de l'application !

Dans les composants _NavigationBar_ et dans les pages _Login_ et _Register_ on utilise des  icônes pour les boutons de connexion, déconnexion et inscription.

Dans le composant _HelloTile_ on souhiate pouvoir utiliser n'importe quelle icône disponible dans le package en mentionnant simplement son nom, donc on va adapter le chargement des packages comme suit:

```vue
    // Font Awesome icons importation
    import { library } from "@fortawesome/fontawesome-svg-core";
    // Import all icons from the module
    import { fas } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
    
    // Add  all icons to our library
    library.add(fas);
    
    Vue.component("font-awesome-icon", FontAwesomeIcon);
    // On peut maintenant utiliser <font-awesome-icon icon="coffee" /> pour afficher l'icone coffee
```

## Home page
### Ajout d'une barre de navigation et d'un pied de page

Création d'un composant _.src/components/NavigationBar.vue_ qui contient une barre de navigation **<b-navbar>**. La barre de navigation est responsive, contient une zone pour le logo, des liens, du texte, un menu déroulant, ... on y inclut également le switcher de langue.

Création d'un composant _.src/components/FooterBar.vue_ qui contient un **<footer>**. Le fotter contient une mention de copyright et un lien vers les mentions légales de l'application.

Pour un positionnement correct de la barre de navigation on va jouer sur la marge haute de l'application dans les styles de _App.vue_.

Pour un positionnement correct du footer bas de page on va utiliser les classes `navbar` et `navbar-fixed-bottom` et on va jouer sur la marge basse de l'application dans les styles de _App.vue_.

**Note :** on va simplifier cette barre de navigation pour l'application ... pour le moment, on garde des exemples !

### L'utilisation des slots dans les templates

A voir surtout ici : https://fr.vuejs.org/v2/guide/components-slots.html

On modifie le template de la barre de navigation pour y ajouter un _slot_ ... ce qui correspond, plus ou moins, à une variable du template qu'on pourra spécifier lorsqu'on inclut une instance du template dans la page.

Voir le code modifié dans _.src/components/NavigationBar.vue_ et dans _.src/views/HomePage.vue_. La valeur par défaut est utilisée si le template est utilisé sans redéfinition du contenu du slot.

Dans notre cas, la barre de navigation présente un message de bienvenue par défaut et ce message est personnalisé dans la home page avec le friendly name de l'utlisateur connecté.

### Sélecteur de langues avec les drapeaux

**Note** : utiliser le package `vue-flag-icon` est une solution intéressante car les drapeaux de tous les pays sont présents dans le package. Par contre, l'inconvénient de ce package est qu'il n'est pas sensible au _tree shaking_ .. de ce fait, tous les drapeaux sont inclus dans la distribution de l'application !

Magré la compatibilité annoncée de Internet Explorer (versions 10 et 11) avec le format SVG, la réalité est un peu différente ... de ce fait, on va privilégier le format PNG pour les images des drapeaux. Voir [ce site](https://icon-icons.com/fr/pack/Flat-Europe-Flag-Icons/266) pour les fichiers utilisés.

Le composant _LocaleChanger_ est un menu drop down de Bootstrap qui permet de présenter les langues configurées dans les données du composant. Des propriétés permettent de configurer la présence / absence d'une image et d'un texte pour chaque langue.


## Mentions légales

Les mentions légales de l'application sont présentées dans une fenêtre modale activée depuis le pied de page. Le contenu de cette _model_ est défini comme suit:
- un titre
- un texte header
- 5 paragraphes de texte
- un texte footer.


## Dashboard personnalisable

L'idée derrière ce concept est de permettre de disposer d'une page d'accueil sur laquelle les widgets présentés dépendent de l'utilisateur connecté. Pour cela, on introduit la notion de profil utilisateur.

Une fois la connexion à l'application réussie, on récupère le profil utilisateur auprès du back-end (`GET /me`) ce qui nous met à disposition un _role_ et un _layout_.

Le _role_ correspond au rôle de l'utilisateur et donc à ce que l'application lui permettra de consulter / réaliser. Pour le moment, seul le rôle `tenant`  est pris en compte.

Le _layout_ correspond aux widgets qui seeront présentés sr la page d'accueil. si le _layout_ n'est pas fourni, un layout par défaut est présent dans l'application. Voir le fichier _assets/layout-default.json_.

Pour le moment, il existe 3 widgets qui sont les composants qu'on a construit depuis le début de ce tuto. On ajout deux composants **HelloTileL** et **HelloTileR**. Ce sont deux simples cartes avec un texte en haut, un texte en bas, une icône et un texte au milieu. La seule différence est l'alignement de l'icône. Voir le fichier _assets/layout-tenant.json_ pour un exemple de configuration.

Seul le fichier _assets/layout-default.json_ est indispenasble; les autres fichiers sont présents uniquement lorsqu'on utilise le fake backend ! Il est évident que c'est le backend qui fournira les indications de rôle et de layout ... par contre, à défaut d'un vrai backend on utilisera des fichiers.

En priorité on cherche un fichier _assets/layout-LastName.json_ avec le nom de l'utilisateur connecté. A défaut on cherche un fichier _assets/layout-Role.json_ avec le rôle. A défaut, on utilise le fichier _assets/layout-default.json_ !

Pour le moment, 2 exemples sont disponibles :
- login avec le nom `Martin`
- login avec un autre nom qui fera utiliser le layout **tenant**

Pour la suite, on fera évoluer le layout **tenant** qui, à terme, deviendra le layout par défaut.

Syntaxe:
```json
{
  "id": "tenant",
  "type": "role",
  "rows": [
    {
      "columns": [
        {"span": "col-lg-3 col-md-12", "widget": "HelloLocalization"},
        {"span": "col-lg-6 col-md-6 col-sm-12", "widget": "HelloIcons"},
        {"span": "col-lg-3 col-md-6 col-sm-12", "widget": "HelloUsers"}
      ]
    },
    {
     "columns": [
       { "widget": "HelloTileL" },
       {
         "widget": "HelloTileL",
         "params": {
           "title": "Widget title",
           "subtitle": "and sub-title -)",
           "icon": "coffee",
           "text": "Hi! I'm back"
         }
       },
       { "widget": "HelloTileR" }
     ]
   }
  ]
}
```
- type: `role` pour un layout de rôle, sinon `user` pour un layout spécifique à l'utilisateur
- span: correspond à la classe utilisée pour l'élément `b-col`, ce qui permet de jouer sur le responsive ...
- widget: le nom du composant Vue à utiliser
- data: les paramètres du composant ... qui dépendent du composant

### Le composant HelloTile

Le composant _src/components/HelloTile.vue_ est un exemple de composant de base qu'on peut utiliser dans le dashboard. On peut construire d'autres composants sur la base de _HelloTile_ sous une forme de pseudo-héritage ... voir le code de _HelloTileL_ et _HelloTileR_ qui utilisent une instance de _HelloTile_ en configurant simplement un paramètre.

Le composant _HelloTile_ est construit pour utiliser une _card_ Bootstrap qui présente trois zones d'information dans des slots Vue.js :
- un top, qui présente, par défaut, un `<header>` avec le texte de la prop _data.header_
- un body, qui présente, par défaut, un icône et un texte, plus un autre texte
- un bottom, qui présente, par défaut, un `<footer>` avec le texte de la prop _data.header_

Voir les exemples de configuration dans le fichier _layout-tenant.json.

**A noter** : les composants précédemment créés (_HelloLocalization_, _HelloI18n_ et _HelloIcons_) auraient pu être réutilisés tels quels dans le dashboard. Le choix a été fait de les reconstruire sur la base du composant _HelloTile_ pour harmoniser plus facilement...
