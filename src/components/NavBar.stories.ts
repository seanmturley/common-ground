import NavBar from "@components/NavBar";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "NavBar",
  component: NavBar
} satisfies Meta<typeof NavBar>;

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {};
