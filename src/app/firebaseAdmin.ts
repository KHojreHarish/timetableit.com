import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

interface FirebaseAdminConfig {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientC509CertUrl: string;
}

if (!getApps().length) {
  // Initialize the Firebase Admin SDK
  const config: FirebaseAdminConfig = {
    type: process.env.NEXT_FIREBASE_TYPE!,
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID!,
    privateKeyId: process.env.NEXT_FIREBASE_PRIVATE_KEY_ID!,
    privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"), // Replace \n to handle private key format
    clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL!,
    clientId: process.env.NEXT_FIREBASE_CLIENT_ID!,
    authUri: process.env.NEXT_FIREBASE_AUTH_URI!,
    tokenUri: process.env.NEXT_FIREBASE_TOKEN_URI!,
    authProviderX509CertUrl: process.env.NEXT_FIREBASE_AUTH_PROVIDER_CERT_URL!,
    clientC509CertUrl: process.env.NEXT_FIREBASE_CLIENT_CERT_URL!,
  };

  admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: `https://${config.projectId}.firebaseio.com`,
  });
}

export default admin;
export const db = admin.firestore();
