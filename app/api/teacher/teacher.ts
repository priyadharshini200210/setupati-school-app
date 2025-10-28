import { db } from '../../firebase.js';
import { Teacher } from '../../models/Teacher.js';
import { AppError, HttpCode } from '../../error.js';

if (!db)
  throw new AppError(
    'Database or Auth connection not established',
    HttpCode.INTERNAL_SERVER_ERROR
  );

const teacherCollection = db.collection('teachers');

export const addTeacher = async (data: Teacher): Promise<string> => {
  const plainData = { ...data };
  const docRef = await teacherCollection.add(plainData);
  return docRef.id;
};

export const getTeacher = async (
  teacherId: string
): Promise<{ id: string; teacher: Teacher | null }> => {
  const teacherDoc = await teacherCollection.where('id', '==', teacherId).get();
  if (teacherDoc.empty) {
    return { id: '', teacher: null };
  }
  const doc = teacherDoc.docs[0];
  return { id: doc.id, teacher: doc.data() as Teacher };
};

export const deleteTeacher = async (teacherId: string): Promise<boolean> => {
  const teacherData = await getTeacher(teacherId);
  if (!teacherData) {
    return false;
  }
  const teacherRef = teacherCollection.doc(teacherData.id);
  await teacherRef.delete();
  return true;
};

export const searchTeacher = async (
  teacherId: string
): Promise<{ id: string; teacher: Teacher }[]> => {
  const snapshot = await teacherCollection.where('id', '==', teacherId).get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc: { id: string; data: () => unknown }) => ({
    id: doc.id,
    teacher: doc.data() as Teacher
  }));
};

export const getAllTeacherDetails = async (): Promise<
  { id: string; teacher: Teacher }[]
> => {
  const snapshot = await teacherCollection.get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc: { id: string; data: () => unknown }) => ({
    id: doc.id,
    teacher: doc.data() as Teacher
  }));
};

export const updateTeacher = async (
  teacherId: string,
  data: Partial<Teacher>
): Promise<boolean> => {
  console.log('In update teacher function');
  const teacherData = await getTeacher(teacherId);
  if (!teacherData?.id || !teacherData.teacher) {
    return false;
  }
  console.log('teacher data found:', teacherData);
  const teacherRef = teacherCollection.doc(teacherData.id);
  await teacherRef.update(data);
  console.log('teacher data updated successfully');
  return true;
};
