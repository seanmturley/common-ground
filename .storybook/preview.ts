import type { Preview } from "@storybook/react";

import "../src/app/globals.css";

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: "centered",
    nextjs: {
      appDirectory: true
    }
  },

  tags: ["autodocs"]
} satisfies Preview;
