import { db } from '../../firebase.js';
import { Student } from '../../models/Student.js';
import { AppError, HttpCode } from '../../error.js';

if (!db)
  throw new AppError(
    'Database or Auth connection not established',
    HttpCode.INTERNAL_SERVER_ERROR
  );

const studentCollection = db.collection('students');

export const addStudent = async (data: Student): Promise<string> => {
  const plainData = { ...data };
  const docRef = await studentCollection.add(plainData);
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
  return snapshot.docs.map((doc: { id: string; data: () => unknown }) => ({
    id: doc.id,
    student: doc.data() as Student
  }));
};

export const updateStudent = async (
  studentRollNo: string,
  data: Partial<Student>
): Promise<boolean> => {
  console.log('In updateStudent function');
  const studentData = await getStudent(studentRollNo);
  if (!studentData?.id || !studentData.student) {
    return false;
  }
  console.log('Student data found:', studentData);
  const studentRef = studentCollection.doc(studentData.id);
  await studentRef.update(data);
  console.log('Student data updated successfully');
  return true;
};
