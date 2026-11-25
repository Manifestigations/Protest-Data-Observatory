/* The CTA target. Copy lives here rather than in HTML so the page re-renders
   on a locale change like every chart caption does. */

import { bi, type Bi } from "../../copy";
import { byId } from "../../core/dom";
import { html } from "../../core/html";

const REPO = "https://framagit.org/manifestigations/Protest-Data-Observatory";
const NEW_ISSUE = `${REPO}/issues/new`;
const ISSUES = `${REPO}/issues`;

interface Action {
  readonly label: Bi;
  readonly href: string;
}

interface Block {
  readonly id: string;
  readonly title: Bi;
  readonly lead: Bi;
  readonly bullets: readonly Bi[];
  readonly note?: Bi;
  readonly status?: Bi;
  readonly actions?: readonly Action[];
}

const DATA_NOTE: Block["note"] = {
  en: "French or English, whichever you write in. A free GitHub account is the only requirement: no local setup, no code, no knowledge of this repository.",
  fr: "En français ou en anglais, selon ce qui vous est le plus facile. Un compte GitHub gratuit est la seule condition : aucune installation, aucun code, aucune connaissance de ce dépôt.",
};

const BLOCKS: readonly Block[] = [
  {
    id: "data",
    title: {
      en: "Send a data point, or a correction",
      fr: "Envoyer un chiffre, ou une correction",
    },
    lead: {
      en: "You do not need to be a programmer and you do not need to read the code. If you know a figure this site is missing — or has wrong — open an issue and paste the number with the source that publishes it. That is the whole process: a figure, a date, a link.",
      fr: "Il n’est pas nécessaire d’être programmeur ni de lire le code. Si vous connaissez un chiffre qui manque à ce site — ou qui y est faux — ouvrez un ticket et collez le chiffre avec la source qui le publie. C’est tout le processus : un chiffre, une date, un lien.",
    },
    bullets: [
      {
        en: "What the figure is: turnout, arrests, injuries, blocked schools, damage, cost of policing.",
        fr: "Ce que mesure le chiffre : foule, interpellations, blessés, lycées bloqués, dommages, coût du maintien de l’ordre.",
      },
      {
        en: "Where and when: the date, and the territory — national, a region, one city, one establishment.",
        fr: "Où et quand : la date, et le territoire — national, une région, une ville, un établissement.",
      },
      {
        en: "The figure as published, including the range if the publisher gives one. Do not average two publishers for us.",
        fr: "Le chiffre tel que publié, fourchette comprise si l’éditeur en donne une. Ne moyennez pas deux éditeurs à notre place.",
      },
      {
        en: "The source: a URL, a report title and page, or the outlet and date of an article. Paywalled or a PDF is fine — say so and we will find it.",
        fr: "La source : une URL, un titre de rapport et sa page, ou le média et la date d’un article. Payant ou en PDF, ce n’est pas un obstacle : dites-le et nous irons le chercher.",
      },
      {
        en: "Who published it, and whether they are counting or estimating. The charts mark the difference.",
        fr: "Qui l’a publié, et s’il s’agit d’un décompte ou d’une estimation. Les graphiques distinguent les deux.",
      },
    ],
    note: DATA_NOTE,
    actions: [
      {
        label: { en: "Open an issue", fr: "Ouvrir un ticket" },
        href: NEW_ISSUE,
      },
      {
        label: { en: "See existing issues", fr: "Voir les tickets existants" },
        href: ISSUES,
      },
    ],
  },
  {
    id: "code",
    title: { en: "Contribute code", fr: "Contribuer au code" },
    lead: {
      en: "The site is TypeScript with no framework: one esbuild bundle serves every page, the charts are drawn on canvas, and all copy is written as { en, fr } pairs beside the module that uses it. npm run build writes docs/bundle.js and docs/styles.css, which is what Framagit Pages serves.",
      fr: "Le site est en TypeScript sans framework : un seul bundle esbuild sert toutes les pages, les graphiques sont dessinés sur canvas, et chaque texte existe en { en, fr } à côté du module qui l’utilise. npm run build écrit docs/bundle.js et docs/styles.css, que Framagit Pages sert tels quels.",
    },
    bullets: [
      {
        en: "A movement missing from the comparison, or a source group that needs adding to src/data/sources.",
        fr: "Un mouvement absent de la comparaison, ou un groupe de sources à ajouter dans src/data/sources.",
      },
      {
        en: "Chart correctness: a band drawn from one publisher, a gap interpolated that should have stayed empty.",
        fr: "L’exactitude des graphiques : une fourchette tracée depuis un seul éditeur, un vide interpolé qui aurait dû rester vide.",
      },
      {
        en: "Accessibility: focus order, canvas descriptions, contrast, the grayscale-to-colour cards under prefers-contrast.",
        fr: "L’accessibilité : ordre de tabulation, descriptions des canvas, contrastes, cartes en noir et blanc selon prefers-contrast.",
      },
      {
        en: "The French copy, which reads as a translation in places because it is one.",
        fr: "Les textes français, qui se lisent parfois comme une traduction parce qu’ils en sont une.",
      },
    ],
    note: {
      en: "Open an issue before a large merge request: settling the data question first usually halves the code.",
      fr: "Ouvrez un ticket avant une grosse merge request : régler la question des données d’abord divise généralement le code par deux.",
    },
    actions: [
      {
        label: { en: "Repository on Framagit", fr: "Dépôt sur Framagit" },
        href: REPO,
      },
    ],
  },
  {
    id: "medics",
    status: { en: "In preparation", fr: "En préparation" },
    title: {
      en: "Coming: how to record better data",
      fr: "À venir : mieux consigner les données",
    },
    lead: {
      en: "A guide for street medics, legal observers and anyone counting in the street, on turning what you see into a figure that survives being checked six months later.",
      fr: "Un guide pour les street medics, les observateurs juridiques et toute personne qui compte dans la rue, pour transformer ce que vous voyez en un chiffre qui résiste à une vérification six mois plus tard.",
    },
    bullets: [
      {
        en: "What to write down at the time: hour, place, who was counting, and the boundary of what was counted.",
        fr: "Ce qu’il faut noter sur le moment : heure, lieu, qui comptait, et la limite de ce qui était compté.",
      },
      {
        en: "A count and an estimate are different data. Record which one you have, and never round a count into an estimate.",
        fr: "Un décompte et une estimation sont deux données différentes. Notez laquelle vous avez, et n’arrondissez jamais un décompte en estimation.",
      },
      {
        en: "Always the denominator: injuries without a number of people present cannot be compared with anything.",
        fr: "Toujours le dénominateur : des blessés sans nombre de personnes présentes ne se comparent à rien.",
      },
      {
        en: "The chain from observation to publication, so a figure can be traced back to the person who saw it.",
        fr: "La chaîne de l’observation à la publication, pour qu’un chiffre remonte jusqu’à la personne qui l’a vu.",
      },
      {
        en: "Consent, anonymity and safety, which outrank the data every time.",
        fr: "Le consentement, l’anonymat et la sécurité, qui priment sur la donnée à chaque fois.",
      },
    ],
    note: {
      en: "What should the guide cover? Suggest it as an issue now — the outline is still open.",
      fr: "Que devrait couvrir ce guide ? Proposez-le dès maintenant en ticket : le plan est encore ouvert.",
    },
    actions: [
      {
        label: { en: "Suggest a topic", fr: "Proposer un sujet" },
        href: NEW_ISSUE,
      },
    ],
  },
  {
    id: "share",
    title: { en: "Or just share it", fr: "Ou simplement le partager" },
    lead: {
      en: "Challenging a false narrative is easier with a chart than with an argument. Link the page rather than a screenshot: the numbers stay current, and the source travels with them.",
      fr: "Contester un récit faux est plus facile avec un graphique qu’avec un argument. Partagez le lien de la page plutôt qu’une capture d’écran : les chiffres restent à jour, et la source voyage avec eux.",
    },
    bullets: [
      {
        en: "Quote the band, not one end of it. “Between 175,000 and 197,000” is the finding; either number alone is a half-truth.",
        fr: "Citez la fourchette, pas une de ses bornes. « Entre 175 000 et 197 000 » est le résultat ; un seul des deux chiffres est une demi-vérité.",
      },
      {
        en: "Say what the chart does not show — every page states its own gaps under the title.",
        fr: "Dites ce que le graphique ne montre pas : chaque page énonce ses lacunes sous son titre.",
      },
      {
        en: "Point people at the Sources box on that page, so the figure can be checked without trusting us.",
        fr: "Renvoiez vers la rubrique Sources de la page, pour que le chiffre soit vérifiable sans nous faire confiance.",
      },
    ],
  },
];

