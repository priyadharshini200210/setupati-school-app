import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  sectionCount?: number;
  description?: string;
  className?: string;
  onClick?: () => void;
  onSectionClick?: (section: string) => void;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  sectionCount = 0,
  description,
  className,
  onClick,
  onSectionClick
}: StatsCardProps) => {
  const renderSectionButtons = () =>
    Array.from({ length: sectionCount }, (_, index) => {
      const sectionLetter = String.fromCharCode(65 + index); // A, B, C...
      return (
        <button
          key={sectionLetter}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card onClick
            onSectionClick?.("Section_" + sectionLetter);
          }}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-muted text-foreground text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          {sectionLetter}
        </button>
      );
    });

  return (
    <Card
      className={cn(
        'shadow-soft hover:shadow-elevation transition-all duration-200',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-foreground mb-1">{title}</p>
            <p className="text-l font-medium text-muted-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="p-3 bg-primary-soft rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>

        {sectionCount > 0 && (
          <div className="mt-4 flex space-x-2">{renderSectionButtons()}</div>
        )}
      </CardContent>
    </Card>
  );
};
