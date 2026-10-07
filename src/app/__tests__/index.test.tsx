import { act, create } from 'react-test-renderer';

import HomeScreen from '../index';
import { loadSubjects, saveSubjects } from '../../storage/subjects-storage';

jest.mock('../../storage/subjects-storage', () => ({
  loadSubjects: jest.fn(),
  saveSubjects: jest.fn(),
}));

const mockedLoadSubjects = jest.mocked(loadSubjects);
const mockedSaveSubjects = jest.mocked(saveSubjects);

async function renderScreen() {
  let renderer!: ReturnType<typeof create>;
  await act(async () => {
    renderer = create(<HomeScreen />);
    await Promise.resolve();
    await Promise.resolve();
  });
  return renderer;
}

describe('HomeScreen', () => {
  beforeEach(() => {
    mockedLoadSubjects.mockResolvedValue([]);
    mockedSaveSubjects.mockResolvedValue();
  });

  it('loads and displays previously saved subjects', async () => {
    mockedLoadSubjects.mockResolvedValue([
      { id: 'fisica', name: 'Física', firstTermGrade: 17.5 },
    ]);

    const screen = await renderScreen();

    expect(screen.root.findAllByProps({ children: 'Física' }).length).toBeGreaterThan(0);
    expect(screen.root.findAllByProps({ children: '17.50' }).length).toBeGreaterThan(0);
  });

  it('shows validation messages and preserves form values', async () => {
    const screen = await renderScreen();
    const nameInput = screen.root.findByProps({ accessibilityLabel: 'Nombre de la materia' });
    const gradeInput = screen.root.findByProps({ accessibilityLabel: 'Nota del primer bimestre' });
    const submit = screen.root.findByProps({ accessibilityLabel: 'Registrar materia' });

    await act(async () => {
      nameInput.props.onChangeText('   ');
      gradeInput.props.onChangeText('15.123');
      submit.props.onPress();
    });

    expect(screen.root.findByProps({ testID: 'name-error' })).toBeDefined();
    expect(screen.root.findByProps({ testID: 'grade-error' })).toBeDefined();
    expect(nameInput.props.value).toBe('   ');
    expect(gradeInput.props.value).toBe('15.123');
    expect(mockedSaveSubjects).not.toHaveBeenCalled();
  });

  it('adds and clears the form only after persistence succeeds', async () => {
    const screen = await renderScreen();
    const nameInput = screen.root.findByProps({ accessibilityLabel: 'Nombre de la materia' });
    const gradeInput = screen.root.findByProps({ accessibilityLabel: 'Nota del primer bimestre' });
    const submit = screen.root.findByProps({ accessibilityLabel: 'Registrar materia' });

    await act(async () => {
      nameInput.props.onChangeText('Química');
      gradeInput.props.onChangeText('18');
    });
    await act(async () => {
      await submit.props.onPress();
    });

    expect(mockedSaveSubjects).toHaveBeenCalledWith([
      { id: 'química', name: 'Química', firstTermGrade: 18 },
    ]);
    expect(nameInput.props.value).toBe('');
    expect(gradeInput.props.value).toBe('');
    expect(screen.root.findAllByProps({ children: '18.00' }).length).toBeGreaterThan(0);
  });

  it('keeps the form and list unchanged when persistence fails', async () => {
    mockedSaveSubjects.mockRejectedValueOnce(new Error('write failed'));
    const screen = await renderScreen();
    const nameInput = screen.root.findByProps({ accessibilityLabel: 'Nombre de la materia' });
    const gradeInput = screen.root.findByProps({ accessibilityLabel: 'Nota del primer bimestre' });
    const submit = screen.root.findByProps({ accessibilityLabel: 'Registrar materia' });

    await act(async () => {
      nameInput.props.onChangeText('Biología');
      gradeInput.props.onChangeText('19');
    });
    await act(async () => {
      await submit.props.onPress();
    });

    expect(nameInput.props.value).toBe('Biología');
    expect(gradeInput.props.value).toBe('19');
    expect(screen.root.findByProps({ testID: 'storage-error' })).toBeDefined();
    expect(screen.root.findAllByProps({ children: 'Biología' })).toHaveLength(0);
  });
});
