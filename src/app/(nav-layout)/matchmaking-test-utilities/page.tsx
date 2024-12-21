"use client";

import { useEffect, useState } from "react";
import {
  addTestUserToQueue,
  createTestUser,
  findIfExistingTestUser
} from "@utils/matchmaking/test-utilities";
import styles from "./matchmaking-test-utilities.module.css";

const initialTestUser = {
  email: "opponent@domain.com",
  password: "password",
  mtgaAccountId: "Opponent#12345",
  uid: ""
};

export default function MatchmakingTestUtilities() {
  const [testUser, setTestUser] = useState(initialTestUser);
  const [testUserExists, setTestUserExists] = useState<boolean | undefined>(
    undefined
  );

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
    <section className={styles.wrapper}>
      <form className={styles.form}>
        {testUserExists === undefined ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>Utility functions for testing matchmaking</h1>

            <button
              className={styles.button}
              onClick={handleCreateTestUser}
              type="submit"
              disabled={testUserExists}
            >
              {testUserExists ? "Test user already exists" : "Create test user"}
            </button>

            {testUserExists && (
              <button
                className={styles.button}
                onClick={handleAddTestUserToQueue}
                type="submit"
              >
                Add test user to queue
              </button>
            )}
          </>
        )}
      </form>
    </section>
  );
}
