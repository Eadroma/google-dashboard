/**
 * All UI translations for English and French.
 * Add new keys to BOTH objects — the compiler will catch any missing keys
 * because `fr` is typed against `typeof en`.
 */
const en = {
  // TopBar
  edit: 'Edit',
  done: 'Done',
  addWidget: 'Add widget',
  toggleTheme: 'Toggle theme',

  // Sidebar
  sidebarTitle: 'Add Widget',
  noWidgets: 'No widgets registered.',
  widgetsCount: '{{count}} widget(s) available',
  categoryCore: 'Core',
  categoryProductivity: 'Productivity',
  categoryGoogle: 'Google',
  categoryInfo: 'Info',

  // Widget frame / settings panel
  widgetSettingsTitle: 'Widget Settings',
  widgetSettingsLabel: 'Settings',
  removeWidget: 'Remove widget',
  lockWidget: 'Lock widget',
  unlockWidget: 'Unlock widget',

  // Clock settings
  clockShowSeconds: 'Show seconds',
  clockUse24h: '24-hour format',
  clockShowDate: 'Show date',

  // Date display
  dateWeek: 'Week {{n}}',
  dateDay: 'Day {{n}}',
  dateShowWeekNumber: 'Show week number',
  dateShowDayOfYear: 'Show day of year',

  // Search bar
  searchPlaceholder: 'Search with {{engine}}…',
  searchEngineLabel: 'SEARCH ENGINE',
  searchOpenNewTab: 'Open in new tab',

  // Quick links
  quicklinksShowLabels: 'Show labels',
  quicklinksLinks: 'Links',
  quicklinksLabelPlaceholder: 'Label',
  quicklinksUrlPlaceholder: 'URL (https://…)',
  quicklinksAddLink: 'Add link',

  // Todo
  todoAddPlaceholder: 'Add a task and press Enter…',
  todoEmpty: 'No tasks yet.',
  todoDoneCount: '{{done}}/{{total}} done',

  // Notes
  notesPlaceholder: 'Start typing…',

  // GitHub Activity widget
  githubUsername: 'GitHub username',
  githubShowCount: 'Events to show',
  githubLoading: 'Loading…',
  githubError: 'Failed to load events',
  githubEmpty: 'No recent activity',
  githubUsernamePlaceholder: 'Enter username…',
  githubNoUsername: 'Set a username in settings',

  // Settings modal
  settingsTitle: 'Settings',
  settingsLanguage: 'Language',
  settingsBackground: 'Background',
  settingsSolid: 'Solid',
  settingsGradient: 'Gradient',
  settingsImage: 'Image',
  settingsImageUrl: 'Image URL',
  settingsBrightness: 'Brightness',
  settingsImageUrlPlaceholder: 'Paste an image URL…',
} as const;

const fr: Record<keyof typeof en, string> = {
  edit: 'Modifier',
  done: 'Terminer',
  addWidget: 'Ajouter un widget',
  toggleTheme: 'Changer le thème',

  sidebarTitle: 'Ajouter un widget',
  noWidgets: 'Aucun widget enregistré.',
  widgetsCount: '{{count}} widget(s) disponible(s)',
  categoryCore: 'Essentiel',
  categoryProductivity: 'Productivité',
  categoryGoogle: 'Google',
  categoryInfo: 'Info',

  widgetSettingsTitle: 'Paramètres du widget',
  widgetSettingsLabel: 'Paramètres',
  removeWidget: 'Supprimer le widget',
  lockWidget: 'Verrouiller le widget',
  unlockWidget: 'Déverrouiller le widget',

  clockShowSeconds: 'Afficher les secondes',
  clockUse24h: 'Format 24 heures',
  clockShowDate: 'Afficher la date',

  dateWeek: 'Semaine {{n}}',
  dateDay: 'Jour {{n}}',
  dateShowWeekNumber: 'Afficher le numéro de semaine',
  dateShowDayOfYear: "Afficher le jour de l'année",

  searchPlaceholder: 'Rechercher avec {{engine}}…',
  searchEngineLabel: 'MOTEUR DE RECHERCHE',
  searchOpenNewTab: 'Ouvrir dans un nouvel onglet',

  quicklinksShowLabels: 'Afficher les libellés',
  quicklinksLinks: 'Liens',
  quicklinksLabelPlaceholder: 'Libellé',
  quicklinksUrlPlaceholder: 'URL (https://…)',
  quicklinksAddLink: 'Ajouter un lien',

  todoAddPlaceholder: 'Ajouter une tâche et appuyer sur Entrée…',
  todoEmpty: 'Aucune tâche.',
  todoDoneCount: '{{done}}/{{total}} terminé(s)',

  notesPlaceholder: 'Commencez à écrire…',

  githubUsername: "Nom d'utilisateur GitHub",
  githubShowCount: 'Événements à afficher',
  githubLoading: 'Chargement…',
  githubError: 'Impossible de charger les événements',
  githubEmpty: 'Aucune activité récente',
  githubUsernamePlaceholder: "Entrer un nom d'utilisateur…",
  githubNoUsername: 'Définir un nom d\'utilisateur dans les paramètres',

  settingsTitle: 'Paramètres',
  settingsLanguage: 'Langue',
  settingsBackground: 'Arrière-plan',
  settingsSolid: 'Uni',
  settingsGradient: 'Dégradé',
  settingsImage: 'Image',
  settingsImageUrl: "URL de l'image",
  settingsBrightness: 'Luminosité',
  settingsImageUrlPlaceholder: "Coller une URL d'image…",
};

export const translations = { en, fr } as const;

/** Supported locale identifiers. */
export type Locale = keyof typeof translations;

/** Every valid translation key. */
export type TranslationKey = keyof typeof en;

/** BCP 47 locale tag for Intl APIs. */
export const LOCALE_BCP47: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
};
