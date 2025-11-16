import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, UserPlus, Users, Eye, EyeOff } from 'lucide-react';
import { Student, Parent, Teacher } from '@setupati-school/setupati-types';

export interface StudentFormData {
  student: Student;
  parent: Parent;
  password: string;
  showPassword: boolean;
  confirmPassword: string;
  ShowConfirmPassword: boolean;
}

export interface TeacherFormData {
  teacher: Teacher;
  password: string;
  showPassword: boolean;
  confirmPassword: string;
  ShowConfirmPassword: boolean;
}

export const SignUpForm: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('student');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [studentFormData, setStudentFormData] = useState<StudentFormData>({
    // Student fields
    student: {
      f_name: '',
      l_name: '',
      email: '',
      roll_no: '',
      grade_name: '',
      dob: '',
      gender: '',
      blood_group: '',
      aadhar_no: '',
      phone_num: '',
      address_line1: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    },
    // Parent fields
    parent: {
      f_name: '',
      l_name: '',
      dob: '',
      gender: '',
      occupation: '',
      relation: '',
      phone_num: ''
    },
    password: '',
    showPassword: false,
    confirmPassword: '',
    ShowConfirmPassword: false
  });

  const [teacherFormData, setTeacherFormData] = useState<TeacherFormData>({
    teacher: {
      f_name: '',
      l_name: '',
      email: '',
      designation: '',
      dob: '',
      doj: '',
      experienced_years: '',
      gender: '',
      qualification: '',
      phone_num: ''
    },
    password: '',
    showPassword: false,
    confirmPassword: '',
    ShowConfirmPassword: false
  });

  const handleChange = (
    dataFor: 'student' | 'parent' | 'teacher',
    field: string,
    value: string
  ) => {
    if (dataFor === 'student' || dataFor === 'parent') {
      setStudentFormData((prev) => ({
        ...prev,
        [dataFor]: {
          ...prev[dataFor],
          [field]: value
        }
      }));
    } else {
      setTeacherFormData((prev) => ({
        ...prev,
        [dataFor]: {
          ...prev[dataFor],
          [field]: value
        }
      }));
    }
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (studentFormData.password !== studentFormData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    console.log('Creating student & parent accounts:', studentFormData);

    toast({
      title: 'Success',
      description: 'Student and parent accounts created successfully'
    });
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (teacherFormData.password !== teacherFormData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    console.log('Creating teacher account:', teacherFormData);

    toast({
      title: 'Success',
      description: 'Teacher account created successfully'
    });
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: 'Error',
        description: 'Please upload a valid Excel file (.xlsx or .xls)',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: 'Success',
            description: `${type} accounts created successfully from Excel file`
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-auto overflow-visible">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Student & Parent
          </TabsTrigger>
          <TabsTrigger value="teacher" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Teacher
          </TabsTrigger>
        </TabsList>

        {/* Student & Parent Registration */}
        <TabsContent value="student" className="space-y-4 mt-4">
          {/* Excel Upload Section */}
          <div className="border border-border rounded-lg p-4 bg-muted/20">
            <Label
              htmlFor="student-excel"
              className="text-sm font-semibold text-foreground mb-2 block"
            >
              Bulk Upload via Excel
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="student-excel"
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e, 'Student')}
                className="flex-1"
                disabled={isUploading}
              />
              <Button variant="outline" size="icon" disabled={isUploading}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {isUploading && (
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Creating accounts...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or create manually
              </span>
            </div>
          </div>

          {/* Manual Form */}
          <div className="max-w-3xl mx-auto w-full px-4">
            <form onSubmit={handleStudentSubmit} className="space-y-6">
              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="f_name">First Name *</Label>
                    <Input
                      id="f_name"
                      name="f_name"
                      required
                      value={studentFormData.student.f_name}
                      onChange={(e) =>
                        handleChange('student', 'f_name', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="l_name">Last Name *</Label>
                    <Input
                      id="l_name"
                      name="l_name"
                      required
                      value={studentFormData.student.l_name}
                      onChange={(e) =>
                        handleChange('student', 'l_name', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={studentFormData.student.email}
                      onChange={(e) =>
                        handleChange('student', 'email', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roll_no">Roll Number *</Label>
                    <Input
                      id="roll_no"
                      name="roll_no"
                      required
                      value={studentFormData.student.roll_no}
                      onChange={(e) =>
                        handleChange('student', 'roll_no', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade_name">Grade/Class *</Label>
                    <Input
                      id="grade_name"
                      name="grade_name"
                      required
                      value={studentFormData.student.grade_name}
                      onChange={(e) =>
                        handleChange('student', 'grade_name', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      required
                      value={studentFormData.student.dob}
                      onChange={(e) =>
                        handleChange('student', 'dob', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      name="gender"
                      value={studentFormData.student.gender}
                      onValueChange={(value) =>
                        handleChange('student', 'gender', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blood_group">Blood Group</Label>
                    <Input
                      id="blood_group"
                      name="blood_group"
                      value={studentFormData.student.blood_group}
                      onChange={(e) =>
                        handleChange('student', 'blood_group', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhar_no">Aadhar Number</Label>
                    <Input
                      id="aadhar_no"
                      name="aadhar_no"
                      value={studentFormData.student.aadhar_no}
                      onChange={(e) =>
                        handleChange('student', 'aadhar_no', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone_num">Phone Number *</Label>
                    <Input
                      id="phone_num"
                      name="phone_num"
                      type="tel"
                      required
                      value={studentFormData.student.phone_num}
                      onChange={(e) =>
                        handleChange('student', 'phone_num', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_line1">Address *</Label>
                  <Input
                    id="address_line1"
                    name="address_line1"
                    required
                    value={studentFormData.student.address_line1}
                    onChange={(e) =>
                      handleChange('student', 'address_line1', e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={studentFormData.student.city}
                      onChange={(e) =>
                        handleChange('student', 'city', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      required
                      value={studentFormData.student.state}
                      onChange={(e) =>
                        handleChange('student', 'state', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      required
                      value={studentFormData.student.country}
                      onChange={(e) =>
                        handleChange('student', 'country', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      required
                      value={studentFormData.student.pincode}
                      onChange={(e) =>
                        handleChange('student', 'pincode', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                  Parent/Guardian Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent_f_name">First Name *</Label>
                    <Input
                      id="parent_f_name"
                      name="parent_f_name"
                      required
                      value={studentFormData.parent.f_name}
                      onChange={(e) =>
                        handleChange('parent', 'f_name', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent_l_name">Last Name *</Label>
                    <Input
                      id="parent_l_name"
                      name="parent_l_name"
                      required
                      value={studentFormData.parent.l_name}
                      onChange={(e) =>
                        handleChange('parent', 'l_name', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent_dob">Date of Birth *</Label>
                    <Input
                      id="parent_dob"
                      name="parent_dob"
                      type="date"
                      required
                      value={studentFormData.parent.dob}
                      onChange={(e) =>
                        handleChange('parent', 'dob', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent_gender">Gender *</Label>
                    <Select
                      name="parent_gender"
                      value={studentFormData.parent.gender}
                      onValueChange={(value) =>
                        handleChange('parent', 'gender', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent_relation">Relation *</Label>
                    <Select
                      name="parent_relation"
                      value={studentFormData.parent.relation}
                      onValueChange={(value) =>
                        handleChange('parent', 'relation', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Guardian">Guardian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent_occupation">Occupation</Label>
                    <Input
                      id="parent_occupation"
                      name="parent_occupation"
                      value={studentFormData.parent.occupation}
                      onChange={(e) =>
                        handleChange('parent', 'occupation', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent_phone">Phone Number *</Label>
                    <Input
                      id="parent_phone"
                      name="parent_phone"
                      type="tel"
                      required
                      value={studentFormData.parent.phone_num}
                      onChange={(e) =>
                        handleChange('parent', 'phone_num', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Account Credentials */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                  Account Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={
                          studentFormData.showPassword ? 'text' : 'password'
                        }
                        required
                        value={studentFormData.password}
                        onChange={(e) =>
                          setStudentFormData({
                            ...studentFormData,
                            password: e.target.value
                          })
                        }
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setStudentFormData({
                            ...studentFormData,
                            showPassword: !studentFormData.showPassword
                          })
                        }
                      >
                        {studentFormData.showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          studentFormData.ShowConfirmPassword
                            ? 'text'
                            : 'password'
                        }
                        required
                        value={studentFormData.confirmPassword}
                        onChange={(e) =>
                          setStudentFormData({
                            ...studentFormData,
                            confirmPassword: e.target.value
                          })
                        }
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setStudentFormData({
                            ...studentFormData,
                            ShowConfirmPassword:
                              !studentFormData.ShowConfirmPassword
                          })
                        }
                      >
                        {studentFormData.ShowConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create Student & Parent Accounts
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* Teacher Registration */}
        <TabsContent value="teacher" className="space-y-4 mt-4">
          {/* Excel Upload Section */}
          <div className="border border-border rounded-lg p-4 bg-muted/20">
            <Label
              htmlFor="teacher-excel"
              className="text-sm font-semibold text-foreground mb-2 block"
            >
              Bulk Upload via Excel
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="teacher-excel"
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => handleFileUpload(e, 'Teacher')}
                className="flex-1"
                disabled={isUploading}
              />
              <Button variant="outline" size="icon" disabled={isUploading}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {isUploading && (
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Creating accounts...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or create manually
              </span>
            </div>
          </div>

          {/* Manual Form */}
          <div className="max-w-3xl mx-auto w-full px-4">
            <form onSubmit={handleTeacherSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                  Teacher Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher_f_name">First Name *</Label>
                    <Input
                      id="teacher_f_name"
                      name="f_name"
                      required
                      value={teacherFormData.teacher.f_name}
                      onChange={(e) =>
                        handleChange('teacher', 'f_name', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher_l_name">Last Name *</Label>
                    <Input
                      id="teacher_l_name"
                      name="l_name"
                      required
                      value={teacherFormData.teacher.l_name}
                      onChange={(e) =>
                        handleChange('teacher', 'l_name', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher_email">Email *</Label>
                    <Input
                      id="teacher_email"
                      name="email"
                      type="email"
                      required
                      value={teacherFormData.teacher.email}
                      onChange={(e) =>
                        handleChange('teacher', 'email', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher_phone">Phone Number *</Label>
                    <Input
                      id="teacher_phone"
                      name="phone_num"
                      type="tel"
                      required
                      value={teacherFormData.teacher.phone_num}
                      onChange={(e) =>
                        handleChange('teacher', 'phone_num', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      name="designation"
                      required
                      value={teacherFormData.teacher.designation}
                      onChange={(e) =>
                        handleChange('teacher', 'designation', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Input
                      id="qualification"
                      name="qualification"
                      required
                      value={teacherFormData.teacher.qualification}
                      onChange={(e) =>
                        handleChange('teacher', 'qualification', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher_dob">Date of Birth *</Label>
                    <Input
                      id="teacher_dob"
                      name="dob"
                      type="date"
                      required
                      value={teacherFormData.teacher.dob}
                      onChange={(e) =>
                        handleChange('teacher', 'dob', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doj">Date of Joining *</Label>
                    <Input
                      id="doj"
                      name="doj"
                      type="date"
                      required
                      value={teacherFormData.teacher.doj}
                      onChange={(e) =>
                        handleChange('teacher', 'doj', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experienced_years">
                      Years of Experience *
                    </Label>
                    <Input
                      id="experienced_years"
                      name="experienced_years"
                      type="number"
                      min="0"
                      required
                      value={teacherFormData.teacher.experienced_years}
                      onChange={(e) =>
                        handleChange(
                          'teacher',
                          'experienced_years',
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher_gender">Gender *</Label>
                    <Select
                      name="gender"
                      value={teacherFormData.teacher.gender}
                      onValueChange={(value) =>
                        handleChange('teacher', 'gender', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Account Credentials */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
                  Account Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher_password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="teacher_password"
                        name="password"
                        type={
                          teacherFormData.showPassword ? 'text' : 'password'
                        }
                        required
                        value={teacherFormData.password}
                        onChange={(e) =>
                          setTeacherFormData({
                            ...teacherFormData,
                            password: e.target.value
                          })
                        }
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setTeacherFormData({
                            ...teacherFormData,
                            showPassword: !teacherFormData.showPassword
                          })
                        }
                      >
                        {teacherFormData.showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher_confirmPassword">
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Input
                        id="teacher_confirmPassword"
                        name="confirmPassword"
                        type={
                          teacherFormData.ShowConfirmPassword
                            ? 'text'
                            : 'password'
                        }
                        required
                        value={teacherFormData.confirmPassword}
                        onChange={(e) =>
                          setTeacherFormData({
                            ...teacherFormData,
                            confirmPassword: e.target.value
                          })
                        }
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setTeacherFormData({
                            ...teacherFormData,
                            ShowConfirmPassword:
                              !teacherFormData.ShowConfirmPassword
                          })
                        }
                      >
                        {teacherFormData.ShowConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:col-span-2 flex justify-center">
                <Button type="submit" className="w-full max-w-md">
                  Create Student & Parent Accounts
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
