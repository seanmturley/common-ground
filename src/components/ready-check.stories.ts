import ReadyCheck from "@components/ready-check";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "ReadyCheck",
  component: ReadyCheck
} satisfies Meta<typeof ReadyCheck>;

type Story = StoryObj<typeof ReadyCheck>;

export const Default: Story = {};
