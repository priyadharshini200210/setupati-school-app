import { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Dashboard } from '../Dashboard/Dashboard';
import { Students } from '../Students/Students';
import { TeachersList } from '../Teachers/TeachersList';
import { useSchoolStore } from '@/store/schoolStore';
import { initializeSampleData } from '@/store/schoolStore';
import { useAuthStore } from '@/store/authStore';
import { StudentDashboard } from '@/components/students/StudentDashboard';
import { TeacherDashboard } from '@/components/teachers/TeacherDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { RoleRoute } from '../Authentication/RoleRoute';

export const MainLayout = () => {
  const { activeView } = useSchoolStore();
  const { role } = useAuthStore();
  const { grades, students, setGrades, setStudents } = useSchoolStore();

  useEffect(() => {
    // Initialize sample data on mount
    initializeSampleData();
  }, []);

    useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/grades/all');
        const data = await response.json();
        if (data) {
          const formattedGrades = data.map((grade: any) => ({
            id: grade.id,
            grade_name: grade.grade.grade_name,
            teacher_id: grade.grade.teacher_id,
            section_ids: grade.grade.section_ids || [],
            ahm_staff_id: grade.grade.ahm_staff_id || '',
            created_at: grade.grade.created_at || '',
            updated_at: grade.grade.updated_at || ''
          }));
          setGrades(formattedGrades);
        }
      } catch (error) {
        console.error('Failed to fetch grades:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students/all');
        const data = await response.json();
        if (data) {
          const formattedStudents = data.map((studentWrapper: any) => {
            const student = studentWrapper.student;
            return {
              id: studentWrapper.id,
              first_name: student.f_name,
              last_name: student.l_name,
              roll_no: student.roll_no,
              dob: student.dob,
              gender: student.gender,
              blood_group: student.blood_group,
              aadhar_no: student.aadhar_no,
              phone_num1: student.phone_num1,
              address_line1: student.address_line1,
              city: student.city,
              state: student.state,
              country: student.country,
              pincode: student.pincode,
              grade_name: student.grade_name,
              section_name: student.section_name,
              subject_ids: student.subject_ids || [],
              created_at: student.created_at || '',
              updated_at: student.updated_at || ''
            };
          });

          setStudents(formattedStudents);
        }
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    fetchGrades();
    fetchStudents();
  }, [setGrades, setStudents]);

  const renderContent = () => {
    switch (role) {
      case 'student':
        return (
          <RoleRoute allowedRoles={['student']}>
            <Students />
          </RoleRoute>
        );
      case 'teacher':
        return (
          <RoleRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </RoleRoute>
        );
      case 'admin':
        return (
          <RoleRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleRoute>
        );
      case 'subjects':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Subjects Management
            </h2>
            <p className="text-muted-foreground">
              Subjects module coming soon...
            </p>
          </div>
        );
      case 'attendance':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Attendance Tracking
            </h2>
            <p className="text-muted-foreground">
              Attendance module coming soon...
            </p>
          </div>
        );
      case 'timetable':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Timetable Management
            </h2>
            <p className="text-muted-foreground">
              Timetable module coming soon...
            </p>
          </div>
        );
      case 'circulars':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Circulars & Announcements
            </h2>
            <p className="text-muted-foreground">
              Circulars module coming soon...
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Settings
            </h2>
            <p className="text-muted-foreground">
              Settings module coming soon...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};
