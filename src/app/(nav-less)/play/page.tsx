"use client";

import InQueue from "@components/in-queue";
import JoinQueue from "@components/join-queue";
import ReadyCheck from "@components/ready-check";
import usePlayerStatusSubscription from "@utils/matchmaking/use-player-status-subscription";

export default function Play(): React.JSX.Element {
  // NOTE: Defining the return type for the component forces the
  // the switch statement to be exhaustive. A TS error is raised
  // if a case is not present for each option on the PlayerStatus
  // union type, as a React element will not be returned. For this
  // reason it is essential no default case exists for the switch.

  const playerStatus = usePlayerStatusSubscription();

  switch (playerStatus) {
    case null:
      return <h1>Loading...</h1>;

    case "idle":
      return <JoinQueue />;

    case "in_queue":
      return <InQueue />;

    case "ready_check":
      return <ReadyCheck />;

    case "in_match":
      return (
        <div>
          <h1>Display:</h1>
          <ul>
            <li>Direct challenge info</li>
            <li>Match result reporting options?</li>
          </ul>
        </div>
      );
  }
}
