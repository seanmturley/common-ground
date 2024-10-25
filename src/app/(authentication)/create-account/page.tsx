import AuthForm from "@components/auth-form";
import { createAccount } from "@utils/auth/user-actions";

export default async function CreateAccount({
  searchParams
}: {
  searchParams: { message: string; redirectPath: string };
}) {
  const { redirectPath, message } = await searchParams;

  const createAccountForm = {
    name: "Create account",
    formAction: createAccount,
    requestMtgaAccountId: true,
    pendingText: "Creating account...",
    authLinkQuestion: "Already have an account?",
    authLinkPath: "/login",
    redirectPath,
    message
  } as AuthForm;

  return <AuthForm {...createAccountForm} />;
}
