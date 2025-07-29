import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSchoolStore } from '@/store/schoolStore';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  ClipboardCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  School
} from 'lucide-react';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'students',
    label: 'Students',
    icon: GraduationCap
  },
  {
    id: 'teachers',
    label: 'Teachers',
    icon: Users
  },
  {
    id: 'subjects',
    label: 'Subjects',
    icon: BookOpen
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: ClipboardCheck
  },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: Calendar
  },
  {
    id: 'circulars',
    label: 'Circulars',
    icon: FileText
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }
];

export const Sidebar = () => {
  const { activeView, setActiveView, sidebarCollapsed, setSidebarCollapsed } =
    useSchoolStore();

  return (
    <div
      className={cn(
        'relative bg-card border-r border-border h-screen transition-all duration-300 ease-in-out',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <School className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">EduManage</h1>
                <p className="text-xs text-muted-foreground">
                  School Management
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start h-10 transition-all duration-200',
                sidebarCollapsed && 'justify-center px-2',
                isActive &&
                  'bg-gradient-primary text-primary-foreground shadow-soft'
              )}
              onClick={() => setActiveView(item.id)}
            >
              <Icon className={cn('h-4 w-4', !sidebarCollapsed && 'mr-3')} />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
