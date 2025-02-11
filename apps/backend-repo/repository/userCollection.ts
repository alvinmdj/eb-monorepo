import { User } from "@repo/shared/user";
import { auth, db } from "../config/firebaseConfig";

const collection = "USERS";

export async function fetchUser(userId: string): Promise<User | null> {
  const userAuth = await auth.getUser(userId);

  const userRef = db.collection(collection).doc(userId);
  const doc = await userRef.get();

  return doc.exists
    ? {
        id: doc.id,
        email: userAuth.email || "",
        ...doc.data(),
      }
    : null;
}

export async function updateUser(
  userId: string,
  payload: {
    name: string;
    hobby: string;
  }
) {
  const userRef = db.collection(collection).doc(userId);
  await userRef.set(payload);

  return fetchUser(userId);
}
