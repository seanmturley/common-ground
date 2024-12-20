"use client";

import { useEffect, useState } from "react";
import {
  addTestUserToQueue,
  createTestUser,
  findIfExistingTestUser
} from "@utils/matchmaking/test-utilities";

const initialTestUser = {
  email: "opponent@domain.com",
  password: "password",
  mtgaAccountId: "Opponent#12345",
  uid: ""
};

export default function MatchmakingTestUtilities() {
  const [testUser, setTestUser] = useState(initialTestUser);
  const [testUserExists, setTestUserExists] = useState(false);

  useEffect(() => {
    (async () => {
      const isExistingTestUser = await findIfExistingTestUser(testUser);
      setTestUserExists(isExistingTestUser);
    })();
  }, [testUser]);

  const handleCreateTestUser = async () => {
    const uid = await createTestUser(testUser);

    if (uid) {
      setTestUser((prevState) => {
        return { ...prevState, uid };
      });
    }
  };

  const handleAddTestUserToQueue = async () => {
    await addTestUserToQueue();
  };

  return (
    <section>
      <form>
        <h1>Utility functions for testing matchmaking</h1>

        <button
          onClick={handleCreateTestUser}
          type="submit"
          disabled={testUserExists}
        >
          {testUserExists ? "Test user already exists" : "Create test user"}
        </button>

        {testUserExists && (
          <button onClick={handleAddTestUserToQueue} type="submit">
            Add test user to queue
          </button>
        )}
      </form>
    </section>
  );
}
