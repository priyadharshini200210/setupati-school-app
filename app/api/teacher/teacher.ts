import { db } from '../../firebase.js';
import { Teacher } from '../../models/Teacher.js';
import { AppError, HttpCode } from '../../error.js';
import logger from '../../utils/logger.js';

if (!db)
  throw new AppError(
    'Database or Auth connection not established',
    HttpCode.INTERNAL_SERVER_ERROR
  );

const teacherCollection = db.collection('teachers');

export const addTeacher = async (data: Teacher): Promise<string> => {
  const plainData = { ...data };
  const docRef = await teacherCollection.add(plainData);
  logger.info('Teacher added with ID:', docRef.id);
  return docRef.id;
};

export const getTeacher = async (
  teacherId: string
): Promise<{ id: string; teacher: Teacher | null }> => {
  const teacherDoc = await teacherCollection
    .where('teacher_id', '==', teacherId)
    .get();
  if (teacherDoc.empty) {
    logger.info('No teacher found with ID:', teacherId);
    return { id: '', teacher: null };
  }
  const doc = teacherDoc.docs[0];
  logger.info('Teacher found with ID:', teacherId);
  return { id: doc.id, teacher: doc.data() as Teacher };
};

export const deleteTeacher = async (teacherId: string): Promise<boolean> => {
  const teacherData = await getTeacher(teacherId);
  if (!teacherData) {
    logger.info('No teacher found to delete with ID:', teacherId);
    return false;
  }
  const teacherRef = teacherCollection.doc(teacherData.id);
  await teacherRef.delete();
  logger.info('Teacher deleted with ID:', teacherId);
  return true;
};

export const searchTeacher = async (
  teacherId: string
): Promise<{ id: string; teacher: Teacher }[]> => {
  const snapshot = await teacherCollection
    .where('teacher_id', '==', teacherId)
    .get();
  if (snapshot.empty) {
    logger.info('No teachers found with ID:', teacherId);
    return [];
  }
  logger.info('Teachers found with ID:', teacherId);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    teacher: doc.data() as Teacher
  }));
};

export const getAllTeacherDetails = async (): Promise<
  { id: string; teacher: Teacher }[]
> => {
  const snapshot = await teacherCollection.get();
  if (snapshot.empty) {
    logger.info('No teachers found in the database');
    return [];
  }
  logger.info('Fetched all teachers from the database');
  return snapshot.docs.map((doc: { id: string; data: () => unknown }) => ({
    id: doc.id,
    teacher: doc.data() as Teacher
  }));
};

export const updateTeacher = async (
  teacherId: string,
  data: Partial<Teacher>
): Promise<boolean> => {
  logger.info('Updating teacher with ID:', teacherId);
  const teacherData = await getTeacher(teacherId);
  if (!teacherData?.id || !teacherData.teacher) {
    return false;
  }
  logger.info('Teacher data found:', teacherData);
  const teacherRef = teacherCollection.doc(teacherData.id);
  await teacherRef.update(data);
  logger.info('Teacher data updated successfully');
  return true;
};
