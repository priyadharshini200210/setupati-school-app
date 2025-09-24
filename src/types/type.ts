import type { LucideIcon } from 'lucide-react';

export interface StatsCardProps{
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}


