import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/text-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Subject } from '@/store/schoolStore';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const subjectSchema = z.object({
  name: z.string().trim().min(1, 'Subject name is required').max(100, 'Name must be less than 100 characters'),
  code: z.string().trim().min(1, 'Subject code is required').max(20, 'Code must be less than 20 characters'),
  teacher: z.string().trim().min(1, 'Teacher name is required').max(100, 'Teacher name must be less than 100 characters'),
  description: z.string().trim().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  color: z.string().min(1, 'Please select a color'),
});

interface SubjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (subject: Omit<Subject, 'id'>) => void;
  subject?: Subject | null;
  mode: 'add' | 'edit';
}

const colorOptions = [
  { value: 'from-blue-400 to-blue-600', label: 'Blue' },
  { value: 'from-purple-400 to-purple-600', label: 'Purple' },
  { value: 'from-green-400 to-green-600', label: 'Green' },
  { value: 'from-orange-400 to-orange-600', label: 'Orange' },
  { value: 'from-red-400 to-red-600', label: 'Red' },
  { value: 'from-pink-400 to-pink-600', label: 'Pink' },
  { value: 'from-yellow-400 to-yellow-600', label: 'Yellow' },
  { value: 'from-indigo-400 to-indigo-600', label: 'Indigo' },
  { value: 'from-teal-400 to-teal-600', label: 'Teal' },
];

export const SubjectDialog = ({ open, onClose, onSave, subject, mode }: SubjectDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject_name: '',
    grade_name: '',
    teacher_name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (subject && mode === 'edit') {
      setFormData({
        subject_name: subject?.subject_name,
        grade_name: subject?.grade_name,
        teacher_name: subject?.teacher_name,
      });
    } else if (mode === 'add') {
      setFormData({
        subject_name: subject?.subject_name,
        grade_name: subject?.grade_name,
        teacher_name: subject?.teacher_name,
      });
    }
    setErrors({});
  }, [subject, mode, open]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    if (!formData?.subject_name || !formData?.grade_name || !formData?.teacher_name) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    const payload = {
      subject_name: formData?.subject_name,
      grade_name: formData?.grade_name,
      teacher_name: formData?.teacher_name
    };

    const url = mode === 'add' 
      ? 'http://localhost:3000/subjects/create'
      : `http://localhost:3000/subjects/update/${subject?.subject_name || ''}`;

    const response = await fetch(url, {
      method: mode === 'add' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Failed to save subject');
    }

    toast({
      title: mode === 'add' ? 'Subject Added' : 'Subject Updated',
      description: `${formData?.subject_name} has been ${mode === 'add' ? 'added' : 'updated'} successfully.`,
    });
    
    onClose();
  } catch (error) {
    toast({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to save subject',
      variant: 'destructive',
    });
  }
};

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Subject' : 'Edit Subject'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? 'Fill in the details to add a new subject to this grade.'
              : 'Update the subject information below.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name *</Label>
              <Input
                id="name"
                value={formData?.subject_name}
                onChange={(e) => handleChange('subject_name', e?.target?.value)}
                placeholder="e.g., Mathematics"
                className={errors?.subject_name ? 'border-destructive' : ''}
                maxLength={100}
              />
              {errors?.subject_name && (
                <p className="text-sm text-destructive">{errors?.subject_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Grade Name *</Label>
              <Input
                id="code"
                value={formData?.grade_name}
                onChange={(e) => handleChange('grade_name', e?.target?.value)}
                placeholder="e.g., Grade_001"
                className={errors?.grade_name ? 'border-destructive' : ''}
                maxLength={20}
              />
              {errors?.grade_name && (
                <p className="text-sm text-destructive">{errors?.grade_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher Name *</Label>
              <Input
                id="teacher"
                value={formData?.teacher_name}
                onChange={(e) => handleChange('teacher_name', e?.target?.value)}
                placeholder="e.g., Ms. Johnson"
                className={errors?.teacher_name ? 'border-destructive' : ''}
                maxLength={100}
              />
              {errors?.teacher_name && (
                <p className="text-sm text-destructive">{errors?.teacher_name}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Add Subject' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
