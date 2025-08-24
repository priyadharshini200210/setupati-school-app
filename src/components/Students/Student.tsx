import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useSchoolStore } from '@/store/schoolStore';
import { Search, Plus, Edit, Eye, Filter } from 'lucide-react';

interface StudentsProps {
  grade_name: string;
  onBack: () => void;
}

export const Student = ({ grade_name, onBack }: StudentsProps) => {
  const { students, setStudents } = useSchoolStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    student_rollno: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    parent_name: '',
    parent_phone: '',
    enrollment_date: '',
    class: '',
    section: ''
  });

  useEffect(() => {
    // Fetch students from backend if needed
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students/all');
        console.log('response', response);
        if (!response.ok) throw new Error('Failed to fetch students');
        const data = await response.json();
        console.log('Fetched students:', data);
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  console.log('students', students, "searchTerm", searchTerm);

  const filteredStudents = students.filter((student) =>
  (student?.grade_name === grade_name) &&
    (student?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student?.student_rollno || '').toLowerCase().includes(searchTerm.toLowerCase())
  );


  const consoleLogFilteredStudents = () => {
    console.log('Filtered students:', filteredStudents);
  };

  consoleLogFilteredStudents();

  // const getInitials = (name?: string) => {
  //   if (!name || typeof name !== 'string') return '?';
  //   return name
  //     .trim()
  //     .split(' ')
  //     .map((n) => n[0])
  //     .join('')
  //     .toUpperCase();
  // };

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/students/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create student');

      const result = await response.json();
      alert(`Student created with ID: ${result.id}`);
      setShowForm(false);
      setFormData({ // reset
        student_rollno: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        gender: '',
        parent_name: '',
        parent_phone: '',
        enrollment_date: '',
        class: '',
        section: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error adding student');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">
            Manage student information and records
          </p>
        </div>
        <Button
          onClick={toggleForm}
          className="bg-gradient-primary text-primary-foreground shadow-soft"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 mt-4 shadow-md rounded grid grid-cols-2 gap-4 max-w-3xl"
          >
            {[
              'student_rollno',
              'name',
              'email',
              'phone',
              'address',
              'dob',
              'gender',
              'parent_name',
              'parent_phone',
              'enrollment_date',
              'class',
              'section'
            ].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm capitalize">{field.replace('_', ' ')}</label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  type={field.includes('date') || field === 'dob' ? 'date' : 'text'}
                  className="border border-gray-300 rounded px-2 py-1"
                  required
                />
              </div>
            ))}

            <div className="col-span-2 flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-primary text-primary-foreground shadow-soft"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Filters and Search */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Student Records</span>
            <Badge variant="outline" className="text-xs">
              {filteredStudents.length} students
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SI No.</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Parent Name</TableHead>
                  <TableHead>Parent Phone Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredStudents.map((student,index) => {
                  console.log('Rendering student:', student);
                  return (
                    <TableRow key={student.student_rollno}>
                      <TableCell>
      <p className="font-medium">{index + 1}</p> {/* Serial number */}
    </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.student_rollno}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.email}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.dob}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.address}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.phone}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.enrollment_date}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.class}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.section}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{student?.student?.gender}</p>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{student?.student?.phone}</p>
                          <p className="text-muted-foreground text-xs">{student?.student?.parent_name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{student?.student?.parent_phone}</p>
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
                  );
                })}
              </TableBody>

            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm
                  ? 'No students found matching your search.'
                  : 'No students added yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
