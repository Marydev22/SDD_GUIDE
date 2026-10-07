# Plan — Spec 001: Registrar una materia

## Alcance

Implementar el registro de una materia con la nota del primer bimestre,
validación, prevención de duplicados, persistencia local y visualización de la
lista. No se implementan segundo bimestre, estados académicos, supletorio,
edición ni eliminación.

## Archivos y responsabilidades

### Crear

- `src/domain/subjects.ts`: tipos de dominio y funciones puras para normalizar
  nombres, validar y parsear notas, formatear notas, detectar duplicados y
  construir el nuevo registro. No importa React ni AsyncStorage. Cubre
  RF-001, RF-002, RF-003, RF-004, RF-005, RF-006 y RF-010.
- `src/domain/__tests__/subjects.test.ts`: pruebas Jest de la lógica pura,
  incluidos límites y mensajes/códigos de validación necesarios para que la
  interfaz seleccione el texto de cada campo. Cubre RF-001 a RF-006 y RF-010.
- `src/storage/subjects-storage.ts`: adaptador de persistencia sobre
  `@react-native-async-storage/async-storage`. Lee y escribe el arreglo de
  materias bajo una clave exclusiva de esta funcionalidad; propaga los errores
  de almacenamiento. Cubre RF-007 y RF-008.
- `src/storage/__tests__/subjects-storage.test.ts`: pruebas del adaptador con
  el mock estándar de AsyncStorage, verificando carga, escritura, orden y
  propagación de errores. Cubre RF-006, RF-007 y RF-008.
- `src/app/__tests__/index.test.tsx`: pruebas de interacción de la pantalla
  para registro válido, validaciones visibles, duplicado, limpieza tras éxito y
  conservación del formulario ante fallos. Cubre RF-001, RF-003, RF-004,
  RF-005, RF-008, RF-009 y RF-010.

### Modificar

- `src/app/index.tsx`: reemplazar la pantalla de ejemplo por la pantalla de
  registro; cargar las materias al iniciar, mostrar el formulario y la lista,
  coordinar la validación pura con el adaptador de almacenamiento y exponer
  errores junto al campo correspondiente o como error de conservación. Cubre
  RF-001 a RF-010.
- `src/app/_layout.tsx` o los componentes de tema existentes, únicamente si
  la pantalla necesita integrarse con la navegación/tema ya configurada; no
  alterar la navegación fuera del alcance. Cubre la presentación de RF-001,
  RF-002, RF-007 y RF-009.

## Modelo y funciones puras

El registro de dominio contiene un identificador estable, el nombre
normalizado que se muestra y la nota del primer bimestre como valor numérico
validado. El identificador es técnico y no se muestra al usuario. La
persistencia conserva el arreglo en orden de registro.

Funciones propuestas en `src/domain/subjects.ts`:

- `normalizeSubjectName(value)`: elimina espacios exteriores; conserva los
  espacios internos y el texto interno tal como fue escrito.
- `normalizeNameForComparison(value)`: deriva una clave de comparación sin
  distinguir mayúsculas/minúsculas.
- `parseFirstTermGrade(value)`: acepta entero o decimal con punto y hasta dos
  decimales después de recortar espacios; rechaza vacío, coma, no numérico,
  tercer decimal y valores fuera de 0.00–20.00.
- `formatGrade(value)`: produce exactamente dos decimales.
- `validateSubjectForm(name, grade, subjects)`: devuelve errores identificados
  por campo y no muta entradas.
- `appendSubject(subjects, input)`: valida la materia nueva, rechaza el nombre
  duplicado y devuelve una nueva lista con el registro al final.

Los mensajes visibles deben ser exactamente los de la spec para nombre,
nota y duplicado. El error de almacenamiento puede tener el texto claro
definido por la implementación porque la spec lo deja fuera de alcance, pero
debe indicar que la materia no pudo guardarse.

## Persistencia

Usar el AsyncStorage ya declarado en `package.json`, sin agregar dependencias.
El adaptador tendrá una clave propia y serializará/deserializará un arreglo
JSON de registros. La lectura de una clave ausente devuelve una lista vacía;
los errores de lectura o escritura se propagan a la pantalla, no se convierten
en una confirmación falsa. La escritura se realiza con la lista completa
resultante para conservar el orden y evitar duplicados.

