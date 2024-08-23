import type { Meta, StoryObj } from "@storybook/react";
import AuthButton from "@/components/AuthButton";

export default {
  title: "AuthButton",
  component: AuthButton
} satisfies Meta<typeof AuthButton>;

type Story = StoryObj<typeof AuthButton>;

export const Default: Story = {};
