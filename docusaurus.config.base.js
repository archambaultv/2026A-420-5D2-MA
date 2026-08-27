// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// UN SITE PAR GROUPE
//
// Le cours est donné à deux groupes. Chaque groupe a son propre site, construit
// à partir de ce fichier : `npm run build:g1` produit build/g1, `build:g2`
// produit build/g2. Un étudiant ne reçoit que l'adresse de son groupe, et le
// site qu'il reçoit ne contient aucune route vers l'échéancier de l'autre
// groupe : ces pages ne sont tout simplement pas dans sa build. Personne ne
// peut donc lire la mauvaise date en croyant lire la sienne.
//
// Le contenu n'est pas dupliqué pour autant. Les deux sites montent les *mêmes*
// dossiers pour les notes de cours et les évaluations, via deux instances
// distinctes de plugin-content-docs. Seul `content/echeancier/g<N>` change d'un
// site à l'autre. Une correction dans les notes profite aux deux groupes au
// prochain push, sans copie ni fichier passe-plat.
//
// Les évaluations sont partagées parce que les énoncés sont identiques : le
// plan de cours fixe les mêmes évaluations aux mêmes semaines pour les deux
// groupes. Seules les dates de remise diffèrent, et elles viennent de
// src/data/echeances.js via le composant <Echeance/>, qui lit le groupe du site
// courant. Si un jour un énoncé doit réellement diverger, il suffira de sortir
// ce fichier-là dans content/evaluations/g1 et g2 : la structure est déjà là.

const ORG = 'archambaultv';
const REPO = '2026A-420-5D2-MA';
const REPO_URL = `https://github.com/${ORG}/${REPO}`;

/**
 * Construit la configuration du site d'un groupe.
 *
 * @param {1 | 2} groupe
 * @returns {import('@docusaurus/types').Config}
 */
export default function createConfig(groupe) {
  /**
   * Une instance de plugin-content-docs. `id` sert à la fois d'identifiant de
   * plugin (pour `docsPluginId` dans la barre de navigation) et de préfixe
   * d'URL, afin que les deux groupes aient exactement les mêmes adresses.
   *
   * @param {string} id
   * @param {string} contentPath dossier source, relatif à la racine du dépôt
   */
  const docs = (id, contentPath) => [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      id,
      path: contentPath,
      routeBasePath: id,
      // Le même fichier sert aux trois instances : `dirName: '.'` désigne la
      // racine du dossier de l'instance courante, quelle qu'elle soit.
      sidebarPath: './sidebars.js',
      editUrl: `${REPO_URL}/tree/main/${contentPath}/`,
    }),
  ];

  return {
    title: `Applications web 2, groupe ${groupe}`,
    tagline: 'Applications web 2',
    // Version carrée et simplifiée du logo : le cadre large de 5D2.svg est
    // illisible à 16-32px. Sert aussi de logo dans la barre de navigation.
    favicon: 'img/logo-square.svg',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
      v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    url: `https://${ORG}.github.io`,
    baseUrl: `/${REPO}/g${groupe}/`,

    // GitHub pages deployment config.
    organizationName: ORG,
    projectName: REPO,

    onBrokenLinks: 'throw',
    markdown: {
      hooks: {
        onBrokenMarkdownLinks: 'throw',
      },
    },

    // Lu par <Echeance/> et par la page d'accueil, qui sont des fichiers
    // partagés : c'est ainsi qu'ils savent quel groupe ils servent.
    customFields: {groupe},

    i18n: {
      defaultLocale: 'fr',
      locales: ['fr'],
    },

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          // La documentation est servie par les trois instances déclarées dans
          // `plugins` ci-dessous, pas par le préréglage.
          docs: false,
          blog: false,
          theme: {
            customCss: './src/css/custom.css',
          },
        }),
      ],
    ],

    plugins: [
      docs('notes_de_cours', 'content/notes_de_cours'),
      docs('echeancier', `content/echeancier/g${groupe}`),
      docs('evaluations', 'content/evaluations'),
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        docs: {
          sidebar: {
            hideable: true,
            autoCollapseCategories: true,
          },
        },
        // Carte de partage (aperçu dans MIO, Teams, Discord...). Doit être en PNG/JPG :
        // les réseaux sociaux ne rendent pas les SVG. Version rasterisée de la police
        // Patrick Hand (SIL OFL 1.1) : c'est la police à réutiliser pour la régénérer.
        image: 'img/social-card.png',
        colorMode: {
          respectPrefersColorScheme: true,
        },
        navbar: {
          title: 'Applications web 2',
          logo: {
            // Version carrée : le logo large est réduit à la hauteur de la barre
            // de navigation, où le code du cours devient minuscule.
            alt: 'Applications web 2',
            src: 'img/logo-square.svg',
          },
          items: [
            {
              type: 'docSidebar',
              docsPluginId: 'echeancier',
              sidebarId: 'sidebar',
              position: 'left',
              label: 'Échéancier',
            },
            {
              type: 'docSidebar',
              docsPluginId: 'notes_de_cours',
              sidebarId: 'sidebar',
              position: 'left',
              label: 'Notes de cours',
            },
            {
              type: 'docSidebar',
              docsPluginId: 'evaluations',
              sidebarId: 'sidebar',
              position: 'left',
              label: 'Évaluations',
            },
            {
              // Pastille de groupe, présente sur toutes les pages : un étudiant
              // arrivé sur le mauvais site voit le numéro sans avoir à comparer
              // des dates.
              type: 'html',
              position: 'right',
              value: `<span class="navbar__groupe">Groupe ${groupe}</span>`,
            },
            {
              href: 'https://archambaultv.github.io/git',
              label: 'Tutoriel Git',
              position: 'right',
            },
            {
              href: REPO_URL,
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          copyright: `Site du <strong>groupe ${groupe}</strong>. Cette œuvre est placée sous licence <a href="https://creativecommons.org/licenses/by/4.0/deed.fr" target="_blank" rel="noopener noreferrer">Creative Commons Attribution 4.0 International</a>. Construit avec <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a>.`,
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.dracula,
        },
      }),
  };
}
