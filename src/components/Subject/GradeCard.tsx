import { Card } from '@/components/ui/card';
import { Grade } from '@/store/schoolStore';
import { BookOpen, ChevronRight } from 'lucide-react';

interface GradeCardProps {
  grade: Grade;
  onClick: () => void;
}

export const GradeCard = ({ grade, onClick }: GradeCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <h3 className="text-xl font-bold text-card-foreground mb-2">
            {grade?.name}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            {grade?.subjects.length} {grade?.subjects.length === 1 ? 'Subject' : 'Subjects'}
          </p>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-primary via-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
};
