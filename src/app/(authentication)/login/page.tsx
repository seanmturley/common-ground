import AuthForm from "@components/auth-form";
import { logIn } from "@utils/auth/user-actions";

export default async function Login({
  searchParams
}: {
  searchParams: { message: string; redirectPath: string };
}) {
  const { redirectPath, message } = await searchParams;

  const loginForm = {
    name: "Log in",
    requestMtgaAccountId: false,
    formAction: logIn,
    pendingText: "Logging in...",
    authLinkQuestion: "New here?",
    authLinkPath: "/create-account",
    redirectPath,
    message
  } as AuthForm;

  return <AuthForm {...loginForm} />;
}
