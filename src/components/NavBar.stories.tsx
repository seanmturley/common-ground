import NavBar from "@components/NavBar";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "NavBar",
  component: NavBar,
  decorators: [
    (Story) => (
      <div
        style={{
          height: "var(--nav-bar-height)",
          width: "100vw",
          display: "flex"
        }}
      >
        <Story />
      </div>
    )
  ],
  parameters: { layout: "fullscreen" }
} satisfies Meta<typeof NavBar>;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {};
