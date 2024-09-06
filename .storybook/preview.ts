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
    layout: "centered"
  }
} satisfies Preview;
