import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Edit, Eye } from 'lucide-react';

type Teacher = {
  id: string;
  first_name: string;
  last_name: string;
  designation: string;
  qualification: string;
  subject_ids: string[];
  experienced_years: number;
  section_ids: string[];
  doj: string;
  dob: string;
  gender: string;
};

interface TeachersTableProps {
  teachers: Teacher[];
  searchTerm: string;
}
export const TeachersList = ({ teachers, searchTerm }: TeachersTableProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const getExperienceColor = (years: number) => {
    if (years >= 10) return 'bg-success text-success-foreground';
    if (years >= 5) return 'bg-warning text-warning-foreground';
    return 'bg-primary-soft text-primary';
  };

  return (
    <div className="space-y-6">
      {/* Teachers Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Faculty Members</span>
            <Badge variant="outline" className="text-xs">
              {teachers.length} teachers
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary-soft text-primary">
                            {getInitials(teacher.first_name, teacher.last_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {teacher.first_name} {teacher.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {teacher.gender}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-accent text-accent-foreground">
                        {teacher.designation}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{teacher.qualification}</p>
                        <p className="text-xs text-muted-foreground">
                          {teacher.subject_ids.length} subjects
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getExperienceColor(
                          teacher.experienced_years
                        )}
                      >
                        {teacher.experienced_years} years
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.section_ids.map((sectionId, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {sectionId}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(teacher.doj).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">
                          DOB: {new Date(teacher.dob).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {teachers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm
                  ? 'No teachers found matching your search.'
                  : 'No teachers added yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
