type FormState = {
  email: string;
  message: string;
  mtgaAccountId: string;
  password: string;
};

type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState> | Promise<never>;

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
