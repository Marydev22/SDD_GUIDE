import {
  appendSubject,
  formatGrade,
  normalizeNameForComparison,
  normalizeSubjectName,
  parseFirstTermGrade,
  validateSubjectForm,
} from '../subjects';

describe('subjects domain', () => {
  const existing = [
    { id: 'matematicas', name: 'Matemáticas', firstTermGrade: 18 },
  ];

  it('normalizes names for display and comparison without changing internal spaces', () => {
    expect(normalizeSubjectName('  Física  1  ')).toBe('Física  1');
    expect(normalizeNameForComparison('  FÍSICA  1  ')).toBe('física  1');
  });

  it.each([
    ['0.00', 0],
    ['20.00', 20],
    ['17', 17],
    ['17.5', 17.5],
    [' 17.50 ', 17.5],
  ])('accepts valid grade %s', (input, expected) => {
    expect(parseFirstTermGrade(input)).toBe(expected);
  });

  it.each(['', '   ', '15,50', 'abc', '15.123', '-1', '20.01', '21'])(
    'rejects invalid grade %s',
    (input) => {
      expect(parseFirstTermGrade(input)).toBeNull();
    },
  );

  it.each([
    [0, '0.00'],
    [17, '17.00'],
    [17.5, '17.50'],
    [20, '20.00'],
  ])('formats grade %s as %s', (input, expected) => {
    expect(formatGrade(input)).toBe(expected);
  });

  it('reports empty fields and keeps validation field-specific', () => {
    expect(validateSubjectForm('   ', '', [])).toEqual({
      name: 'Escribe el nombre de la materia.',
      grade: 'Escribe una nota entre 0 y 20 con hasta dos decimales.',
    });
  });

  it('reports invalid grades and duplicate names', () => {
    expect(validateSubjectForm('Nueva', '15.123', existing)).toEqual({
      grade: 'Escribe una nota entre 0 y 20 con hasta dos decimales.',
    });
    expect(validateSubjectForm('  MATEMÁTICAS ', '18', existing)).toEqual({
      name: 'Ya tienes una materia con ese nombre.',
    });
  });

  it('does not mutate the list and appends a valid subject at the end', () => {
    const result = appendSubject(existing, { name: '  Física 1 ', grade: '17.5' });

    expect(result).toEqual([
      existing[0],
      { id: 'física 1', name: 'Física 1', firstTermGrade: 17.5 },
    ]);
    expect(existing).toHaveLength(1);
  });

  it('rejects duplicates without mutating the list', () => {
    expect(() => appendSubject(existing, { name: ' matemáticas ', grade: '19' })).toThrow(
      'Ya tienes una materia con ese nombre.',
    );
    expect(existing).toHaveLength(1);
  });
});
