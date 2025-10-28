export interface Student {
  id: string;
  section_id: string;
  subject_ids: string[];
  roll_no: string;
  dob: string; // ISO 8601 string format
  f_name: string;
  l_name: string;
  gender: 'Male' | 'Female' | 'Other'; // adjust as needed
  blood_group: string;
  aadhar_no: string;
  phone_num1: string;
  address_line1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
  grade_name: string;
}

