import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuickActions = () => {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2">
          <button className="p-3 text-left bg-primary-soft hover:bg-primary-soft/80 rounded-lg transition-colors">
            <p className="font-medium text-sm text-primary">Mark Attendance</p>
            <p className="text-xs text-muted-foreground">
              Record today's attendance
            </p>
          </button>
          <button className="p-3 text-left bg-accent hover:bg-accent/80 rounded-lg transition-colors">
            <p className="font-medium text-sm text-accent-foreground">
              Add Student
            </p>
            <p className="text-xs text-muted-foreground">
              Register new student
            </p>
          </button>
          <button className="p-3 text-left bg-success-soft hover:bg-success-soft/80 rounded-lg transition-colors">
            <p className="font-medium text-sm text-success">Create Circular</p>
            <p className="text-xs text-muted-foreground">Send announcement</p>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
