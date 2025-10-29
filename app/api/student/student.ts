import { db } from '../../firebase.js';
import { Student } from '../../models/Student.js';
import { AppError, HttpCode } from '../../error.js';
import logger from './../../utils/logger.js';
import { DocumentData } from 'firebase/firestore';

if (!db)
  throw new AppError(
    'Database or Auth connection not established',
    HttpCode.INTERNAL_SERVER_ERROR
  );

const studentCollection = db.collection('students');

export const mapStudentDocs = (
  docs: DocumentData[]
): { id: string; student: Student }[] => {
  return docs.map((doc) => ({
     id: doc.id,
    student: doc.data() as Student
  }));
};

export const addStudent = async (data: Student): Promise<string> => {
  const docRef = await studentCollection.add(data);
  logger.info(`Student added with ID: ${docRef.id}`);
  return docRef.id;
};

export const getStudent = async (
  studentRollNo: string
): Promise<{ id: string; student: Student | null }[]> => {
  const studentDoc = await studentCollection
    .where('roll_no', '==', studentRollNo)
    .get();
  if (studentDoc.empty) {
    return [{ id: '', student: null }];
  }
  return mapStudentDocs(studentDoc.docs);
};

export const deleteStudent = async (
  studentRollNo: string
): Promise<boolean> => {
  const studentData = await getStudent(studentRollNo);

  if (!studentData.length) {
    logger.info(`No students found with roll number: ${studentRollNo}`);
    return false;
  }

  const deletePromises = studentData.map(({ id }) => {
    logger.info(`Deleting student with ID: ${id}`);
    return studentCollection.doc(id).delete();
  });

  await Promise.all(deletePromises);
  logger.info(`Deleted ${studentData.length} student(s) with roll number: ${studentRollNo}`);
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
  logger.info(`Student data found:  ${JSON.stringify(snapshot.docs.map((doc) => doc.data()))}`);
  return mapStudentDocs(snapshot.docs);
};

export const getAllStudentDetails = async (): Promise<{ id: string; student: Student }[]> => {
  const snapshot = await studentCollection.get();
  if (snapshot.empty) {
    return [];
  }
  logger.info(`All student data found: ${JSON.stringify(snapshot.docs.map((doc) => doc.data()))}`);
  return mapStudentDocs(snapshot.docs);
};

export const updateStudent = async (
  studentRollNo: string,
  data: Partial<Student>
): Promise<boolean> => {
  const studentData = await getStudent(studentRollNo);

  if (!studentData.length) {
    logger.info(`No students found with roll number: ${studentRollNo}`);
    return false;
  }

  const updatePromises = studentData.map(({ id }) => {
    const studentRef = studentCollection.doc(id);
    return studentRef.update(data);
  });

  await Promise.all(updatePromises);
  logger.info(`Updated ${studentData.length} student(s) with roll number: ${studentRollNo}`);
  return true;
};

