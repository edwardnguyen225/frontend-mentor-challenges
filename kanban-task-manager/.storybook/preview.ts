import '../src/styles/global.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  globalTypes: {
    darkMode: {
      defaultValue: true,
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fff',
        },
        {
          name: 'dark',
          value: '#2B2C37',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
