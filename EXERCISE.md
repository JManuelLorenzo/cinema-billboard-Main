# Cartelera de Cine - Ejercicio Práctico

## 📝 Descripción General

¡Bienvenido al ejercicio de Cartelera de Cine! Completarás una aplicación de React Native que muestra y gestiona una colección de películas. Este ejercicio pondrá a prueba tus habilidades en integración de APIs, formateo de datos, renderizado de listas y manejo de formularios.

## 🎯 Objetivos de Aprendizaje

Al completar este ejercicio, podrás:

- Trabajar con APIs RESTful usando json-server
- Implementar obtención de datos con gestión de estado apropiada
- Formatear y transformar datos para su visualización
- Crear vistas de listas dinámicas con diferentes diseños
- Manejar envíos de formularios y peticiones POST a APIs
- Gestionar el estado de la aplicación de manera efectiva

---

## 📋 Requerimientos

### Requerimiento 1: Configurar JSON Server

Necesitas crear un servidor API local usando json-server que servirá los datos de las películas.

**Tareas:**

- Instalar json-server como dependencia de desarrollo en tu proyecto
- Configurar json-server para servir datos desde el archivo `data/data.json`
- Configurar el servidor para ejecutarse en el puerto 3000
- Agregar un script a tu package.json para iniciar fácilmente el servidor
- Verificar que los siguientes endpoints sean accesibles:
  - `/movies` - Retorna todas las películas
  - `/categories` - Retorna todas las categorías

**Prueba:** Deberías poder abrir tu navegador y navegar a `http://localhost3000/movies` y ver los datos de las películas.

---

### Requerimiento 2: Agregar información a Movie.jsx

Las películas contienen datos numéricos que necesitan ser formateados para una mejor experiencia de usuario.

#### Parte A: Visualización de Calificación

Cada película tiene una calificación de 0 a 10. Necesitas convertir esto a un sistema visual de estrellas (1-5 estrellas).

**Lógica de Conversión:**

- Calificación 0.0 - 1.9 → 1 estrella ⭐
- Calificación 2.0 - 3.9 → 2 estrellas ⭐⭐
- Calificación 4.0 - 5.9 → 3 estrellas ⭐⭐⭐
- Calificación 6.0 - 7.9 → 4 estrellas ⭐⭐⭐⭐
- Calificación 8.0 - 10.0 → 5 estrellas ⭐⭐⭐⭐⭐

**Tareas:**

- Crear una función utilitaria que convierta una calificación numérica a emojis de estrellas
- La función debe retornar un string conteniendo el número apropiado de emojis de estrellas
- Usar esta función en tu componente Movie para mostrar estrellas en lugar de números

**Ejemplo:** Una película con calificación 8.2 debería mostrar ⭐⭐⭐⭐⭐
utils/formatters.js Function: getRatingStars

#### Parte B: Visualización de Duración

Las duraciones de las películas están almacenadas en minutos. Necesitas formatearlas como horas y minutos.

**Reglas de Formato:**

- Si la duración tiene horas y minutos: "Xh Ymin"
- Si la duración es menor a 60 minutos: "Ymin"
- Usar solo números enteros (sin decimales)

**Tareas:**

- Crear una función utilitaria que convierta minutos al string formateado
- Manejar ambos casos (con horas y sin horas)
- Usar esta función en tu componente Movie para mostrar la duración formateada

**Ejemplos:**

- 68 minutos → "1h 8min"
- 142 minutos → "2h 22min"
- 45 minutos → "45min"
- 120 minutos → "2h 0min"

---

### Requerimiento 3: Obtener Datos de la API

Actualmente, la aplicación importa datos directamente del archivo JSON. Necesitas obtener los datos de tu API json-server en su lugar.

**Tareas:**

- Eliminar cualquier importación local del archivo data.json
- Crear variables de estado para almacenar películas y categorías
- Implementar una función async para obtener películas de la API
- Implementar una función async para obtener categorías de la API
- Usar useEffect para cargar datos cuando la aplicación inicia
- Manejar estados de carga (mostrar un mensaje de carga mientras se obtienen los datos)
- Manejar errores apropiadamente (usar bloques try/catch y registrar errores)
- Asegurar que la aplicación solo muestre contenido una vez que los datos hayan sido cargados

**Importante:** Asegúrate de que tanto películas como categorías sean obtenidas de la API, no de importaciones locales.

**Endpoints disponibles:**

- `http://localhost:3000/movies` - Obtiene todas las películas
- `http://localhost:3000/categories` - Obtiene todas las categorías
- `http://localhost:3000/movies?category=Romance` - Obtiene películas filtradas por categoría (ejemplo con Romance)

**Nota sobre filtrado:** json-server permite filtrar datos usando parámetros de query. Por ejemplo, si necesitas obtener solo películas de una categoría específica, puedes agregar `?category=NombreCategoria` al endpoint. Esto puede ser útil para optimizar las peticiones en lugar de filtrar en el cliente.

---

### Requerimiento 4: Implementar Vistas de Películas

La aplicación tiene un SegmentControl con dos opciones. Necesitas implementar vistas diferentes para cada opción.

#### Parte A: Vista de Todas las Películas

Cuando "All Movies" está seleccionado, mostrar todas las películas en una única lista vertical desplazable.

**Tareas:**

- Detectar cuando el primer segmento (índice 0) está seleccionado
- Renderizar todas las películas en un FlatList vertical
- Cada película debe mostrar toda su información (título, póster, descripción, estrellas, duración)
- La lista debe desplazarse verticalmente para mostrar todas las películas
- Aplicar espaciado y estilos apropiados

