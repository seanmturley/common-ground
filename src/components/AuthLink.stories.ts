import AuthLink from "@components/AuthLink";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "AuthLink",
  component: AuthLink
} satisfies Meta<typeof AuthLink>;

type Story = StoryObj<typeof AuthLink>;

export const Default: Story = {};
