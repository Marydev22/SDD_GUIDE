---
name: rn-conventions
description: Úsala siempre que crees o modifiques pantallas, formularios o
componentes de interfaz de la Calculadora de Supletorio.
---

# Convenciones de interfaz en React Native

- Estilos con StyleSheet. Sin librerías de interfaz adicionales.
- Evitar diseños genéricos.
- Campos de nota: teclado numérico decimal (keyboardType="decimal-pad"). Según
  el idioma del teléfono, ese teclado puede escribir como punto o como
  separador decimal.
- Los formularios no deben quedar tapados por el teclado. Usa un contenedor
  que se desplace o ajuste, y permite tocar botones con el teclado abierto.
- Respeta las áreas seguras del dispositivo (muesca y barras del sistema).
- Listas con FlatList y una clave estable por elemento (el id de la materia,
  nunca el índice).
- Objetivos táctiles de al menos 44x44 puntos. Etiquetas de accesibilidad en
  botones e iconos.
- Eliminar siempre pide confirmación con un diálogo del sistema.
- Todos los textos visibles en español.

## Lista manual de verificación en Expo Go
- [ ] Se ve bien en vertical y al girar el teléfono.
- [ ] El teclado no tapa el campo ni el botón que se está usando.
- [ ] La nota se escribe con el separador que ofrece el teléfono y se comporta como dice la spec.
- [ ] Cerrar la app por completo y abrirla conserva los datos.
- [ ] Los textos de estado se leen sin depender del color.