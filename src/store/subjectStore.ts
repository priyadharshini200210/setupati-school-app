import { create } from 'zustand';

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  description: string;
  color: string;
}

export interface Grade {
  id: string;
  name: string;
  level: number;
  subjects: Subject[];
}

interface SchoolStore {
  grades: Grade[];
  selectedGrade: Grade | null;
  setSelectedGrade: (grade: Grade | null) => void;
  addSubject: (gradeId: string, subject: Omit<Subject, 'id'>) => void;
  updateSubject: (gradeId: string, subjectId: string, subject: Partial<Subject>) => void;
  deleteSubject: (gradeId: string, subjectId: string) => void;
}

export const useSchoolStore = create<SchoolStore>((set, get) => ({
  grades: [],
  selectedGrade: null,
  setSelectedGrade: (grade) => set({ selectedGrade: grade }),
  
  addSubject: (gradeId, subjectData) => {
    const newSubject: Subject = {
      ...subjectData,
      id: `s${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    
    set((state) => ({
      grades: state.grades.map((grade) =>
        grade.id === gradeId
          ? { ...grade, subjects: [...grade.subjects, newSubject] }
          : grade
      ),
      selectedGrade: state.selectedGrade?.id === gradeId
        ? { ...state.selectedGrade, subjects: [...state.selectedGrade.subjects, newSubject] }
        : state.selectedGrade,
    }));
  },
  
  updateSubject: (gradeId, subjectId, subjectData) => {
    set((state) => ({
      grades: state.grades.map((grade) =>
        grade.id === gradeId
          ? {
              ...grade,
              subjects: grade.subjects.map((subject) =>
                subject.id === subjectId ? { ...subject, ...subjectData } : subject
              ),
            }
          : grade
      ),
      selectedGrade: state.selectedGrade?.id === gradeId
        ? {
            ...state.selectedGrade,
            subjects: state.selectedGrade.subjects.map((subject) =>
              subject.id === subjectId ? { ...subject, ...subjectData } : subject
            ),
          }
        : state.selectedGrade,
    }));
  },
  
  deleteSubject: (gradeId, subjectId) => {
    set((state) => ({
      grades: state.grades.map((grade) =>
        grade.id === gradeId
          ? { ...grade, subjects: grade.subjects.filter((s) => s.id !== subjectId) }
          : grade
      ),
      selectedGrade: state.selectedGrade?.id === gradeId
        ? {
            ...state.selectedGrade,
            subjects: state.selectedGrade.subjects.filter((s) => s.id !== subjectId),
          }
        : state.selectedGrade,
    }));
  },
}));

// Initialize sample data
export const initializeSampleData = () => {
  const sampleGrades: Grade[] = [
    {
      id: '1',
      name: 'Grade 1',
      level: 1,
      subjects: [
        {
          id: 's1-1',
          name: 'Mathematics',
          code: 'MATH101',
          teacher: 'Ms. Johnson',
          description: 'Basic arithmetic and number recognition',
          color: 'from-blue-400 to-blue-600',
        },
        {
          id: 's1-2',
          name: 'English',
          code: 'ENG101',
          teacher: 'Mr. Smith',
          description: 'Reading, writing, and vocabulary building',
          color: 'from-purple-400 to-purple-600',
        },
        {
          id: 's1-3',
          name: 'Science',
          code: 'SCI101',
          teacher: 'Dr. Brown',
          description: 'Introduction to natural science',
          color: 'from-green-400 to-green-600',
        },
      ],
    },
    {
      id: '2',
      name: 'Grade 2',
      level: 2,
      subjects: [
        {
          id: 's2-1',
          name: 'Mathematics',
          code: 'MATH201',
          teacher: 'Ms. Johnson',
          description: 'Addition, subtraction, and basic geometry',
          color: 'from-blue-400 to-blue-600',
        },
        {
          id: 's2-2',
          name: 'English',
          code: 'ENG201',
          teacher: 'Mr. Smith',
          description: 'Grammar and creative writing',
          color: 'from-purple-400 to-purple-600',
        },
        {
          id: 's2-3',
          name: 'Social Studies',
          code: 'SOC201',
          teacher: 'Mrs. Davis',
          description: 'Community and basic geography',
          color: 'from-orange-400 to-orange-600',
        },
      ],
    },
    {
      id: '3',
      name: 'Grade 3',
      level: 3,
      subjects: [
        {
          id: 's3-1',
          name: 'Mathematics',
          code: 'MATH301',
          teacher: 'Ms. Wilson',
          description: 'Multiplication, division, and fractions',
          color: 'from-blue-400 to-blue-600',
        },
        {
          id: 's3-2',
          name: 'English',
          code: 'ENG301',
          teacher: 'Mr. Anderson',
          description: 'Reading comprehension and essay writing',
          color: 'from-purple-400 to-purple-600',
        },
        {
          id: 's3-3',
          name: 'Science',
          code: 'SCI301',
          teacher: 'Dr. Brown',
          description: 'Life science and basic physics',
          color: 'from-green-400 to-green-600',
        },
        {
          id: 's3-4',
          name: 'Art',
          code: 'ART301',
          teacher: 'Ms. Taylor',
          description: 'Drawing, painting, and creative expression',
          color: 'from-pink-400 to-pink-600',
        },
      ],
    },
    {
      id: '4',
      name: 'Grade 4',
      level: 4,
      subjects: [
        {
          id: 's4-1',
          name: 'Mathematics',
          code: 'MATH401',
          teacher: 'Ms. Wilson',
          description: 'Advanced arithmetic and problem solving',
          color: 'from-blue-400 to-blue-600',
        },
        {
          id: 's4-2',
          name: 'English',
          code: 'ENG401',
          teacher: 'Mr. Anderson',
          description: 'Literature and advanced grammar',
          color: 'from-purple-400 to-purple-600',
        },
        {
          id: 's4-3',
          name: 'Science',
          code: 'SCI401',
          teacher: 'Dr. Martinez',
          description: 'Earth science and scientific method',
          color: 'from-green-400 to-green-600',
        },
        {
          id: 's4-4',
          name: 'Physical Education',
          code: 'PE401',
          teacher: 'Coach Roberts',
          description: 'Sports, fitness, and teamwork',
          color: 'from-red-400 to-red-600',
        },
      ],
    },
    {
      id: '5',
      name: 'Grade 5',
      level: 5,
      subjects: [
        {
          id: 's5-1',
          name: 'Mathematics',
          code: 'MATH501',
          teacher: 'Mr. Thompson',
          description: 'Decimals, percentages, and algebra basics',
          color: 'from-blue-400 to-blue-600',
        },
        {
          id: 's5-2',
          name: 'English',
          code: 'ENG501',
          teacher: 'Mrs. Clark',
          description: 'Advanced reading and composition',
          color: 'from-purple-400 to-purple-600',
        },
        {
          id: 's5-3',
          name: 'Science',
          code: 'SCI501',
          teacher: 'Dr. Martinez',
          description: 'Physical science and experiments',
          color: 'from-green-400 to-green-600',
        },
        {
          id: 's5-4',
          name: 'History',
          code: 'HIST501',
          teacher: 'Mr. Lewis',
          description: 'World history and civilizations',
          color: 'from-yellow-400 to-yellow-600',
        },
        {
          id: 's5-5',
          name: 'Music',
          code: 'MUS501',
          teacher: 'Ms. Garcia',
          description: 'Music theory and instruments',
          color: 'from-indigo-400 to-indigo-600',
        },
      ],
    },
  ];

  useSchoolStore.setState({ grades: sampleGrades });
};
