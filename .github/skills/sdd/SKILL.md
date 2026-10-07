---
name: sdd
description: Úsala siempre que trabajes con Spec-Driven Development en este proyecto (docs/constitution.md, docs/historias/ o cualquier archivo de specs/): redactar, 
revisar o cambiar specs, planes y tareas, o implementar
y validar tareas de una spec.
---

# Spec-Driven Development (SDD)

## Flujo y quién escribe qué
Constitución → grill-me → Spec → Plan y tareas → Implementación → Cambio.

| Fase | Quién | Escribe solo |
|---|---|---|
| Decisiones | skill grill-me | specs/NNN/decisiones.md |
| Spec | agente sdd-spec | specs/NNN/spec.md |
| Plan y tareas | agente sdd-plan | specs/NNN/plan.md y tasks.md |
| Implementación | agente sdd-implement | código, pruebas y la casilla de la tarea |

- Nunca pases a la siguiente fase sin la aprobación explícita del usuario.
- La spec manda: si algo no está en la spec, no se implementa.
- Si falta una decisión: al redactar la spec, márcala [NECESITA ACLARACIÓN];
  al planificar o implementar, para y pregunta.
- Un cambio de requisitos se hace primero en la spec, luego en el plan y las
  tareas, y por último en el código.
- Cada spec vive en specs/NNN-nombre/. decisiones.md lo genera grill-me; solo
  se le añade al final, numerada, una decisión que dicte el usuario para
  resolver una duda abierta.
- Al terminar una fase o tarea, actualiza en MEMORY.md solo "Estado actual" y
  "Próximos pasos" (indicando el siguiente agente). No copies decisiones ni
  contenido de la spec.

## Plantilla de spec (spec.md)

# Spec NNN — <Nombre>

Estado: borrador | aprobada | implementada
HU de origen: docs/historias/HU-00N.md

## Contexto y objetivo
## Usuarios
## Historias de usuario
## Definiciones (solo si hay términos que puedan interpretarse de varias formas)
## Requisitos funcionales
## Requisitos no funcionales
## Casos límite
## Fuera de alcance
## Criterios de finalización
## Dudas abiertas
- [NECESITA ACLARACIÓN] <duda>

La spec describe el QUÉ y el POR QUÉ. Nada de stack, arquitectura, formatos de
almacenamiento ni nombres de archivos. Un RF por comportamiento visible.

## Requisitos en EARS (en español)
- RF-x: CUANDO <evento>, EL SISTEMA <respuesta>.
- RF-x: SI <condición no deseada>, ENTONCES EL SISTEMA <respuesta>.
- RF-x: MIENTRAS <estado>, EL SISTEMA <respuesta>.
- RF-x: EL SISTEMA <comportamiento permanente>.

Cada RF debe ser verificable y terminar con "Origen:", indicando el escenario
de la HU o la decisión de decisiones.md de la que sale. Cada escenario de la
HU debe quedar cubierto por al menos un RF.

## Revisión final de la spec
Al terminar spec.md, lista sin proponer soluciones: contradicciones entre RF,
escenarios de la HU sin RF y conflictos con docs/constitution.md. Máximo 10
puntos.

## Plan (plan.md)
Archivos y responsabilidades · Funciones puras · Persistencia ·
Algoritmo en pseudocódigo · Interfaz · Decisiones justificadas con su
alternativa descartada · Estrategia de pruebas con Jest. Indica qué RF cubre
cada parte.

## Tareas (tasks.md)

- [ ] **Tn. <Descripción>.** RF-x, RF-y
  - Hecho cuando: <comprobación verificable>.

Máximo 20-30 min por tarea, en orden de dependencia. Si salen más de 10,
propón dividir la spec.

## Implementación
Una sola tarea cada vez: pruebas primero (en rojo), después el código, npx jest
en verde, marcar la tarea y parar. Si la tarea toca la interfaz, entrega la
lista manual de verificación y espera a que el usuario confirme que la probó
en Expo Go antes de marcarla como hecha.

Al cerrar la tarea, lista qué escenarios de la HU quedan cubiertos por pruebas
y cuáles no. Informa; no declares que algo "está correcto".