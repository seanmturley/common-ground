"use server";

import { addServerClient } from "@utils/supabase/server";

type TestUser = {
  email: string;
  password: string;
  mtgaAccountId: string;
  uid: string;
};

export const findIfExistingTestUser = async function (testUser: TestUser) {
  const supabase = await addServerClient();

  const { error, data } = await supabase.rpc("check_test_user_exists").single();

  if (error) {
    console.error("Error finding existing test user:", error);
    return false;
  }

  if (data) {
    console.log("Test user already exists.");
    return true;
  } else {
    console.error("Failed to find existing test user.");
    return false;
  }
};

export const createTestUser = async function (testUser: TestUser) {
  const supabase = await addServerClient();

  const { error, data } = await supabase.auth.signUp({
    email: testUser.email,
    password: testUser.password,
    options: {
      data: {
        mtga_account_id: testUser.mtgaAccountId
      }
    }
  });

  if (error) {
    console.error("Error creating test user:", error);
  }

  if (data.user) {
    console.log("Test user created successfully.");
    return data.user.id;
  } else {
    console.error("Failed to create test user.");
  }
};

export const addTestUserToQueue = async function () {
  const supabase = await addServerClient();

  const { error } = await supabase.rpc("add_test_user_to_queue");

  if (error) {
    console.error(`Error adding test user to queue: ${error.message}`);
  } else {
    console.log("Test user successfully added to queue.");
  }
};
