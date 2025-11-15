import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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
import { Upload, UserPlus, Users } from 'lucide-react';

export const SignUpForm: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('student');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [studentFormData, setStudentFormData] = useState({
    // Student fields
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
    pincode: '',
    // Parent fields
    parent_f_name: '',
    parent_l_name: '',
    parent_dob: '',
    parent_gender: '',
    parent_occupation: '',
    parent_relation: '',
    parent_phone: '',
    password: '',
    confirmPassword: ''
  });

  const [teacherFormData, setTeacherFormData] = useState({
    f_name: '',
    l_name: '',
    email: '',
    designation: '',
    dob: '',
    doj: '',
    experienced_years: '',
    gender: '',
    qualification: '',
    phone_num: '',
    password: '',
    confirmPassword: ''
  });

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentFormData({
      ...studentFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherFormData({
      ...teacherFormData,
      [e.target.name]: e.target.value
    });
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
                    value={studentFormData.f_name}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="l_name">Last Name *</Label>
                  <Input
                    id="l_name"
                    name="l_name"
                    required
                    value={studentFormData.l_name}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={studentFormData.email}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roll_no">Roll Number *</Label>
                  <Input
                    id="roll_no"
                    name="roll_no"
                    required
                    value={studentFormData.roll_no}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade_name">Grade/Class *</Label>
                  <Input
                    id="grade_name"
                    name="grade_name"
                    required
                    value={studentFormData.grade_name}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    value={studentFormData.dob}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    name="gender"
                    value={studentFormData.gender}
                    onValueChange={(value) =>
                      setStudentFormData({
                        ...studentFormData,
                        gender: value
                      })
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
                    value={studentFormData.blood_group}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhar_no">Aadhar Number</Label>
                  <Input
                    id="aadhar_no"
                    name="aadhar_no"
                    value={studentFormData.aadhar_no}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_num">Phone Number *</Label>
                  <Input
                    id="phone_num"
                    name="phone_num"
                    type="tel"
                    required
                    value={studentFormData.phone_num}
                    onChange={handleStudentChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address_line1">Address *</Label>
                <Input
                  id="address_line1"
                  name="address_line1"
                  required
                  value={studentFormData.address_line1}
                  onChange={handleStudentChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    required
                    value={studentFormData.city}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    required
                    value={studentFormData.state}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    required
                    value={studentFormData.country}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    required
                    value={studentFormData.pincode}
                    onChange={handleStudentChange}
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
                    value={studentFormData.parent_f_name}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent_l_name">Last Name *</Label>
                  <Input
                    id="parent_l_name"
                    name="parent_l_name"
                    required
                    value={studentFormData.parent_l_name}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent_dob">Date of Birth *</Label>
                  <Input
                    id="parent_dob"
                    name="parent_dob"
                    type="date"
                    required
                    value={studentFormData.parent_dob}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent_gender">Gender *</Label>
                  <Select
                    name="parent_gender"
                    value={studentFormData.parent_gender}
                    onValueChange={(value) =>
                      setStudentFormData({
                        ...studentFormData,
                        parent_gender: value
                      })
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
                    value={studentFormData.parent_relation}
                    onValueChange={(value) =>
                      setStudentFormData({
                        ...studentFormData,
                        parent_relation: value
                      })
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
                    value={studentFormData.parent_occupation}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent_phone">Phone Number *</Label>
                  <Input
                    id="parent_phone"
                    name="parent_phone"
                    type="tel"
                    required
                    value={studentFormData.parent_phone}
                    onChange={handleStudentChange}
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
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={studentFormData.password}
                    onChange={handleStudentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={studentFormData.confirmPassword}
                    onChange={handleStudentChange}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Student & Parent Accounts
            </Button>
          </form>
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
                    value={teacherFormData.f_name}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher_l_name">Last Name *</Label>
                  <Input
                    id="teacher_l_name"
                    name="l_name"
                    required
                    value={teacherFormData.l_name}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher_email">Email *</Label>
                  <Input
                    id="teacher_email"
                    name="email"
                    type="email"
                    required
                    value={teacherFormData.email}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher_phone">Phone Number *</Label>
                  <Input
                    id="teacher_phone"
                    name="phone_num"
                    type="tel"
                    required
                    value={teacherFormData.phone_num}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation *</Label>
                  <Input
                    id="designation"
                    name="designation"
                    required
                    value={teacherFormData.designation}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification *</Label>
                  <Input
                    id="qualification"
                    name="qualification"
                    required
                    value={teacherFormData.qualification}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher_dob">Date of Birth *</Label>
                  <Input
                    id="teacher_dob"
                    name="dob"
                    type="date"
                    required
                    value={teacherFormData.dob}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doj">Date of Joining *</Label>
                  <Input
                    id="doj"
                    name="doj"
                    type="date"
                    required
                    value={teacherFormData.doj}
                    onChange={handleTeacherChange}
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
                    value={teacherFormData.experienced_years}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher_gender">Gender *</Label>
                  <Select
                    name="gender"
                    value={teacherFormData.gender}
                    onValueChange={(value) =>
                      setTeacherFormData({
                        ...teacherFormData,
                        gender: value
                      })
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
                  <Input
                    id="teacher_password"
                    name="password"
                    type="password"
                    required
                    value={teacherFormData.password}
                    onChange={handleTeacherChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher_confirmPassword">
                    Confirm Password *
                  </Label>
                  <Input
                    id="teacher_confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={teacherFormData.confirmPassword}
                    onChange={handleTeacherChange}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Teacher Account
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};
