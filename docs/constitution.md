# Constitución – Calculadora de Supletorio

Principios innegociables. Toda spec, plan y tarea debe cumplirlos.

1. Simplicidad primero: no se añaden dependencias nuevas sin aprobación.
2. La spec manda: nada se implementa si no está en la spec activa. Si falta una decisión, se para y se pregunta.
3. Lógica separada de interfaz: las reglas de notas viven en funciones puras, sin React ni almacenamiento.
4. Pruebas como puerta: la lógica se prueba con Jest. Prohibido avanzar con pruebas en rojo. La interfaz se verifica con la lista manual de la tarea.
5. Los datos del usuario son sagrados: lo guardado se conserva ante cambios de código y eliminar siempre pide confirmación.
6. Exactitud numérica: los cálculos con notas deben dar el estado correcto en los bordes de las reglas de negocio. Cómo se logra se decide y se justifica.