import type { StorybookConfig } from "@storybook/nextjs";

export default {
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  features: {
    experimentalRSC: true
  },
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  stories: [
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(ts|tsx)"
  ]
} satisfies StorybookConfig;
