import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StudentDashboard } from '@/components/Students/StudentDashboard';
import { TeacherDashboard } from '@/components/Teachers/TeacherDashboard';
import { AdminDashboard, SignUpForm } from '@/components/admin';
import { RoleRoute } from '../Authentication';
import { useSchoolStore, useAuthStore } from '@/store';

export const MainLayout = () => {
  const { activeView } = useSchoolStore();
  const { role } = useAuthStore();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        switch (role) {
          case 'student':
            return (
              <RoleRoute allowedRoles={['student']}>
                <StudentDashboard />
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
        }
        break;
      case 'account-creation':
        return (
          <RoleRoute allowedRoles={['admin']}>
            <SignUpForm />
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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};
