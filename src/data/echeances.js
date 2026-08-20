/**
 * Dates de remise, par évaluation et par groupe.
 *
 * Les énoncés d'évaluation sont des fichiers uniques, partagés par les deux
 * sites : le plan de cours fixe les mêmes évaluations aux mêmes semaines pour
 * les deux groupes. Seules les dates changent, et elles vivent ici plutôt que
 * dans les énoncés, afin qu'un énoncé n'ait jamais à exister en deux versions.
 *
 * Un énoncé affiche sa date avec :
 *
 *     import Echeance from '@site/src/components/Echeance';
 *
 *     Remise : <Echeance id="atelier_1" />
 *
 * Le composant lit le groupe du site en cours de construction et choisit la
 * bonne date. Un identifiant absent fait échouer la build.
 */
const echeances = {
  // À remplir en même temps que les énoncés. Exemple de la forme attendue :
  // atelier_1: {1: 'le mardi 15 septembre 2026', 2: 'le jeudi 17 septembre 2026'},
};

export default echeances;
