import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Dashboard } from "../Dashboard/Dashboard";
import { StudentsList } from "../Students/StudentsList";
import { TeachersList } from "../Teachers/TeachersList";
import { useSchoolStore } from "@/store/schoolStore";
import { initializeSampleData } from "@/store/schoolStore";

export const MainLayout = () => {
  const { activeView } = useSchoolStore();

  useEffect(() => {
    // Initialize sample data on mount
    initializeSampleData();
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentsList />;
      case 'teachers':
        return <TeachersList />;
      case 'subjects':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Subjects Management</h2>
            <p className="text-muted-foreground">Subjects module coming soon...</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Attendance Tracking</h2>
            <p className="text-muted-foreground">Attendance module coming soon...</p>
          </div>
        );
      case 'timetable':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Timetable Management</h2>
            <p className="text-muted-foreground">Timetable module coming soon...</p>
          </div>
        );
      case 'circulars':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Circulars & Announcements</h2>
            <p className="text-muted-foreground">Circulars module coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">Settings</h2>
            <p className="text-muted-foreground">Settings module coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};