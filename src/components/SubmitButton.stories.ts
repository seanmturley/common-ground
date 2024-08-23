import type { Meta, StoryObj } from "@storybook/react";
import SubmitButton from "@/components/SubmitButton";

export default {
  title: "SubmitButton",
  component: SubmitButton
} satisfies Meta<typeof SubmitButton>;

type Story = StoryObj<typeof SubmitButton>;

export const LogIn: Story = {
  args: {
    children: "Log in",
    pendingText: "Logging in...",
    className: "log-in"
  }
};
