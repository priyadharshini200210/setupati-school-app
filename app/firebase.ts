import admin from 'firebase-admin';
import logger from './utils/logger.js';
import 'dotenv/config';

// Be tolerant for local/dev runs where Firebase service account may not be provided.
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

let db: admin.firestore.Firestore | null = null;
let auth: admin.auth.Auth | null = null;

if (!serviceAccountBase64) {
  logger.warn(
    'FIREBASE_SERVICE_ACCOUNT_BASE64 is not set. Firebase admin will not be initialized.'
  );
} else {
  try {
    const decodedJson = Buffer.from(serviceAccountBase64, 'base64').toString(
      'utf8'
    );
    const serviceAccountJson = JSON.parse(decodedJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountJson)
    });
    db = admin.firestore();
    auth = admin.auth();
    logger.info('Firebase admin initialized successfully.');
  } catch (error: unknown) {
    logger.error(
      'Failed to initialize Firebase admin from FIREBASE_SERVICE_ACCOUNT_BASE64:',
      (error as Error).message
    );
    // Keep server running — export nulls so routes can check and return 503 if needed.
    db = null;
    auth = null;
  }
}

export { db, auth };
