type AuthForm = {
  name: string;
  requestMtgaAccountId: boolean;
  formAction: (formData: FormData) => Promise<never>;
  pendingText: string;
  authLinkQuestion: string;
  authLinkPath: "/login" | "/create-account";
  redirectPath: string;
  message: string;
};
