import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useSchoolStore } from '@/store/schoolStore';
import { Search, Plus, Edit, Eye, Filter } from 'lucide-react';

interface StudentsProps {
  name?: 'grade' | 'section';
  value?: string;
  onBack?: () => void;
}

export const Student = ({ name, value, onBack }: StudentsProps) => {
  const { students, setStudents } = useSchoolStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    section_id: '',
    subject_ids: [], // or [''] if needed
    roll_no: '',
    dob: '',
    f_name: '',
    l_name: '',
    gender: '',
    blood_group: '',
    aadhar_no: '',
    phone_num1: '',
    address_line1: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    grade_name: ''
  });


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students/all');
        if (!response.ok) throw new Error('Failed to fetch students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  console.log(students,name,value);

  const filteredStudents = students.filter((student) => {
    const matchesFilter =
      name === 'grade'
        ? student?.student?.grade_name === value
        : name === 'section'
          ? student?.student?.section_name === value
          : true;

    const matchesSearch =
      !searchTerm ||
      student?.student?.f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.student?.roll_no.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  console.log(filteredStudents);

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
      setFormData({
        section_id: '',
        subject_ids: [], // or [''] if needed
        roll_no: '',
        dob: '',
        f_name: '',
        l_name: '',
        gender: '',
        blood_group: '',
        aadhar_no: '',
        phone_num1: '',
        address_line1: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        grade_name: ''
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
          <h1 className="text-2xl font-bold text-foreground">{value +' Students'}</h1>
          <p className="text-muted-foreground">
            {}
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
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
              'roll_no',
              'f_name',
              'l_name',
              'dob',
              'gender',
              'blood_group',
              'aadhar_no',
              'phone_num1',
              'address_line1',
              'city',
              'state',
              'country',
              'pincode',
              'grade_name',
              'section_name'
            ]
              .map((field) => (
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

      {/* Search Bar */}
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
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SI No.</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Aadhar No.</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Pincode</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.student.roll_no}</TableCell>
                    <TableCell>{student.student.f_name}</TableCell>
                    <TableCell>{student.student.l_name}</TableCell>
                    <TableCell>{student.student.dob}</TableCell>
                    <TableCell>{student.student.gender}</TableCell>
                    <TableCell>{student.student.blood_group}</TableCell>
                    <TableCell>{student.student.aadhar_no}</TableCell>
                    <TableCell>{student.student.phone_num1}</TableCell>
                    <TableCell>{student.student.address_line1}</TableCell>
                    <TableCell>{student.student.city}</TableCell>
                    <TableCell>{student.student.state}</TableCell>
                    <TableCell>{student.student.country}</TableCell>
                    <TableCell>{student.student.pincode}</TableCell>

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
