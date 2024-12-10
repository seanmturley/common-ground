"use client";

import { useActionState } from "react";
import { addPlayerToQueue } from "@utils/matchmaking/add-player-to-queue";

const initialJoinQueueState: JoinQueueState = {
  format: "historic_pauper",
  match_type: "Bo1",
  message: ""
};

export default function JoinQueue() {
  const [joinQueueState, joinQueueAction] = useActionState(
    addPlayerToQueue,
    initialJoinQueueState
  );

  return (
    <form action={joinQueueAction}>
      <h1>Play</h1>

      {/* <fieldset>
        <legend>Best of:</legend>

        <div>
          <label htmlFor="Bo1">1</label>
          <input
            defaultChecked={joinQueueState.match_type === "Bo1"}
            id="Bo1"
            name="match_type"
            type="radio"
            value="Bo1"
          />
        </div>

        <div>
          <label htmlFor="Bo3">3</label>
          <input
            defaultChecked={joinQueueState.match_type === "Bo3"}
            id="Bo3"
            name="match_type"
            type="radio"
            value="Bo3"
            disabled
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Format:</legend>

        <div>
          <label htmlFor="historic_pauper">Historic Pauper</label>
          <input
            defaultChecked={joinQueueState.format === "historic_pauper"}
            id="historic_pauper"
            name="format"
            type="radio"
            value="historic_pauper"
          />
        </div>

        <div>
          <label htmlFor="historic_artisan">Historic Artisan</label>
          <input
            defaultChecked={joinQueueState.format === "historic_artisan"}
            id="historic_artisan"
            name="format"
            type="radio"
            value="historic_artisan"
            disabled
          />
        </div>
      </fieldset> */}

      <button type="submit">Find match</button>

      <div aria-live="polite">
        {joinQueueState.message && <p>{joinQueueState.message}</p>}
      </div>
    </form>
  );
}
