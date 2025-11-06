import { useEffect, useState } from 'react';
import { useSchoolStore, Subject, Grade } from '@/store/subjectStore';
import { GradeCard } from './GradeCard';
import { SubjectCard } from './SubjectCard';
import { SubjectDialog } from './SubjectDialog.jsx';
import { Button } from '@/components/ui/button';
import { ArrowLeft, GraduationCap, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SubjectsManagement = () => {
  const {
    grades,
    selectedGrade,
    setSelectedGrade,
    addSubject, 
    updateSubject,
    deleteSubject,
  } = useSchoolStore();

  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

useEffect(() => {
  const fetchGradesFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:3000/grades/all');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const gradeResponse = await response.json();
      const gradesWithSubjects = await Promise.all(
        gradeResponse.map(async (grade: any) => {
          const subjectsResponse = await fetch(
            `http://localhost:3000/subjects/search/${grade?.grade?.grade_name}`
          );
          const subjects = await subjectsResponse.json();          
          return {
            name: grade?.grade?.grade_name,
            subjects: subjects || []
          };
        })
      );
      useSchoolStore.setState({ grades: gradesWithSubjects });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not load grades and subjects from backend.',
      });
    }
  };

  fetchGradesFromBackend();
}, [toast, addSubject, updateSubject, deleteSubject]);

  const handleAddSubject = () => {
    setDialogMode('add');
    setSelectedSubject(null);
    setDialogOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setDialogMode('edit');
    setSelectedSubject(subject);
    setDialogOpen(true);
  };

  const handleSaveSubject = (subjectData: Omit<Subject, 'id'>) => {
    if (!selectedGrade) return;

    if (dialogMode === 'add') {
      addSubject(selectedGrade?.id, subjectData);
    }
  };

  const handleDeleteSubject = (subjectName: string, gradeName: string) => {
    if (!selectedGrade) return;

    deleteSubject(selectedGrade?.id, subjectName, gradeName);
    toast({
      title: 'Subject Deleted',
      description: 'The subject has been removed successfully.',
    });
  };

  if (selectedGrade) {
    return (
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedGrade(null)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Grades
          </Button>

          <Button onClick={handleAddSubject} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Subject
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{selectedGrade.name}</h1>
          <p className="text-muted-foreground">
            View and manage subjects for {selectedGrade.name}
          </p>
        </div>

        {selectedGrade.subjects.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-4">No subjects added yet</p>
            <Button onClick={handleAddSubject} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Subject
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedGrade.subjects.map((subject) =>{ 
              return (
              <SubjectCard
                key={subject?.id}
                subject={subject?.subject}
                onEdit={handleEditSubject}
                onDelete={handleDeleteSubject}
              />
            )})}
          </div>
        )}

        <SubjectDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveSubject}
          subject={selectedSubject}
          mode={dialogMode}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-md">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Subjects</h1>
          <p className="text-muted-foreground">Select a grade to view subjects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {grades.map((grade) => (
          <GradeCard
            key={grade.id}
            grade={grade}
            onClick={() => setSelectedGrade(grade)}
          />
        ))}
      </div>
    </div>
  );
};
