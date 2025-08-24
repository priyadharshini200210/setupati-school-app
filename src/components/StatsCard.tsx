import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  sectionCount?: number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
  onLetterClick?: (letter: string) => void; // Optional click handler for letters
}

export const StatsCard = ({
  title,
  value,
  sectionCount,
  icon: Icon,
  description,
  trend,
  className,
  onClick,
  onLetterClick,
}: StatsCardProps) => {
console.log("sectionCount", sectionCount);
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
            <p className="text-xl font-bold text-foreground mb-1">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-l font-medium text-muted-foreground">{value}</p>
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="p-3 bg-primary-soft rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          {Array.from({ length: sectionCount ?? 0 }, (_, index) => (
            <button
              key={index}
              onClick={onClick}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-muted text-foreground text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              {String.fromCharCode(65 + index)}
            </button>
          ))}
        </div>

      </CardContent>
    </Card>
  );
};
