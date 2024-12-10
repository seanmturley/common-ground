"use client";

import { removePlayerFromQueue } from "@utils/matchmaking/remove-player-from-queue";
import { useActionState } from "react";

const initialCancelState = {
  message: ""
};

export default function InQueue() {
  const [cancelState, cancelAction, isPending] = useActionState(
    removePlayerFromQueue,
    initialCancelState
  );
  return (
    <>
      <div>
        <div>Searching...</div>
        <div>Timer</div>
      </div>
      <form action={cancelAction}>
        <button type="submit">{isPending ? "Cancelling..." : "Cancel"}</button>
        <div aria-live="polite">
          {cancelState.message && <p>{cancelState.message}</p>}
        </div>
      </form>
    </>
  );
}
