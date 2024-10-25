import AuthForm from "@components/auth-form";
import { logIn } from "@utils/auth/user-actions";

export default function Login({
  searchParams
}: {
  searchParams: { message: string; redirectPath: string };
}) {
  const loginForm = {
    name: "Log in",
    requestMtgaAccountId: false,
    formAction: logIn,
    pendingText: "Logging in...",
    authLinkQuestion: "New here?",
    authLinkPath: "/create-account",
    redirectPath: searchParams?.redirectPath,
    message: searchParams?.message
  } as AuthForm;

  return <AuthForm {...loginForm} />;
}
