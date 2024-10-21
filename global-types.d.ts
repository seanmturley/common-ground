type AuthForm = {
  name: string;
  formAction: (formData: FormData) => Promise<never>;
  pendingText: string;
  authLinkQuestion: string;
  authLinkPath: "/login" | "/create-account";
  redirectPath: string;
  message: string;
};
