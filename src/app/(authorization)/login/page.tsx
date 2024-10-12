import AuthForm from "@components/AuthForm";
import { logIn } from "@utils/auth/userActions";

export default function Login({
  searchParams
}: {
  searchParams: { message: string; redirectPath: string };
}) {
  const form = {
    name: "Log in",
    formAction: logIn,
    pedingText: "Logging in...",
    authLinkQuestion: "New here?",
    authLinkPath: "/create-account",
    redirectPath: searchParams?.redirectPath,
    message: searchParams?.message
  };

  return <AuthForm {...form} />;
}
