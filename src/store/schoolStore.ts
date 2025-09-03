import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { SchoolStore, User } from '@/types/schoolStoreType';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import api from '@/lib/axiosConfig';
import { toast } from '@/hooks/use-toast';

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

        initCurrentUser: () => {
          try {
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                const response = await api.get(
                  `/api/v1/auth/users/${user.uid}`
                );
                const userData: User = response.data.user;
                set({
                  currentUser: userData
                });
              } else {
                set({
                  currentUser: null
                });
              }
            });
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : 'User not found!.';
            toast({
              title: 'Error',
              description: errorMessage,
              variant: 'destructive'
            });
          }
        },

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
            loading: false
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
