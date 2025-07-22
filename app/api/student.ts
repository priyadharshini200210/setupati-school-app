import { db } from "../firebase";
import { Student } from "../models/Student";

const studentCollection = db.collection('Student');

export const addStudent = async (data: Student) => {
  const docRef = await studentCollection.add(data);
  return docRef.id;
};

export const getStudent = async (studentRollNo: string) => {
  const studentDoc = await studentCollection.where('student_rollno', '==', studentRollNo).get();
  if (studentDoc.empty) {
    return null;
  }
  const doc = studentDoc.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const deleteStudent = async (studentRollNo: string) => {
  const studentData = await getStudent(studentRollNo);
  if (!studentData) {
    return false;
  }
  const studentRef = studentCollection.doc(studentData.id);
  await studentRef.delete();
  return true;
};

export const searchStudent = async (studentRollNo: string) => {
  const snapshot = await studentCollection.where('student_rollno', '==', studentRollNo).get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
