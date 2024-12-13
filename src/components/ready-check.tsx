"use client";

import { useActionState } from "react";
import { acceptMatch } from "@utils/matchmaking/accept-match";
import { removePlayerFromQueue } from "@utils/matchmaking/remove-player-from-queue";

const initialAcceptState = {
  message: ""
};

const initialDeclineState = {
  message: ""
};

export default function ReadyCheck() {
  const [acceptState, acceptAction, acceptIsPending] = useActionState(
    acceptMatch,
    initialAcceptState
  );
  const [declineState, declineAction, declineIsPending] = useActionState(
    removePlayerFromQueue,
    initialDeclineState
  );

  return (
    <form>
      <h1>Match found</h1>
      <button formAction={acceptAction} type="submit">
        Accept
      </button>
      <button formAction={declineAction} type="submit">
        Decline
      </button>
      <div aria-live="polite">
        {acceptState.message && <p>{acceptState.message}</p>}
      </div>
      <div aria-live="polite">
        {declineState.message && <p>{acceptState.message}</p>}
      </div>
    </form>
  );
}