function block(b: Block): Node {
  const id = `contribute-${b.id}`;

  const bullets = b.bullets.length
    ? html`<ul class="contribute-list">
        ${b.bullets.map((item) => html`<li>${bi(item)}</li>`)}
      </ul>`
    : null;

  const actions = b.actions?.length
    ? html`<p class="contribute-actions">
        ${b.actions.map(
          (a) =>
            html`<a
              class="contribute-button"
              href="${a.href}"
              target="_blank"
              rel="noopener noreferrer"
              >${bi(a.label)}</a
            >`,
        )}
      </p>`
    : null;

  return html`<section
    class="contribute-section"
    id="${id}"
    aria-labelledby="${id}-title"
  >
    <header class="contribute-head">
      <h2 class="contribute-title" id="${id}-title">${bi(b.title)}</h2>
      ${
        b.status
          ? html`<span class="contribute-status">${bi(b.status)}</span>`
          : null
      }
    </header>
    <p class="contribute-lead">${bi(b.lead)}</p>
    ${bullets} ${b.note ? html`<p class="callout">${bi(b.note)}</p>` : null}
    ${actions}
  </section>`;
}

/** Idempotent: replaces the host's children on every locale change. */
export function mountContribute(
  host: HTMLElement | null = byId("contribute"),
): void {
  if (!host) return;
  host.replaceChildren(...BLOCKS.map(block));
}
