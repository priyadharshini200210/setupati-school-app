export interface Student {
  student_rollno: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string; 
  gender: 'Male' | 'Female' | 'Other'; 
  parent_name: string;
  parent_phone: string;
  enrollment_date: string; 
  class: string;
  section: string;
}