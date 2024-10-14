import AuthForm from "@components/auth-form";
import { createAccount } from "@utils/auth/user-actions";

export default function CreateAccount({
  searchParams
}: {
  searchParams: { message: string; redirectPath: string };
}) {
  const createAccountForm = {
    name: "Create account",
    formAction: createAccount,
    pedingText: "Creating account...",
    authLinkQuestion: "Already have an account?",
    authLinkPath: "/login",
    redirectPath: searchParams?.redirectPath,
    message: searchParams?.message
  };

  return <AuthForm {...createAccountForm} />;
}
