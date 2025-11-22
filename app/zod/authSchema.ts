import { z } from 'zod';

export const studentSchema = z.object({
  student: z.object({
    f_name: z.string().trim().min(1, 'First name is required'),
    l_name: z.string().trim().min(1, 'Last name is required'),
    email: z.string().trim().email('Invalid email'),
    roll_no: z.string().trim().min(1, 'Roll number required'),
    grade_name: z.string().trim().min(1, 'Grade/Class required'),
    dob: z.string().trim().min(1, 'Date of birth is required'),
    gender: z
      .union([z.literal('Male'), z.literal('Female'), z.literal('Other')])
      .refine((val) => val !== null, 'Gender is required'),
    phone_num: z
      .number()
      .refine(
        (val) => val.toString().length === 10,
        'Phone number must be exactly 10 digits'
      ),
    address_line1: z.string().trim().min(1, 'Address line 1 is required'),
    city: z.string().trim().min(1, 'City is required'),
    state: z.string().trim().min(1, 'State is required'),
    country: z.string().trim().min(1, 'Country is required'),
    pincode: z.string().trim().min(1, 'Pincode is required'),
    blood_group: z.string().trim().min(1, 'Blood group is required'),
    aadhar_no: z.string().trim().min(1, 'Aadhar number is required')
  }),
  parent: z.object({
    f_name: z.string().trim().min(1, 'Parent first name required'),
    l_name: z.string().trim().min(1, 'Parent last name required'),
    dob: z.string().trim().min(1, 'Parent date of birth is required'),
    gender: z
      .union([z.literal('Male'), z.literal('Female'), z.literal('Other')])
      .refine((val) => val !== null, 'Gender is required'),
    occupation: z.string().trim().min(1, 'Occupation is required'),
    relation: z.string().trim().min(1, 'Relation is required'),
    phone_num: z
      .number()
      .refine(
        (val) => val.toString().length === 10,
        'Phone number must be exactly 10 digits'
      )
  }),
  password: z.string().min(8, 'Password must be 8+ chars')
});

export type StudentSchemaPayload = z.infer<typeof studentSchema>;

export const teacherSchema = z.object({
  teacher: z.object({
    f_name: z.string().trim().min(1, 'First name is required'),
    l_name: z.string().trim().min(1, 'Last name is required'),
    email: z.string().trim().email('Invalid email'),
    designation: z.string().trim().min(1, 'Designation required'),
    dob: z.string().trim().min(1, 'Date of birth is required'),
    doj: z.string().trim().min(1, 'Date of joining is required'),
    experienced_years: z
      .union([z.string(), z.number()])
      .refine(
        (val) => val !== null && val !== '',
        'Years of experience is required'
      ),
    gender: z
      .union([z.literal('Male'), z.literal('Female'), z.literal('Other')])
      .refine((val) => val !== null, 'Gender is required'),
    qualification: z.string().trim().min(1, 'Qualification is required'),
    phone_num: z
      .number()
      .refine(
        (val) => val.toString().length === 10,
        'Phone number must be exactly 10 digits'
      )
  }),
  password: z.string().trim().min(8, 'Password must be 8+ chars')
});

export type TeacherSchemaPayload = z.infer<typeof teacherSchema>;
