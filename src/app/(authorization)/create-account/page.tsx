import AuthForm from "@components/AuthForm";
import { createAccount } from "@utils/auth/userActions";

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
