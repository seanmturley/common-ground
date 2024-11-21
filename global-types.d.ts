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

type AuthFormState = {
  checkInbox: boolean;
  email: string;
  message: string;
  mtgaAccountId: string;
  password: string;
};

type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState> | Promise<never>;

type MatchmakingFormState = {
  buttonText: string;
  format: "historic_pauper" | "historic_artisan";
  match_type: "Bo1" | "Bo3";
  message: string;
};
