import type { User } from "@repo/shared/user";
import { auth } from "@/lib/firebase";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL;

export async function fetchUser(): Promise<{ data: { user: User } }> {
  const token = await auth.currentUser?.getIdToken();

  const response = await fetch(`${BASE_URL}/fetch-user-data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return responseHandler(response);
}

export async function updateUser(
  user: Omit<User, "id" | "email">
): Promise<{ data: { user: User } }> {
  const token = await auth.currentUser?.getIdToken();

  const response = await fetch(`${BASE_URL}/update-user-data`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(user),
  });

  return responseHandler(response);
}

function responseHandler(response: Response) {
  if (response.status === 401) {
    throw new Error("Unauthorized request. Please login.");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user data. Please try again later.");
  }

  return response.json();
}