#### Parte B: Vista de Películas por Categoría

Cuando "Movies By Category" está seleccionado, mostrar películas agrupadas por sus categorías.

**Requisitos de Diseño:**

- Para cada categoría:
  - Mostrar el nombre de la categoría como encabezado/título
  - Mostrar películas de esa categoría en una lista horizontal desplazable
  - Las películas deben desplazarse horizontalmente dentro de su categoría
- La vista completa debe desplazarse verticalmente para mostrar todas las categorías
- Solo mostrar categorías que existan en el array de categorías de la API

**Tareas:**

- Detectar cuando el segundo segmento (índice 1) está seleccionado
- Obtener y usar categorías de la API
- Filtrar películas por categoría para cada sección
- Implementar un diseño con desplazamiento vertical para categorías y desplazamiento horizontal para películas
- Estilizar los encabezados de categorías para que sean claramente visibles
- Asegurar que las listas horizontales muestren múltiples películas una al lado de la otra

**Nota:** Cada categoría debe aparecer incluso si tiene películas, y las películas solo deben aparecer en su categoría correspondiente.

---

### Requerimiento 5: Completar Funcionalidad de Agregar Película

La aplicación tiene un modal para agregar películas, pero está incompleto. Necesitas terminar de implementar esta funcionalidad.

#### Parte A: Completar el Formulario

**Tareas:**

- Agregar campos de entrada para todas las propiedades de la película:
  - Título (texto)
  - URL del Póster (texto)
  - Descripción (texto multilínea)
  - Duración (número, en minutos)
  - Calificación (número, de 0 a 10)
  - Categoría (dropdown/picker)
- Implementar inputs controlados con gestión de estado apropiada
- **Importante:** El selector de categoría debe mostrar solo categorías de la API (obtenidas de `/categories`)
- Asegurar que el formulario sea desplazable si el teclado cubre los inputs
- Agregar un botón de Enviar y un botón de Cerrar/Cancelar
- Implementar validación del formulario:
  - Todos los campos deben estar llenos
  - La duración debe ser un número válido
  - La calificación debe ser un número válido entre 0 y 10
  - Mostrar una alerta si la validación falla
- Limpiar todos los campos del formulario después de un envío exitoso

#### Parte B: Enviar a la API y Refrescar

**Tareas:**

- Implementar una petición POST para agregar la nueva película a la API
- Enviar los datos de la película a `http://localhost:3000/movies`
- Usar headers apropiados (`Content-Type: application/json`)
- Convertir los datos del formulario a tipos apropiados (duración y calificación deben ser números)
- Manejar la respuesta de la API:
  - Si es exitoso: mostrar mensaje de éxito
  - Si falla: mostrar mensaje de error
- **Crítico:** Después de agregar exitosamente una película, volver a obtener las películas de la API para actualizar el estado de tu aplicación
- Cerrar el modal después del envío exitoso
- Manejar cualquier error con try/catch

**¿Por qué volver a obtener?** Cuando agregas una película, json-server le asigna un ID. Necesitas obtener la lista actualizada para conseguir los datos completos de la película incluyendo el ID asignado por el servidor.

---

## ✅ Lista de Verificación para Entrega

Antes de entregar tu trabajo, asegúrate de que:

- [x] El servidor JSON está configurado correctamente y se ejecuta sin errores
- [x] Las calificaciones de películas se muestran como estrellas (⭐) no como números
- [x] Las duraciones de películas están formateadas como "Xh Ymin" no solo minutos
- [x] La aplicación obtiene datos de la API (sin importaciones locales de data.json)
- [x] Se muestra el estado de carga mientras se obtienen los datos
- [x] La vista "All Movies" muestra todas las películas en una lista vertical
- [x] La vista "Movies By Category" muestra categorías con listas horizontales de películas
- [x] Las categorías son obtenidas de la API
- [x] El modal de agregar película tiene todos los campos de entrada requeridos
- [x] El selector de categoría solo muestra categorías de la API
- [x] La validación del formulario funciona (alerta en campos faltantes)
- [x] Las películas pueden agregarse exitosamente a través de la API
- [x] La lista de películas se actualiza automáticamente después de agregar una nueva película
- [x] No hay errores o advertencias en la consola
- [x] La aplicación maneja errores apropiadamente (no se cae)

---

## 💡 Consejos para el Éxito

1. **Trabaja incrementalmente:** Completa un requerimiento a la vez y prueba exhaustivamente antes de pasar al siguiente
2. **Mantén json-server ejecutándose:** Necesitarás dos ventanas de terminal - una para tu aplicación, una para json-server
3. **Revisa la consola:** Usa console.log() para depurar tu obtención de datos y transformaciones
4. **Prueba casos extremos:** ¿Qué pasa con una calificación de 0? ¿Una película de 180 minutos? ¿Un formulario vacío?
5. **Lee la documentación:** FlatList y fetch API tienen excelente documentación
6. **Haz preguntas:** Si estás atascado en un concepto (no pidiendo código), no dudes en preguntar

---

## 📚 Recursos Recomendados

- Documentación de React Native FlatList
- Repositorio de GitHub de JSON Server
- Documentación de JavaScript Fetch API
- Documentación de React Hooks (useState, useEffect)

---

¡Buena suerte! Recuerda, el objetivo es aprender y practicar. ¡Tómate tu tiempo y construye algo de lo que estés orgulloso! 🚀
