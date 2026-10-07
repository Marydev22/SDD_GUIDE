# Spec 001 — Registrar una materia

Estado: aprobada
HU de origen: docs/historias/HU-001.md

## Contexto y objetivo

La estudiante necesita registrar una materia nueva con la nota de su primer
bimestre para conservarla y completarla cuando esté disponible la nota del
segundo bimestre. La funcionalidad debe validar los datos, evitar duplicados,
mostrar el registro y conservarlo entre aperturas de la aplicación.

## Usuarios

- Estudiante que registra y consulta sus materias.

## Historias de usuario

Como estudiante, quiero guardar una materia con la nota de mi primer bimestre,
para tenerla registrada y completarla cuando salga la del segundo.

## Definiciones

- **Nombre normalizado:** nombre sin espacios al inicio ni al final. El texto
  interno conserva exactamente lo escrito.
- **Materia repetida:** nombre cuyo valor normalizado coincide con el de una
  materia ya registrada sin distinguir mayúsculas de minúsculas.
- **Nota válida:** número entre 0.00 y 20.00, incluidos ambos extremos, escrito
  como entero o con hasta dos decimales usando punto como separador.

## Requisitos funcionales

- **RF-001: CUANDO la estudiante ingresa un nombre válido y una nota válida de
  primer bimestre y solicita registrar la materia, EL SISTEMA guarda la
  materia y la muestra en la lista.** Origen: escenario «Guardar una materia»
  de HU-001.

- **RF-002: CUANDO una materia se muestra en la lista, EL SISTEMA muestra su
  nota del primer bimestre con exactamente dos decimales.** Origen: decisión 2
  de decisiones.md y decisión 8 de decisiones.md.

- **RF-003: SI el nombre está vacío, contiene únicamente espacios, o la nota
  está vacía, ENTONCES EL SISTEMA muestra «Escribe el nombre de la materia.»
  junto al campo del nombre cuando el nombre está vacío o contiene únicamente
  espacios, muestra «Escribe una nota entre 0 y 20 con hasta dos decimales.»
  junto al campo de la nota cuando está vacía, no guarda la materia y conserva
  los demás datos ingresados.** Origen: escenario «Datos incompletos o
  inválidos» de HU-001 y decisiones 4, 5 y 10 de decisiones.md.

- **RF-004: SI la nota no es numérica, usa coma como separador, tiene más de dos
  decimales, es menor que 0.00 o es mayor que 20.00, ENTONCES EL SISTEMA ignora
  los espacios al inicio y al final, rechaza la coma como separador y muestra
  «Escribe una nota entre 0 y 20 con hasta dos decimales.» junto al campo de
  nota, no guarda la materia y conserva los demás datos ingresados.** Origen:
  escenario «Datos incompletos o inválidos» de HU-001 y decisiones 1, 2, 5 y
  12 de decisiones.md.

- **RF-005: CUANDO la estudiante solicita registrar una materia cuyo nombre
  coincide, sin distinguir mayúsculas de minúsculas ni espacios exteriores, con
  una materia ya registrada, EL SISTEMA muestra «Ya tienes una materia con ese
  nombre.» junto al campo del nombre, conserva el primer registro y no crea un
  duplicado.** Origen: escenario «Materia repetida» de HU-001 y decisiones 3 y
  11 de decisiones.md.

- **RF-006: CUANDO la estudiante solicita registrar una materia nueva y válida,
  EL SISTEMA la agrega al final de la lista, después de las materias
  registradas anteriormente.** Origen: decisión 6 de decisiones.md.

- **RF-007: CUANDO la estudiante cierra y vuelve a abrir la aplicación, EL
  SISTEMA muestra en la lista cada materia registrada previamente con su nombre
  y nota del primer bimestre.** Origen: escenario «Conservar mis datos» de
  HU-001 y decisión 9 de decisiones.md.

- **RF-008: SI el sistema no puede conservar una materia registrada, ENTONCES EL
  SISTEMA muestra un error claro indicando que la materia no pudo guardarse, no
  la muestra como registrada y conserva los datos del formulario para permitir
  un nuevo intento.** Origen: decisión 7 de decisiones.md.

- **RF-009: CUANDO una materia se guarda correctamente, EL SISTEMA la muestra
  inmediatamente en la lista y deja el formulario limpio para registrar otra
  materia.** Origen: decisión 8 de decisiones.md.

- **RF-010: CUANDO la estudiante intenta registrar una materia, EL SISTEMA
  conserva los datos válidos del formulario mientras exista un dato inválido o
  incompleto.** Origen: decisión 5 de decisiones.md.

## Requisitos no funcionales

- **RNF-001:** Las validaciones y comparaciones de notas deben producir el mismo
  resultado en los límites 0.00 y 20.00 y no aceptar valores con más de dos
  decimales.
- **RNF-002:** La aplicación no debe confirmar visualmente una materia como
  registrada si su conservación no fue exitosa.
- **RNF-003:** Los mensajes de validación deben identificar el campo que requiere
  corrección.

## Casos límite

- Se acepta la nota `0.00`.
- Se acepta la nota `20.00`.
- Se aceptan `17`, `17.5` y `17.50`, y se muestran como `17.00`, `17.50` y
  `17.50`, respectivamente.
- Se rechaza una nota con tercer decimal, por ejemplo `15.123`.
- Se ignoran los espacios al inicio y al final de la nota.
- Se rechazan notas con coma decimal, como `15,50`, y entradas no numéricas.
- Se rechazan notas negativas y mayores que `20.00`.
- Un nombre compuesto solo por espacios se rechaza.
- Los nombres con espacios exteriores se normalizan antes de guardarse y no
  generan diferencias artificiales.
- Las diferencias de mayúsculas y minúsculas, o de espacios exteriores, no
  generan materias duplicadas.
- Si falla la conservación, la materia no aparece como registrada y el
  formulario conserva sus datos.

## Fuera de alcance

- Registrar la nota del segundo bimestre.
- Calcular suma de bimestres, estado académico o calificación requerida de
  supletorio.
- Modificar o eliminar materias registradas.
- Definir el texto literal del error de conservación.

## Criterios de finalización

- Los cuatro escenarios de HU-001 están cubiertos por RF-001, RF-003, RF-004,
  RF-005, RF-007, RF-008 y RF-009.
- Las nueve decisiones aprobadas de decisiones.md están reflejadas en los
  requisitos o casos límite.
- Las notas válidas se limitan a 0.00–20.00, admiten hasta dos decimales y se
  muestran con dos decimales.
- Los datos incompletos, inválidos, repetidos y los fallos de conservación no
  generan un registro confirmado.
- Una materia conservada vuelve a mostrarse con su nombre y nota al reabrir la
  aplicación.
- La spec recibe aprobación explícita antes de pasar a planificación.
