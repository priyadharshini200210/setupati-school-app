import { db } from '../../firebase.js';
import { Student } from '../../models/Student.js';
import { AppError, HttpCode } from '../../error.js';
import logger from './../../utils/logger.js';

if (!db)
  throw new AppError(
    'Database or Auth connection not established',
    HttpCode.INTERNAL_SERVER_ERROR
  );

const studentCollection = db.collection('students');

export const addStudent = async (data: Student): Promise<string> => {
  const plainData = { ...data };
  const docRef = await studentCollection.add(plainData);
  logger.info('Student added with ID:', docRef.id);
  return docRef.id;
};

export const getStudent = async (
  studentRollNo: string
): Promise<{ id: string; student: Student | null }> => {
  const studentDoc = await studentCollection
    .where('roll_no', '==', studentRollNo)
    .get();
  if (studentDoc.empty) {
    return { id: '', student: null };
  }
  const doc = studentDoc.docs[0];
  logger.info('Student data found:', doc.data());
  return { id: doc.id, student: doc.data() as Student };
};

export const deleteStudent = async (
  studentRollNo: string
): Promise<boolean> => {
  const studentData = await getStudent(studentRollNo);
  if (!studentData) {
    return false;
  }
  const studentRef = studentCollection.doc(studentData.id);
  await studentRef.delete();
  logger.info('Student deleted successfully:', studentRollNo);
  return true;
};

export const searchStudent = async (
  studentRollNo: string
): Promise<{ id: string; student: Student }[]> => {
  const snapshot = await studentCollection
    .where('roll_no', '==', studentRollNo)
    .get();
  if (snapshot.empty) {
    return [];
  }
  logger.info(
    'Student data found:',
    snapshot.docs.map((doc: { id: string; data: () => unknown }) => doc.data())
  );
  return snapshot.docs.map((doc: { id: string; data: () => unknown }) => ({
     id: doc.id,
    student: doc.data() as Student
  }));
};

export const getAllStudentDetails = async (): Promise<{ id: string; student: Student }[]> => {
  const snapshot = await studentCollection.get();
  if (snapshot.empty) {
    return [];
  }
  logger.info(
    'All student data:',
    snapshot.docs.map((doc: { id: string; data: () => unknown }) => doc.data())
  );
  return snapshot.docs.map((doc: { id: string; data: () => unknown }) => ({
    id: doc.id,
    student: doc.data() as Student
  }));
};

export const updateStudent = async (
  studentRollNo: string,
  data: Partial<Student>
): Promise<boolean> => {
  const studentData = await getStudent(studentRollNo);
  if (!studentData?.id || !studentData.student) {
    return false;
  }
  const studentRef = studentCollection.doc(studentData.id);
  await studentRef.update(data);
  logger.info('Student updated successfully:', studentRollNo);
  return true;
};
