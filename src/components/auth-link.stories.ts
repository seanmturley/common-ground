import AuthLink from "@components/auth-link";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "AuthLink",
  component: AuthLink,
  argTypes: {
    linkPath: {
      description: "Defines the path for the link.",
      control: "radio",
      options: ["/login", "/create-account"]
    }
  }
} satisfies Meta<typeof AuthLink>;

type Story = StoryObj<typeof AuthLink>;

export const AuthButtonLogIn: Story = {
  name: '"Log in" link (in AuthButton)',
  args: {
    linkPath: "/login"
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/articles"
      }
    }
  }
};

export const AuthFormLogIn: Story = {
  name: '"Log in" link (in AuthForm)',
  args: {
    linkPath: "/login"
  },
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
  name: '"Create account" link (in AuthForm)',
  args: {
    linkPath: "/create-account"
  },
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
