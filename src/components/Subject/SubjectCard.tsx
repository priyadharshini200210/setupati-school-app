import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Subject } from '@/store/schoolStore';
import { User, Code, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SubjectCardProps {
  subject: Subject;
  onEdit: (subject: Subject) => void;
  onDelete: (subjectId: string) => void;
}

export const SubjectCard = ({ subject, onEdit, onDelete }: SubjectCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/subjects/delete/${subject?.subject_name}/${subject?.grade_name}`, 
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete subject: ${response.statusText}`);
    }
    setShowDeleteDialog(false);

  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to delete subject. Please try again.',
      variant: 'destructive',
    });
  }
};
  return (
    <>
      <Card className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300">
        <div className={`h-2 bg-gradient-to-r bg-primary`} />
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">
                {subject?.subject_name?.toUpperCase()}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code className="w-4 h-4" />
                <span>{subject?.subject_name?.toLowerCase()}</span>
              </div>
            </div>
            
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onEdit(subject)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{subject?.teacher_name || 'Unknown Teacher'}</span>
          </div>
        </div>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subject</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{subject?.subject_name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
function toast(arg0: { title: string; description: string; variant: string; }) {
  throw new Error('Function not implemented.');
}

