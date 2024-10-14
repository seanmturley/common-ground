import AuthForm from "@components/auth-form";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "AuthForm",
  component: AuthForm
} satisfies Meta<typeof AuthForm>;

type Story = StoryObj<typeof AuthForm>;

export const LogIn: Story = {};
