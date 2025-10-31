import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from './StatsCard';
import { Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useSchoolStore } from '@/store/schoolStore';

type AttendanceStatus = 'present' | 'absent' | 'leave';
type AttendanceRecord = {
  date: string; // ISO string or yyyy-mm-dd
  status: AttendanceStatus;
  note?: string;
  id?: string;
};

export const StudentAttendance = () => {
  const { getMyAttendance } = useSchoolStore();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        // support sync or async store getter
        const res = getMyAttendance ? getMyAttendance() : [];
        const data: AttendanceRecord[] =
          res && typeof (res as any).then === 'function' ? await res : res;
        if (mounted) setRecords(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setRecords([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [getMyAttendance]);

  const total = records.length;
  const present = records.filter((r) => r.status === 'present').length;
  const absent = records.filter((r) => r.status === 'absent').length;
  const leave = records.filter((r) => r.status === 'leave').length;
  const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString();
    } catch {
      return iso;
    }
  };

  const badgeFor = (s: AttendanceStatus) => {
    switch (s) {
      case 'present':
        return (
          <Badge variant="outline" className="text-success inline-flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> Present
          </Badge>
        );
      case 'absent':
        return (
          <Badge variant="outline" className="text-destructive inline-flex items-center gap-2">
            <XCircle className="h-4 w-4" /> Absent
          </Badge>
        );
      case 'leave':
        return (
          <Badge variant="outline" className="text-warning inline-flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> Leave
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Present"
          value={present}
          icon={CheckCircle}
          description={`${attendanceRate}% attendance`}
          trend={{ value: attendanceRate, isPositive: attendanceRate >= 50 }}
        />
        <StatsCard
          title="Absent"
          value={absent}
          icon={XCircle}
          description="Days missed"
          trend={{ value: absent, isPositive: false }}
        />
        <StatsCard
          title="On Leave"
          value={leave}
          icon={AlertCircle}
          description="Approved leaves"
          trend={{ value: leave, isPositive: leave === 0 }}
        />
      </div>

      <Card className="shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Attendance (Daily)</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Loading attendance...
            </p>
          ) : total === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No attendance records found.
            </p>
          ) : (
            <div className="divide-y">
              {records
                .slice()
                .sort((a, b) => (a.date < b.date ? 1 : -1))
                .map((r) => (
                  <div
                    key={r.id ?? r.date}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {formatDate(r.date)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(r.date).toLocaleString(undefined, {
                          weekday: 'long',
                        })}
                        {r.note ? ` • ${r.note}` : ''}
                      </div>
                    </div>

                    <div>{badgeFor(r.status)}</div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAttendance;