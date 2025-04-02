import React from 'react';
import '../styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
  a11y: {
    // 접근성 검사 옵션
    element: '#storybook-root',
    manual: false,
  },
};

// 웹 폰트 및 아이콘 라이브러리 로딩 문제를 위한 장식자
export const decorators = [
  (Story) => (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <Story />
    </div>
  ),
]; 