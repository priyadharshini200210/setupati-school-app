import { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { initializeSampleData } from '@/store/schoolStore';
import { StudentDashboard } from '@/components/Students/StudentDashboard';
import { TeacherDashboard } from '@/components/Teachers/TeacherDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { RoleRoute } from '../Authentication/RoleRoute';
import { SubjectsPage } from '@/components/Subjects';
import { AttendancePage } from '@/components/Attendance';
import { TimetablePage } from '@/components/Timetable';
import { CircularPage } from '@/components/Circulars';
import { SettingsPage } from '@/components/Settings';

export const MainLayout = () => {

  useEffect(() => {
    // Initialize sample data on mount
    initializeSampleData();
  }, []);

  const renderContent = () => {
    const routes = {
      '/students': () => (
        <RoleRoute allowedRoles={['student', 'admin']}>
          <StudentDashboard />
        </RoleRoute>
      ),
      '/teachers': () => (
        <RoleRoute allowedRoles={['teacher', 'admin']}>
          <TeacherDashboard />
        </RoleRoute>
      ),
      '/dashboard': () => (
        <RoleRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleRoute>
      ),
      '/subjects': () => (
        <RoleRoute allowedRoles={['admin']}>
          <SubjectsPage />
        </RoleRoute>
      ),
      '/attendance': () => (
        <RoleRoute allowedRoles={['admin']}>
          <AttendancePage />
        </RoleRoute>
      ),
      '/timetable': () => (
        <RoleRoute allowedRoles={['admin']}>
          <TimetablePage />
        </RoleRoute>
      ),
      '/circulars': () => (
        <RoleRoute allowedRoles={['admin']}>
          <CircularPage />
        </RoleRoute>
      ),
      '/settings': () => (
        <RoleRoute allowedRoles={['admin']}>
          <SettingsPage />
        </RoleRoute>
      ),
    };

    const currentPath = window.location.pathname;
    return routes[currentPath] ? routes[currentPath]() : null;
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
