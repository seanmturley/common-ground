"use client";

import { useActionState } from "react";
import { startMatchmaking } from "@utils/matchmaking/start-matchmaking";

const initialFormState: MatchmakingFormState = {
  buttonText: "Find match",
  format: "historic_pauper",
  match_type: "Bo1",
  message: ""
};

export default function Play() {
  const [formState, formAction] = useActionState(
    startMatchmaking,
    initialFormState
  );

  return (
    <form action={formAction}>
      <h1>Play</h1>

      <fieldset>
        <legend>Best of:</legend>

        <div>
          <label htmlFor="Bo1">1</label>
          <input
            defaultChecked={formState.match_type === "Bo1"}
            id="Bo1"
            name="match_type"
            type="radio"
            value="Bo1"
          />
        </div>

        <div>
          <label htmlFor="Bo3">3</label>
          <input
            defaultChecked={formState.match_type === "Bo3"}
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
            defaultChecked={formState.format === "historic_pauper"}
            id="historic_pauper"
            name="format"
            type="radio"
            value="historic_pauper"
          />
        </div>

        <div>
          <label htmlFor="historic_artisan">Historic Artisan</label>
          <input
            defaultChecked={formState.format === "historic_artisan"}
            id="historic_artisan"
            name="format"
            type="radio"
            value="historic_artisan"
            disabled
          />
        </div>
      </fieldset>

      <button type="submit">{formState.buttonText}</button>

      <div aria-live="polite">
        {formState.message && <p>{formState.message}</p>}
      </div>
    </form>
  );
}
