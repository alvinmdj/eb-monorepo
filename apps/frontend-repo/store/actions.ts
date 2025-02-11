import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchUser, updateUser } from "@/apis/userApi";
import type { User } from "@repo/shared/user";

export const fetchUserData = createAsyncThunk(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUser();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserData = createAsyncThunk(
  "user/update",
  async (payload: Omit<User, "id" | "email">, { rejectWithValue }) => {
    try {
      return await updateUser(payload);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
