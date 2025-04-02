import type { Preview } from '@storybook/react'
import '../styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#111827', // gray-900
        },
        {
          name: 'light',
          value: '#f9fafb', // gray-50
        },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
};

export default preview;