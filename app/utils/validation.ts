import logger from '../utils/logger';

export const validateTeacherId = (teacherId?: string): string | null => {
  if (!teacherId || teacherId.trim() === '' || teacherId === undefined) {
    logger.error('Teacher ID is missing or empty in the request parameters');
    return 'Teacher ID is required';
  }

  if (/^[^A-Za-z0-9]+$/.test(teacherId)) {
    logger.error('Teacher ID contains only special characters');
    return 'Teacher ID must contain at least one letter or number';
  }
  return null;
};
