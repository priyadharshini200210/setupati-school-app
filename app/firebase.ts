import admin from 'firebase-admin';
import logger from '../app/utils/logger.js';
import 'dotenv/config';

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
if (!serviceAccountBase64) {
  throw new Error(
    'FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set.'
  );
}

let serviceAccountJson: admin.ServiceAccount;
try {
  const decodedJson = Buffer.from(serviceAccountBase64, 'base64').toString(
    'utf8'
  );
  serviceAccountJson = JSON.parse(decodedJson);
  logger.info('Firebase service account JSON parsed successfully.');
} catch (error) {
  logger.error(
    'Failed to decode or parse FIREBASE_SERVICE_ACCOUNT_BASE64:',
    error.message
  );
  throw error;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson)
});

const db = admin.firestore();

export { db };
