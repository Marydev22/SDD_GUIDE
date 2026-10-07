import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Subject } from '../domain/subjects';

export const SUBJECTS_STORAGE_KEY = '@calculadora_epn/subjects';

export async function loadSubjects(): Promise<Subject[]> {
  const stored = await AsyncStorage.getItem(SUBJECTS_STORAGE_KEY);
  if (stored === null) {
    return [];
  }
  return JSON.parse(stored) as Subject[];
}

export async function saveSubjects(subjects: Subject[]): Promise<void> {
  await AsyncStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects));
}
