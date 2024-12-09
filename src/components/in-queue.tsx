"use client";

import { removePlayerFromQueue } from "@utils/matchmaking/remove-player-from-queue";
import { useActionState } from "react";
import QueueTimer from "./queue-timer";

const initialCancelState = {
  already_matched: false,
  message: ""
};

export default function InQueue() {
  const [cancelState, cancelAction, isPending] = useActionState(
    removePlayerFromQueue,
    initialCancelState
  );
  return (
    <>
      <QueueTimer />
      <form action={cancelAction}>
        <button type="submit" disabled={cancelState.already_matched}>
          {isPending ? "Cancelling..." : "Cancel"}
        </button>
        <div aria-live="polite">
          {cancelState.message && <p>{cancelState.message}</p>}
        </div>
      </form>
    </>
  );
}
