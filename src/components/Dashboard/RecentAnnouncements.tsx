import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

interface Circular {
  id: string;
  title: string;
  description: string;
  targeted_group: string;
  issued_date: string;
}
interface RecentAnnouncementsProps {
  circulars: Circular[];
}
export const RecentAnnouncements = ({
  circulars
}: RecentAnnouncementsProps) => {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Bell className="h-5 w-5 text-primary" />
          <span>Recent Announcements</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {circulars.length > 0 ? (
          circulars.map((circular) => (
            <div
              key={circular.id}
              className="border-l-2 border-primary pl-3 py-2"
            >
              <h4 className="font-medium text-sm text-foreground">
                {circular.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {circular.description.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="text-xs">
                  {circular.targeted_group}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(circular.issued_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent announcements
          </p>
        )}
      </CardContent>
    </Card>
  );
};
