import { db } from '../../firebase.js';
import { Grade } from '../../models/Grade.js';
import { AppError, HttpCode } from '../../error.js';
import logger from '../../utils/logger.js';

if (!db)
  throw new AppError(
    'Database or Auth connection not established',
    HttpCode.INTERNAL_SERVER_ERROR
  );

const gradeCollection = db.collection('grades');

// Add grade
export const addGrade = async (data: Grade): Promise<string> => {
  const plainData = { ...data };
  const docRef = await gradeCollection.add(plainData);
  logger.info('Grade added with ID:', docRef.id);
  return docRef.id;
};
// Get grade by grade name
export const getGrade = async (
  gradeName: string
): Promise<{ id: string; grade: Grade | null }> => {
  const gradeDoc = await gradeCollection
    .where('grade_name', '==', gradeName)
    .get();
  if (gradeDoc.empty) {
    return { id: '', grade: null };
  }
  const doc = gradeDoc.docs[0];
  logger.info('Grade data found:', doc.data());
  return { id: doc.id, grade: doc.data() as Grade };
};
// Delete grade by grade name
export const deleteGrade = async (gradeName: string): Promise<boolean> => {
  const gradeData = await getGrade(gradeName);
  if (!gradeData) {
    return false;
  }
  const gradeRef = gradeCollection.doc(gradeData.id);
  await gradeRef.delete();
  logger.info('Grade deleted successfully:', gradeName);
  return true;
};
// Search grade by grade name
export const searchGrade = async (
  gradeName: string
): Promise<{ id: string; grade: Grade }[]> => {
  const snapshot = await gradeCollection
    .where('grade_name', '==', gradeName)
    .get();
  if (snapshot.empty) {
    return [];
  }
  logger.info(
    'Grade data found:',
    snapshot.docs.map((doc) => doc.data())
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    grade: doc.data() as Grade
  }));
};
// Get all grade details
export const getAllGradeDetails = async (): Promise<
  { id: string; grade: Grade }[]
> => {
  const snapshot = await gradeCollection.get();
  if (snapshot.empty) {
    return [];
  }
  logger.info(
    'All grade data fetched:',
    snapshot.docs.map((doc) => doc.data())
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    grade: doc.data() as Grade
  }));
};
// Update grade by grade name
export const updateGrade = async (
  gradeName: string,
  data: Partial<Grade>
): Promise<boolean> => {
  const gradeData = await getGrade(gradeName);
  if (!gradeData?.id || !gradeData.grade) {
    return false;
  }
  const gradeRef = gradeCollection.doc(gradeData.id);
  await gradeRef.update(data);
  logger.info('Grade updated successfully:', gradeName, data);
  return true;
};
