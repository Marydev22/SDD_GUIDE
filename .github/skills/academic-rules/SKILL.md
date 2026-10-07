---
name: academic-rules
description: Úsala siempre que escribas, modifiques o revises código o textos que calculen o muestren notas, sumas de bimestres, estados académicos o la calificación requerida en el superlativo.
---

# Reglas académicas de la Calculadora de Supletorio

## Reglas

- Cada bimestre se califica sobre 20 y admite hasta dos decimales
  (0.00 a 20.00).
- La suma de los dos bimestres es sobre 40.
- Estado: suma < 18 Reprobado (no hay supletorio); 18 <= suma < 28 Supletorio
  (de 18.00 a 27.99); suma >= 28 Aprobado. No uses 17.99 ni 27.99 como
  límites: dejarían sumas sin estado.
- El supletorio es sobre 40. Calificación requerida = el mayor entre 24 y
  (48 - suma). Solo existe cuando el estado es Supletorio.
- Quien saca la requerida aprueba. La app solo informa; no guarda la nota del
  supletorio.

## Exactitud numérica

- Los bordes de las reglas deben dar siempre el estado correcto. La forma de
  representar, validar y comparar las notas la decide la spec, no el agente.
- Rechaza más de dos decimales, valores negativos y valores mayores a 20.

## Checklist de revisión

- [ ] ¿Se prueban los bordes 17.99, 18.00, 27.99 y 28.00?
- [ ] ¿Se prueban 24.00 y 24.01 en la calificación requerida?
- [ ] ¿Se prueban 0.00, 20.00 y un tercer decimal (15.123)?
- [ ] ¿Los bordes dan el estado correcto, sin errores de redondeo?
- [ ] ¿Los mensajes son exactamente los de la spec?

## Al terminar

Indica qué puntos del checklist has comprobado y cómo.