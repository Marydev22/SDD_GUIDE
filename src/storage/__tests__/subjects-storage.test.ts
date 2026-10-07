import AsyncStorage from '@react-native-async-storage/async-storage';

import { loadSubjects, saveSubjects, SUBJECTS_STORAGE_KEY } from '../subjects-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('subjects storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.restoreAllMocks();
  });

  it('loads an empty list when there is no saved value', async () => {
    await expect(loadSubjects()).resolves.toEqual([]);
  });

  it('persists and recovers subjects in their original order', async () => {
    const subjects = [
      { id: 'a', name: 'Primera', firstTermGrade: 10 },
      { id: 'b', name: 'Segunda', firstTermGrade: 20 },
    ];

    await saveSubjects(subjects);

    expect(await AsyncStorage.getItem(SUBJECTS_STORAGE_KEY)).toBe(JSON.stringify(subjects));
    await expect(loadSubjects()).resolves.toEqual(subjects);
  });

  it('propagates read and write errors', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('read failed'));
    await expect(loadSubjects()).rejects.toThrow('read failed');

    jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('write failed'));
    await expect(saveSubjects([])).rejects.toThrow('write failed');
  });
});
