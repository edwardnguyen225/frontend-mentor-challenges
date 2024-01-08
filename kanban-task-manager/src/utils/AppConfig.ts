import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Kanban Task Management',
  locales: ['en'], // TODO: Add Vietnamese locale: 'vi'
  defaultLocale: 'en',
  localePrefix,
};
