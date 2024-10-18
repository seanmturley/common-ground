import AuthLink from "@components/auth-link";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "AuthLink",
  component: AuthLink
} satisfies Meta<typeof AuthLink>;

type Story = StoryObj<typeof AuthLink>;

export const AuthButtonLogIn: Story = {
  args: {
    linkPath: "/login"
  },
  name: '"Log in" link (in AuthButton)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/articles"
      }
    }
  }
};

export const AuthFormLogIn: Story = {
  args: {
    linkPath: "/login"
  },
  name: '"Log in" link (in AuthForm)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/create-account",
        query: {
          redirectPath: "/protected"
        }
      }
    }
  }
};

export const AuthFormCreateAccount: Story = {
  args: {
    linkPath: "/create-account"
  },
  name: '"Create account" link (in AuthForm)',
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/login",
        query: {
          redirectPath: "/protected"
        }
      }
    }
  }
};
