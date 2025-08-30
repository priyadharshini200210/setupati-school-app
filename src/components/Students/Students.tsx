import { StatsCard } from '../StatsCard';
import { useSchoolStore } from '@/store/schoolStore';
import { Users } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


export const Students = () => {
  const { grades, teachers, students } = useSchoolStore();
  const navigate = useNavigate();

  const teachersByGradeId = useMemo(() => {
    return grades.reduce((acc, grade) => {
      const teacher = teachers.find(t => t.id === grade.teacher_id);
      acc[grade.grade_name] = teacher 
        ? `${teacher.first_name} ${teacher.last_name}`
        : 'Unknown';
      return acc;
    }, {} as Record<string, string>);
  }, [grades, teachers]);

  const studentCountByGrade = useMemo(() => {
    return students.reduce((acc, student) => {
      if (student?.grade_name) {
        acc[student.grade_name] = (acc[student.grade_name] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [students]);



  const handleGradeClick = (gradeName: string) => {
    navigate(`/students/grade/${gradeName}`);
  };

  const handleSectionClick = (sectionName: string) => {
    navigate(`/students/section/${sectionName}`);
  };

  const defaultGrades = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {defaultGrades.map((defaultGrade, index) => {
        const grade = grades[index];
        const gradeName = grade?.grade_name || defaultGrade;
      
        return (
          <StatsCard
            key={gradeName}
            title={gradeName}
            sectionCount={(grade?.section_ids).length || 0}
            value={`Student Strength: ${studentCountByGrade[gradeName] || 0}`}
            icon={Users}
            description={`Incharge staff: ${teachersByGradeId[gradeName] || 'Unknown'}`}
            onClick={() => handleGradeClick(gradeName)}
            onSectionClick={handleSectionClick}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          />
        );
      })}
    </div>
  );
};