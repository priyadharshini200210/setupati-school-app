import { useParams } from 'react-router-dom';
import { Student } from './Student';

interface WrapperProps {
  onBack: () => void;
  paramType: 'grade' | 'section'; // Tell it what the param represents
}

export const StudentWrapper = ({ onBack, paramType }: WrapperProps) => {
  const { name } = useParams<{ name: string }>();

  if (!name) return null;

  return (
    <Student
      name={paramType}
      value={name}
      onBack={onBack}
    />
  );
};
