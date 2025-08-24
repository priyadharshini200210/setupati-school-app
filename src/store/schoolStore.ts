import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: string;
  subject_ids: string[];
  section_ids: string[];
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  designation: string;
  qualification: string;
  doj: string;
  experienced_years: number;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  section_id: string;
  subject_ids: string[];
  roll_no: string;
  dob: string;
  f_name: string;
  l_name: string;
  gender: string;
  blood_group: string;
  aadhar_no: string;
  phone_num1: string;
  phone_num2?: string;
  address_line1: string;
  address_line2?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  subject_name: string;
  grade_id: string;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  section_name: string;
  grade_id: string;
  class_teacher_id: string;
  group_name: string;
  created_at: string;
  updated_at: string;
}

export interface Grade {
  id: string;
  grade_name: string;
  section_ids: string[];
  ahm_staff_id: string;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  student_id: string;
  section_id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  created_at: string;
  updated_at: string;
}

export interface Circular {
  id: string;
  title: string;
  description: string;
  issued_by: string;
  targeted_group: string;
  issued_date: string;
  valid_until: string;
  created_at: string;
  updated_at: string;
}

export interface Homework {
  id: string;
  section_id: string;
  subject_id: string;
  teacher_id: string;
  title: string;
  description: string;
  due_date: string;
  created_date: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

// Store interface
interface SchoolStore {
  // Current user
  currentUser: User | null;

  // Data
  teachers: Teacher[];
  students: Student[];
  subjects: Subject[];
  sections: Section[];
  grades: Grade[];
  attendance: Attendance[];
  circulars: Circular[];
  homework: Homework[];

  // UI State
  activeView: string;
  sidebarCollapsed: boolean;
  loading: boolean;

  // Actions
  setCurrentUser: (user: User | null) => void;
  setActiveView: (view: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setLoading: (loading: boolean) => void;

  // Data actions
  setTeachers: (teachers: Teacher[]) => void;
  setStudents: (students: Student[]) => void;
  setSubjects: (subjects: Subject[]) => void;
  setSections: (sections: Section[]) => void;
  setGrades: (grades: Grade[]) => void;
  setAttendance: (attendance: Attendance[]) => void;
  setCirculars: (circulars: Circular[]) => void;
  setHomework: (homework: Homework[]) => void;

  // Statistics
  getStudentCount: () => number;
  getTeacherCount: () => number;
  getPresentStudentsToday: () => number;
  getRecentCirculars: () => Circular[];
}

// Create the store
export const useSchoolStore = create<SchoolStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentUser: null,
        teachers: [],
        students: [],
        subjects: [],
        sections: [],
        grades: [],
        attendance: [],
        circulars: [],
        homework: [],
        activeView: 'dashboard',
        sidebarCollapsed: false,
        loading: false,

        // Actions
        setCurrentUser: (user) => set({ currentUser: user }),
        setActiveView: (view) => set({ activeView: view }),
        setSidebarCollapsed: (collapsed) =>
          set({ sidebarCollapsed: collapsed }),
        setLoading: (loading) => set({ loading }),

        // Data actions
        setTeachers: (teachers) => set({ teachers }),
        setStudents: (students) => set({ students }),
        setSubjects: (subjects) => set({ subjects }),
        setSections: (sections) => set({ sections }),
        setGrades: (grades) => set({ grades }),
        setAttendance: (attendance) => set({ attendance }),
        setCirculars: (circulars) => set({ circulars }),
        setHomework: (homework) => set({ homework }),

        resetStore: () =>
          set({
            currentUser: null,
            teachers: [],
            students: [],
            subjects: [],
            sections: [],
            grades: [],
            attendance: [],
            circulars: [],
            homework: [],
            activeView: 'dashboard',
            sidebarCollapsed: false,
            loading: false,
          }),

        // Computed values
        getStudentCount: () => get().students.length,
        getTeacherCount: () => get().teachers.length,
        getPresentStudentsToday: () => {
          const today = new Date().toISOString().split('T')[0];
          return get().attendance.filter(
            (a) => a.date === today && a.status === 'present'
          ).length;
        },
        getRecentCirculars: () => {
          return get()
            .circulars.sort(
              (a, b) =>
                new Date(b.issued_date).getTime() -
                new Date(a.issued_date).getTime()
            )
            .slice(0, 5);
        }
      }),
      {
        name: 'school-store'
      }
    )
  )
);

// Initialize with sample data
export const initializeSampleData = () => {
  const store = useSchoolStore.getState();

  // Sample data
  store.setStudents([
    {
      id: 'student_001',
      section_id: 'section_A',
      subject_ids: ['math_001', 'english_001'],
      roll_no: '001',
      dob: '2010-03-20',
      f_name: 'Jane',
      l_name: 'Smith',
      gender: 'Female',
      blood_group: 'O+',
      aadhar_no: '1234-5678-9012',
      phone_num1: '+91-9876543210',
      address_line1: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400001',
      created_at: '2025-07-19T13:26:00Z',
      updated_at: '2025-07-19T13:26:00Z'
    },
    {
      id: 'student_002',
      section_id: 'section_A',
      subject_ids: ['math_001', 'science_001'],
      roll_no: '002',
      dob: '2010-05-15',
      f_name: 'Alex',
      l_name: 'Johnson',
      gender: 'Male',
      blood_group: 'A+',
      aadhar_no: '1234-5678-9013',
      phone_num1: '+91-9876543211',
      address_line1: '456 Oak Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      pincode: '400002',
      created_at: '2025-07-19T13:26:00Z',
      updated_at: '2025-07-19T13:26:00Z'
    }
  ]);

  store.setTeachers([
    {
      id: 'teacher_001',
      subject_ids: ['math_001', 'physics_001'],
      section_ids: ['section_A'],
      first_name: 'John',
      last_name: 'Doe',
      dob: '1985-06-15',
      gender: 'Male',
      designation: 'Senior Teacher',
      qualification: 'M.Sc Physics',
      doj: '2020-07-01',
      experienced_years: 8,
      created_at: '2025-07-19T13:26:00Z',
      updated_at: '2025-07-19T13:26:00Z'
    }
  ]);

  store.setCirculars([
    {
      id: 'circular_001',
      title: 'Sports Day Announcement',
      description: 'Annual sports day will be held on August 15th, 2025',
      issued_by: 'Principal',
      targeted_group: 'all',
      issued_date: '2025-07-19',
      valid_until: '2025-07-30',
      created_at: '2025-07-19T13:26:00Z',
      updated_at: '2025-07-19T13:26:00Z'
    }
  ]);

  store.setAttendance([
    {
      id: 'attendance_001',
      student_id: 'student_001',
      section_id: 'section_A',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      created_at: '2025-07-19T13:26:00Z',
      updated_at: '2025-07-19T13:26:00Z'
    },
    {
      id: 'attendance_002',
      student_id: 'student_002',
      section_id: 'section_A',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      created_at: '2025-07-19T13:26:00Z',
      updated_at: '2025-07-19T13:26:00Z'
    }
  ]);
};
