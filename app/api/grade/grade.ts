import { db } from '../../firebase.js';
import { Grade } from '../../models/grade.js';

const gradeCollection = db.collection('grades');

export const getAllGradeDetails = async (): Promise<{ id: string; grade: Grade }[]> => {
  const snapshot = await gradeCollection.get();
    if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => ({ id: doc.id, grade: doc.data() as Grade }));
};
    