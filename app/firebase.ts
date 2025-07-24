import admin from 'firebase-admin';
import logger from '../src/logger.js';

const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || '', 'base64').toString('utf8');
try {
  const json = JSON.parse(decoded);
  logger.info('JSON parsed successfully:', json);
} catch (err) {
  logger.error('Failed to parse JSON:', err.message);
}
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(decoded) as admin.ServiceAccount),
});

const db = admin.firestore();

export { db };
