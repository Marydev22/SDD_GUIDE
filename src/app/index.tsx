import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  appendSubject,
  formatGrade,
  validateSubjectForm,
  type Subject,
  type SubjectFormErrors,
} from '../domain/subjects';
import { loadSubjects, saveSubjects } from '../storage/subjects-storage';

const colors = {
  background: '#e2e4e9',
  card: '#FFFFFF',
  text: '#111111',
  secondary: '#5a6e82',
  header: '#001F3F',
  primary: '#357ca5',
  border: '#b5bcb8',
};

export default function HomeScreen() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [errors, setErrors] = useState<SubjectFormErrors>({});
  const [storageError, setStorageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadSubjects()
      .then((storedSubjects) => {
        if (mounted) {
          setSubjects(storedSubjects);
        }
      })
      .catch(() => {
        if (mounted) {
          setStorageError('No se pudieron cargar las materias guardadas.');
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit() {
    const validationErrors = validateSubjectForm(name, grade, subjects);
    setErrors(validationErrors);
    setStorageError(null);
    if (validationErrors.name || validationErrors.grade || saving) {
      return;
    }

    const nextSubjects = appendSubject(subjects, { name, grade });
    setSaving(true);
    try {
      await saveSubjects(nextSubjects);
      setSubjects(nextSubjects);
      setName('');
      setGrade('');
      setErrors({});
    } catch {
      setStorageError('La materia no pudo guardarse. Intenta nuevamente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <TextInput
            accessibilityLabel="Nombre de la materia"
            placeholder="Nombre de la materia"
            placeholderTextColor={colors.secondary}
            value={name}
            onChangeText={setName}
            style={[styles.input, errors.name && styles.inputError]}
            editable={!saving}
          />
          {errors.name && (
            <TextMessage color={colors.card} testID="name-error">
              {errors.name}
            </TextMessage>
          )}
        </View>
        <View>
          <TextInput
            accessibilityLabel="Nota del primer bimestre"
            placeholder="Nota del primer bimestre"
            placeholderTextColor={colors.secondary}
            value={grade}
            onChangeText={setGrade}
            keyboardType="decimal-pad"
            style={[styles.input, errors.grade && styles.inputError]}
            editable={!saving}
          />
          {errors.grade && (
            <TextMessage color={colors.card} testID="grade-error">
              {errors.grade}
            </TextMessage>
          )}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Registrar materia"
          onPress={handleSubmit}
          disabled={saving || loading}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          {saving ? (
            <ActivityIndicator color={colors.card} />
          ) : (
            <TextMessage color={colors.card}>Registrar materia</TextMessage>
          )}
        </Pressable>
        {storageError && (
          <TextMessage color={colors.card} testID="storage-error">
            {storageError}
          </TextMessage>
        )}
      </View>

      {loading ? (
        <ActivityIndicator accessibilityLabel="Cargando materias" color={colors.primary} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {subjects.length === 0 ? (
            <TextMessage>No hay materias registradas.</TextMessage>
          ) : (
            subjects.map((subject) => (
              <View key={subject.id} style={styles.row}>
                <TextMessage>{subject.name}</TextMessage>
                <TextMessage>{formatGrade(subject.firstTermGrade)}</TextMessage>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function TextMessage({
  children,
  color = colors.text,
  ...props
}: { children: React.ReactNode; color?: string; testID?: string }) {
  return (
    <Text {...props} style={[styles.message, { color }]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.header,
    padding: 20,
    gap: 12,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: '#d33724',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 6,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  message: {
    fontSize: 14,
    padding: 0,
  },
  list: {
    gap: 10,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
