export interface Teacher {
  id: string;
  section_ids: string[];
  subject_ids: string[];
  f_name: string;
  l_name: string;
  dob: string;
  doj: string;
  gender: 'Male' | 'Female' | 'Other';
  designation: string;
  qualification: string;
  experienced_years: number;
  created_at: string;
  updated_at: string;
}
