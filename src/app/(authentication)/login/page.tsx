import AuthForm from "@components/auth-form";
import { logIn } from "@utils/auth/user-actions";

export default function Login({
  searchParams
}: {
  searchParams: { message: string; redirectPath: string };
}) {
  const loginForm = {
    name: "Log in",
    formAction: logIn,
    pedingText: "Logging in...",
    authLinkQuestion: "New here?",
    authLinkPath: "/create-account",
    redirectPath: searchParams?.redirectPath,
    message: searchParams?.message
  };

  return <AuthForm {...loginForm} />;
}