Esta elección aplica la decisión 7 (fallo explícito), la decisión 6 (orden),
la decisión 8 (confirmación y formulario limpio solo después de persistir) y la
decisión 9 (conservación entre aperturas). No se cambia el formato existente
porque aún no hay datos de esta funcionalidad.

## Algoritmo

```text
al montar la pantalla:
  intentar cargar materias
  si falla:
    mostrar error de carga sin inventar materias registradas
  si funciona:
    mostrar materias en el orden recibido

al solicitar registrar:
  conservar los valores actuales del formulario
  validar nombre y nota
  si hay errores:
    mostrar cada mensaje junto a su campo
    no escribir y no limpiar el formulario
  si el nombre ya existe según comparación normalizada:
    mostrar aviso junto al nombre
    no escribir y no limpiar el formulario
  si es válido y nuevo:
    crear registro con nombre sin espacios exteriores y nota numérica
    construir la lista anterior + registro
    intentar guardar la lista completa
    si falla:
      mostrar error claro de conservación
      conservar formulario y lista anterior
    si funciona:
      mostrar la nueva lista inmediatamente
      limpiar nombre, nota y errores del formulario
```

## Interfaz

La pantalla principal mostrará un campo para nombre, un campo de nota con
teclado numérico apropiado, avisos específicos debajo o junto a cada campo,
un control para registrar y una lista de materias. Cada fila mostrará el
nombre y la nota con dos decimales, manteniendo el orden de registro. Los
textos de interfaz estarán en español y seguirán el estilo/tema existente.

La pantalla no mostrará como registrada una materia antes de que la escritura
termine correctamente. Mientras se carga o guarda, se debe impedir una
segunda solicitud equivalente sin borrar los datos; cualquier estado de carga
debe ser compatible con la pantalla y no cambiar los requisitos visibles.

## Decisiones técnicas y alternativas descartadas

- **Dominio puro separado:** se reutilizan funciones sin React ni
  AsyncStorage; se descarta validar dentro de los componentes porque impediría
  probar de forma determinista los bordes.
- **Comparación derivada:** se conserva el nombre normalizado para mostrar y
  se deriva una clave en cada comparación; se descarta comparar el texto
  original porque permitiría duplicados por mayúsculas o espacios.
- **Persistencia de lista completa en JSON:** se guarda un único arreglo
  ordenado con AsyncStorage; se descarta una clave por materia porque
  complicaría el orden y las escrituras atómicas de la operación.
- **Confirmación después de `setItem`:** la UI actualiza la lista y limpia el
  formulario solo después del éxito; se descarta actualizar primero y revertir
  después porque violaría RNF-002 y haría ambiguo un fallo.
- **Sin dependencia nueva:** se usan las dependencias existentes; se descarta
  incorporar una biblioteca de formularios/validación por el principio de
  simplicidad.

## Estrategia de pruebas con Jest

1. Probar primero el dominio en aislamiento: nombres vacíos y con espacios,
   normalización, duplicados, enteros, decimales válidos, `0.00`, `20.00`,
   espacios exteriores, coma, texto, negativos, valores mayores que 20 y
   `15.123`.
2. Probar que cada nota válida se formatea con exactamente dos decimales y
   que el registro nuevo queda al final.
3. Probar el adaptador con almacenamiento vacío, datos persistidos y errores
   de lectura/escritura.
4. Probar la pantalla con mocks del adaptador: carga inicial, alta válida,
   errores junto al campo, duplicado, fallo de conservación, limpieza solo
   tras éxito y conservación de valores.
5. Ejecutar `npx jest` para la suite dirigida y, antes de cerrar la spec,
   `npm test` como regresión del proyecto.

## Cobertura de requisitos

- RF-001: dominio, adaptador y pantalla.
- RF-002: `formatGrade`, almacenamiento/presentación y prueba de fila.
- RF-003/RF-004: validación pura y pruebas de mensajes en pantalla.
- RF-005: comparación pura y prueba de duplicado.
- RF-006: `appendSubject`, escritura de lista y prueba de orden.
- RF-007: adaptador y prueba de reapertura/carga.
- RF-008: propagación del error y prueba de que la lista/formulario no se
  confirman indebidamente.
- RF-009: actualización inmediata tras escritura exitosa y limpieza probada.
- RF-010: estado del formulario y pruebas de conservación de entradas.

