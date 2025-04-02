module.exports = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "webpackFinal": async (config) => {
    // 필요한 경우 여기에 웹팩 설정 추가
    return config;
  },
  "env": (config) => ({
    ...config,
    // 필요한 경우 환경 변수 추가
  }),
  "docs": {
    "autodocs": true
  }
}; 