import AuthButton from "@components/auth-button";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "AuthButton",
  component: AuthButton
} satisfies Meta<typeof AuthButton>;

type Story = StoryObj<typeof AuthButton>;

export const Default: Story = {};
