import { cert, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

import serviceAccountKey from "../serviceAccountKey.json";

const serviceAccount = serviceAccountKey as ServiceAccount;

initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore();

export const auth = getAuth();
