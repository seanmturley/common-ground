import SubmitButton from "@components/submit-button";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "SubmitButton",
  component: SubmitButton
} satisfies Meta<typeof SubmitButton>;

type Story = StoryObj<typeof SubmitButton>;

export const LogIn: Story = {
  args: {
    children: "Log in",
    pendingText: "Logging in..."
  }
};

export const CreateAccount: Story = {
  args: {
    children: "Create account",
    pendingText: "Creating account..."
  }
};
