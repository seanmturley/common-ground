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

type Format = "historic_pauper" | "historic_artisan";

type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState> | Promise<never>;

type JoinQueueState = {
  format: Format;
  match_type: MatchType;
  message: string;
};

type MatchData = {
  format: Format;
  match_type: MatchType;
};

type MatchType = "Bo1" | "Bo3";
