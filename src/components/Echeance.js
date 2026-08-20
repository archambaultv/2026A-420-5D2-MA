import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import echeances from '@site/src/data/echeances';

/**
 * Affiche la date de remise d'une évaluation pour le groupe du site courant.
 *
 * Voir src/data/echeances.js pour la table des dates. L'erreur levée ici
 * interrompt la build : une évaluation dont la date manque pour un groupe ne
 * peut pas être publiée avec un trou, ni avec la date de l'autre groupe.
 */
export default function Echeance({id}) {
  const {siteConfig} = useDocusaurusContext();
  const groupe = siteConfig.customFields.groupe;
  const date = echeances[id]?.[groupe];
  if (!date) {
    throw new Error(
      `Aucune échéance « ${id} » pour le groupe ${groupe}. ` +
        'Ajoutez-la dans src/data/echeances.js.',
    );
  }
  return <>{date}</>;
}
