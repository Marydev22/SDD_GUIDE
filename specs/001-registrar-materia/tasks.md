# Tareas — Spec 001: Registrar una materia

- [x] **T1. Definir el modelo y las funciones puras de normalización y formato de materias.** RF-001, RF-002, RF-005, RF-006
  - Hecho cuando: verificable: `src/domain/subjects.ts` exporta el tipo de materia, normaliza nombres para mostrar/comparar, conserva espacios internos y formatea una nota con exactamente dos decimales; sus pruebas base pasan con `npx jest src/domain/__tests__/subjects.test.ts`.

- [x] **T2. Implementar primero las pruebas de validación de nombre, nota y duplicados.** RF-003, RF-004, RF-005, RF-010
  - Hecho cuando: verificable: `src/domain/__tests__/subjects.test.ts` falla antes de la implementación y queda en verde después, cubriendo vacío, espacios, coma, texto, tercer decimal `15.123`, negativos, mayores que 20, `0.00`, `20.00` y duplicados por mayúsculas/espacios.

- [x] **T3. Implementar la validación y el agregado ordenado en el dominio.** RF-001, RF-003, RF-004, RF-005, RF-006, RF-010
  - Hecho cuando: verificable: `validateSubjectForm` y `appendSubject` rechazan entradas inválidas o repetidas sin mutar la lista, y agregan una materia válida al final; `npx jest src/domain/__tests__/subjects.test.ts` queda en verde.

- [x] **T4. Implementar el adaptador de AsyncStorage y sus pruebas de contrato.** RF-006, RF-007, RF-008
  - Hecho cuando: verificable: `src/storage/subjects-storage.ts` carga una lista vacía si no existe clave, persiste/recupera JSON en orden y propaga errores de lectura/escritura; `npx jest src/storage/__tests__/subjects-storage.test.ts` queda en verde.

- [x] **T5. Sustituir la pantalla de ejemplo por el formulario y la lista de materias.** RF-001, RF-002, RF-006, RF-007, RF-009
  - Hecho cuando: verificable: la pantalla contiene campos de nombre y nota, acción de registro y lista ordenada; cada fila muestra la nota con dos decimales y la carga inicial usa el adaptador.

- [x] **T6. Conectar validación, duplicados, persistencia y estados de error en la pantalla.** RF-003, RF-004, RF-005, RF-008, RF-010
  - Hecho cuando: verificable: la pantalla muestra los tres mensajes literales junto al campo correspondiente, no agrega entradas inválidas/repetidas, conserva los valores del formulario ante error de validación o almacenamiento y no confirma una escritura fallida.

- [x] **T7. Completar la confirmación de éxito y las pruebas de interacción.** RF-001, RF-007, RF-008, RF-009, RF-010
  - Hecho cuando: verificable: tras `setItem` exitoso la materia aparece inmediatamente y el formulario queda limpio; `src/app/__tests__/index.test.tsx` verifica carga, alta, duplicado, fallos y reapertura con `npx jest`.

- [x] **T8. Verificar integración y criterios manuales de interfaz.** RF-001, RF-002, RF-003, RF-004, RF-005, RF-006, RF-007, RF-008, RF-009, RF-010
  - Hecho cuando: verificable: `npm test` y `npx tsc --noEmit` pasan; en Expo Go se comprueba la lista vacía inicial, alta con `0.00` y `20.00`, nota `15.123`, coma, duplicado, orden, cierre/reapertura y que un fallo de almacenamiento no presenta la materia como registrada.
