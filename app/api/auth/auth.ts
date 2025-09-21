import { db, auth } from '../../firebase.js';
import { User } from '../../models/User.js';

const userCollection = db.collection('users');

export const addUser = async (data: User): Promise<string> => {
  const { name, email, password, role } = data;

  if (!name || !email || !password || !role) {
    throw new Error('Missing required user fields');
  }

  const userRecord = await auth.createUser({
    email: email,
    password: password,
    displayName: name
  });

  await auth.setCustomUserClaims(userRecord.uid, { role });

  const userDoc = {
    email: data.email,
    name: data.name,
    is_active: true,
    role: data.role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  await userCollection.doc(userRecord.uid).set(userDoc);
  return userRecord.uid;
};

export const getUserById = async (uid: string): Promise<User> => {
  if (!uid) {
    throw new Error('User ID is required');
  }
  const userRecord = await auth.getUser(uid);
  if (!userRecord) {
    throw new Error('User not found');
  }
  const userDoc = await userCollection.doc(uid).get();
  if (!userDoc.exists) {
    throw new Error('User data not found in database');
  }

  return { id: userRecord.uid, ...userDoc.data() } as User;
};

export const validateEmail = async (email: string): Promise<boolean> => {
  const userRecord = await auth.getUserByEmail(email);
  if (!userRecord) {
    throw new Error('User not found');
  }
  return true;
};

export const deleteUser = async (uid: string): Promise<void> => {
  await auth.deleteUser(uid);
  await userCollection.doc(uid).delete();
};
