import AuthForm from "@components/auth-form";
import type { Meta, StoryObj } from "@storybook/react";
import { createAccount, logIn } from "@utils/auth/user-actions";

export default {
  title: "AuthForm",
  component: AuthForm,
  argTypes: {
    name: {
      description:
        "The name to display as the form's title and on the submit button."
    },
    formAction: {
      description: "The function to be executed when the form is submitted."
    },
    pendingText: {
      description: "The text to display while the form submission is pending."
    },
    authLinkQuestion: {
      description:
        "The question to display that directs the user to the other auth page if appropriate."
    },
    authLinkPath: {
      description:
        "The path to provide to `AuthLink`, which allows switching between the two different auth pages.",
      control: "radio",
      options: ["/login", "/create-account"],
      table: {
        type: {
          summary: "/login | /create-account"
        }
      }
    },
    redirectPath: {
      description:
        "The path to redirect to after the user logs in (executed by the `logIn` function. This is read from the `redirectPath` search parameter in the URL."
    },
    message: {
      description:
        "A message to display to the user following an unsuccessful login attempt, or following the creation of a new account. This is read from the `message` search parameter in the URL."
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          rowGap: "4rem",
          width: "40rem",
          padding: "4rem",
          border: "1px solid black",
          borderRadius: "0.5rem"
        }}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof AuthForm>;

type Story = StoryObj<typeof AuthForm>;

export const LogIn: Story = {
  name: '"Log in" form',
  args: {
    name: "Log in",
    requestMtgaAccountId: false,
    formAction: logIn,
    pendingText: "Logging in...",
    authLinkQuestion: "New here?",
    authLinkPath: "/create-account",
    redirectPath: "",
    message: ""
  }
};

export const FailedLogIn: Story = {
  name: '"Log in" form (failed login)',
  args: {
    ...LogIn.args,
    message: "Could not authenticate user"
  }
};

export const CreateAccount: Story = {
  name: '"Create account" form',
  args: {
    name: "Create account",
    requestMtgaAccountId: true,
    formAction: createAccount,
    pendingText: "Creating account...",
    authLinkQuestion: "Already have an account?",
    authLinkPath: "/login",
    redirectPath: "",
    message: ""
  }
};

export const CheckEmail: Story = {
  name: '"Create account" form (check email)',
  args: {
    ...CreateAccount.args,
    message: "Check your email to finish creating your account"
  }
};
