# Calculadora de Supletorio

App móvil para estudiantes de la EPN: registrar materias y las notas de
los dos bimestres, ver el estado académico y saber qué calificación necesitan en
el supletorio, proyecto didáctico construido con Spec-Driven Development (SDD).

## Stack y estructura

- Expo (plantilla por defecto de create-expo-app), TypeScript y Expo Router.
- Persistencia local con @react-native-async-storage/async-storage. Sin
  backend ni cuentas.
- src/domain/: lógica pura (sin React ni AsyncStorage), src/... persistencia.
  app/: pantallas. Pruebas junto a cada módulo, en __tests__/.

## Comandos

- Pruebas: npm test
- Tipo: npx tsc --noEmit
- Ejecutar la app: npx expo start (solo cuando yo lo pida)

## Dónde está cada cosa

- docs/constitution.md: principios del proyecto.
- docs/historias/: historias de usuario en Gherkin (la entrada de todo).
- specs/NNNN-nombre/: decisiones.md, spec.md, plan.md y tasks.md de cada historia.
- MEMORY.md: estado actual del trabajo.
- .github/skills/: método SDD, reglas académicas, paleta y convenciones.

## Cómo trabajar

1. Al empezar, lee MEMORY.md y docs/constitution.md.
2. Código y nombres en inglés; textos de interfaz, comentarios y documentos
   en español.
3. No tomes decisiones de producto o de diseño que la historia o decisiones.md
   no definan. Márcalas como [NECESITA ACLARACIÓN] y avísame.
4. Hazlo solo de la tarea que te pido. No avances a la siguiente.
5. En la lógica, escribe primero las pruebas.
6. Pregunta antes de instalar dependencias, crear archivos fuera del plan o
   cambiar el formato de los datos guardados.
7. No reemplaces archivos existentes si la tarea no lo pide. No guardes datos
   sensibles. No hagas commit.

## MEMORY.md

Solo tiene "Estado actual" y "Próximos pasos". Al terminar una fase o tarea
actualiza únicamente esas dos secciones. No copies decisiones ni contenido de
la spec. Mantenlo en unas 50 líneas.