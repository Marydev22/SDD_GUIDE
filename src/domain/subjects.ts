export type Subject = {
  id: string;
  name: string;
  firstTermGrade: number;
};

export type SubjectFormInput = {
  name: string;
  grade: string;
};

export type SubjectFormErrors = {
  name?: string;
  grade?: string;
};

export const SUBJECT_NAME_REQUIRED = 'Escribe el nombre de la materia.';
export const GRADE_INVALID = 'Escribe una nota entre 0 y 20 con hasta dos decimales.';
export const SUBJECT_DUPLICATE = 'Ya tienes una materia con ese nombre.';

export function normalizeSubjectName(value: string): string {
  return value.trim();
}

export function normalizeNameForComparison(value: string): string {
  return normalizeSubjectName(value).toLocaleLowerCase();
}

export function parseFirstTermGrade(value: string): number | null {
  const trimmed = value.trim();
  if (!/^(?:\d+)(?:\.\d{1,2})?$/.test(trimmed)) {
    return null;
  }

  const grade = Number(trimmed);
  return grade >= 0 && grade <= 20 ? grade : null;
}

export function formatGrade(value: number): string {
  return value.toFixed(2);
}

export function validateSubjectForm(
  name: string,
  grade: string,
  subjects: Subject[],
): SubjectFormErrors {
  const errors: SubjectFormErrors = {};
  const normalizedName = normalizeSubjectName(name);

  if (!normalizedName) {
    errors.name = SUBJECT_NAME_REQUIRED;
  } else if (
    subjects.some(
      (subject) => normalizeNameForComparison(subject.name) === normalizeNameForComparison(name),
    )
  ) {
    errors.name = SUBJECT_DUPLICATE;
  }

  if (parseFirstTermGrade(grade) === null) {
    errors.grade = GRADE_INVALID;
  }

  return errors;
}

export function appendSubject(subjects: Subject[], input: SubjectFormInput): Subject[] {
  const errors = validateSubjectForm(input.name, input.grade, subjects);
  if (errors.name) {
    throw new Error(errors.name);
  }
  if (errors.grade) {
    throw new Error(errors.grade);
  }

  const grade = parseFirstTermGrade(input.grade);
  if (grade === null) {
    throw new Error(GRADE_INVALID);
  }

  const name = normalizeSubjectName(input.name);
  return [...subjects, { id: normalizeNameForComparison(name), name, firstTermGrade: grade }];
}
