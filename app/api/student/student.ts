import { db } from '../../firebase.js';
import { Student } from '../../models/Student.js';

const studentCollection = db.collection('students');

export const addStudent = async (data: Student): Promise<string> => {
  console.log('data', data);
  const plainData = { ...data };
  const docRef = await studentCollection.add(plainData);
  return docRef.id;
};

export const getStudent = async (
  studentRollNo: string
): Promise<{ id: string; student: Student | null }> => {
  const studentDoc = await studentCollection
    .where('student_rollno', '==', studentRollNo)
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
  return snapshot.docs.map((doc) => ({
     id: doc.id,
    student: doc.data() as Student
  }));
};

export const getAllStudentDetails = async (): Promise<{ id: string; student: Student }[]> => {
  const snapshot = await studentCollection.get();
  if (snapshot.empty) {
    return [];
  }
  console.log('Fetched all students:', snapshot.docs);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    student: doc.data() as Student
  }));
}
