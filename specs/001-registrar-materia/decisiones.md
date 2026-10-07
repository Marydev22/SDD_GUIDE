# Decisiones — HU-001: Registrar una materia

## 1. Rango válido de la nota

**Pregunta:** ¿Qué rango debe aceptarse para la nota del primer bimestre?

**Respuesta:** Se aceptan notas desde `0.00` hasta `20.00`, incluidos ambos extremos. Las notas fuera de ese rango no se guardan.

**Motivo:** La escala de calificación definida para la aplicación es de 0.00 a 20.00 y los extremos son casos válidos de la regla.

## 2. Precisión y formato de la nota

**Pregunta:** ¿Qué formatos y precisión debe aceptar la aplicación?

**Respuesta:** Se aceptan números enteros y números con hasta dos decimales, usando punto como separador decimal; por ejemplo, `17`, `17.5` y `17.50`. Se rechazan notas con más de dos decimales, con coma como separador o con formatos no numéricos. La nota se muestra con dos decimales.

**Motivo:** Limitar la precisión evita ambigüedades y mantiene una presentación uniforme de las calificaciones.

## 3. Identificación de materias repetidas

**Pregunta:** ¿Cuándo debe considerarse que una materia ya está registrada?

**Respuesta:** Los nombres se comparan sin distinguir mayúsculas de minúsculas y sin considerar los espacios al inicio o al final. Por tanto, `Matemática`, `matemática` y `  Matemática  ` representan la misma materia. Si ya existe, se conserva el primer registro y no se crea otro.

**Motivo:** Evita duplicados que solo difieren en la forma de escribir el nombre.

## 4. Validación y normalización del nombre

**Pregunta:** ¿Cómo deben tratarse los nombres vacíos o con espacios exteriores?

**Respuesta:** Un nombre compuesto únicamente por espacios es inválido. Antes de guardar, se eliminan los espacios al inicio y al final; el texto interno se conserva tal como fue escrito.

**Motivo:** Impide registrar materias sin nombre y evita que los espacios exteriores creen diferencias artificiales.

## 5. Corrección de datos inválidos

**Pregunta:** ¿Cómo debe responder la aplicación cuando encuentra datos inválidos o incompletos?

**Respuesta:** Debe mostrar un mensaje específico junto al campo que necesita corrección, no guardar la materia y conservar los demás datos que el estudiante ya ingresó.

**Motivo:** El estudiante puede identificar y corregir el problema sin perder información válida del formulario.

## 6. Orden de la lista

**Pregunta:** ¿En qué orden deben mostrarse las materias?

**Respuesta:** Las materias se muestran en el mismo orden en que fueron registradas; cada materia nueva se agrega al final de la lista.

**Motivo:** Mantiene un orden predecible sin introducir una clasificación no definida por la historia.

## 7. Fallo del almacenamiento local

**Pregunta:** ¿Qué debe ocurrir si la aplicación no puede guardar la materia en el almacenamiento local?

**Respuesta:** Debe mostrar un error claro indicando que la materia no pudo guardarse, no mostrarla como registrada y conservar los datos del formulario para permitir un nuevo intento.

**Motivo:** Evita confirmar falsamente una operación y evita que el estudiante pierda los datos ingresados.

## 8. Estado del formulario después de guardar

**Pregunta:** ¿Qué debe ocurrir después de guardar correctamente una materia?

**Respuesta:** La materia aparece inmediatamente en la lista, su nota se muestra con dos decimales y el formulario queda limpio para registrar otra materia.

**Motivo:** Confirma visualmente el registro y prepara la pantalla para la siguiente operación sin riesgo de reutilizar accidentalmente los datos anteriores.

## 9. Conservación al reabrir la aplicación

**Pregunta:** ¿Qué datos deben conservarse al cerrar y volver a abrir la aplicación?

**Respuesta:** La materia registrada debe seguir en la lista con su nombre y nota.

**Motivo:** La historia exige persistencia de los datos registrados entre sesiones de uso.

## 10. Textos de validación

**Pregunta:** ¿Qué textos debe mostrar la aplicación para los datos incompletos o inválidos?

**Respuesta:** Para un nombre vacío, debe mostrar «Escribe el nombre de la materia.». Para una nota vacía o inválida, debe mostrar «Escribe una nota entre 0 y 20 con hasta dos decimales.». Para una materia duplicada, debe mostrar «Ya tienes una materia con ese nombre.».

**Motivo:** Los mensajes concretos indican al estudiante cómo corregir cada dato.

## 11. Ubicación del aviso de materia duplicada

**Pregunta:** ¿Dónde debe mostrarse el aviso de materia duplicada?

**Respuesta:** El aviso de materia duplicada debe aparecer junto al campo del nombre, igual que el aviso de nombre vacío.

**Motivo:** Ambos avisos se refieren al valor del nombre y deben mantenerse asociados al campo que necesita corrección.

## 12. Espacios y separador decimal de la nota

**Pregunta:** ¿Cómo deben tratarse los espacios exteriores y la coma en la nota?

**Respuesta:** Se ignoran los espacios al inicio y al final de la nota. La coma como separador decimal se rechaza y muestra el mismo mensaje de nota inválida.

**Motivo:** Permitir espacios exteriores evita errores accidentales, mientras que exigir el punto como separador mantiene un formato único para la nota.
