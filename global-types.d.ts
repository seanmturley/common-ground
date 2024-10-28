type FormAction = (
  prevState: string,
  formData: FormData
) => Promise<string> | Promise<never>;

type AuthForm = {
  name: string;
  requestMtgaAccountId: boolean;
  formAction: FormAction;
  pendingText: string;
  authLinkQuestion: string;
  authLinkPath: "/login" | "/create-account";
  redirectPath: string;
  message: string;
};
