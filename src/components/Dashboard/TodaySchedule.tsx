import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

export const TodaySchedule = () => {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Today's Schedule</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
            <div>
              <p className="font-medium text-sm">Morning Assembly</p>
              <p className="text-xs text-muted-foreground">All Students</p>
            </div>
            <Badge variant="outline">9:00 AM</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-success-soft rounded-lg">
            <div>
              <p className="font-medium text-sm">Math Period - Grade 10A</p>
              <p className="text-xs text-muted-foreground">John Doe</p>
            </div>
            <Badge variant="outline">10:00 AM</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-warning-soft rounded-lg">
            <div>
              <p className="font-medium text-sm">Parent Meeting</p>
              <p className="text-xs text-muted-foreground">Conference Room</p>
            </div>
            <Badge variant="outline">2:00 PM</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
