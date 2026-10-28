# Explicación del portfolio de Ezequiel Fontana

Este documento explica el portfolio en un lenguaje sencillo para poder comprenderlo y presentarlo. La descripción se basa en los archivos del proyecto. Cuando el código no dice explícitamente por qué se eligió algo, se explica su función y el efecto que produce, sin afirmar que esa haya sido necesariamente la intención original.

## 1. Resumen general

### ¿Qué es este proyecto?

Es un sitio web personal de una sola página. Presenta el perfil de Ezequiel, su formación, algunas tecnologías que conoce, dos proyectos y una manera de contactarlo. Como toda la información está distribuida en secciones dentro de la misma página, se puede navegar usando enlaces que desplazan a la sección correspondiente.

Es un sitio estático: el proyecto no contiene un servidor, una base de datos ni un sistema de construcción. El navegador recibe los archivos y muestra la página. El formulario tiene validación e interacciones, pero no envía los mensajes a ningún lugar.

### Tecnologías utilizadas

- **HTML**: define la estructura y el contenido: títulos, párrafos, listas, imágenes, enlaces, proyectos y campos del formulario. También se usan etiquetas que describen la función del contenido, como `header`, `nav`, `main`, `section`, `article` y `footer`.
- **CSS**: controla la presentación visual: colores, tipografías, tamaños, espacios, cuadrículas, botones y adaptación a distintos tamaños de pantalla.
- **JavaScript**: agrega interacciones sin recargar la página. Controla el menú móvil, el filtro de proyectos, las miniaturas, el contador del mensaje, la validación del formulario y el año del pie.
- **Google Fonts**: proporciona las fuentes Manrope y DM Mono. El CSS incluye alternativas genéricas por si no se pueden cargar las fuentes externas.
- **Git y GitHub**: Git y GitHub se mencionan como herramientas en la lista de habilidades. Además, los proyectos tienen enlaces a repositorios de GitHub. El README informa que el sitio está publicado en GitHub Pages.

No se observa el uso de frameworks o bibliotecas de interfaz como React o Bootstrap, ni de dependencias que haya que instalar. Para las funciones presentes, el HTML, el CSS y el JavaScript del navegador bastan, y evitan agregar una etapa de instalación o compilación.

### Secciones del portfolio

1. **Presentación o inicio**: saluda, identifica al autor, resume su interés en el desarrollo web, muestra una ilustración e incluye un botón para ir a los proyectos.
2. **Sobre mí**: presenta estudios, intereses y un objetivo personal. También enumera herramientas y tecnologías.
3. **Proyectos**: muestra un sistema de registro de pesaje para una yerbatera y una aplicación móvil llamada VitalHome. Cada tarjeta incluye imágenes, descripción, categoría, tecnologías y enlaces al código. Tiene filtros por categoría y una galería de miniaturas para cada proyecto.
4. **Contacto**: presenta una dirección de email y un formulario. El formulario comprueba los datos y da una respuesta visual, pero no envía el mensaje a un servidor.
5. **Pie de página**: vuelve a mostrar la marca, incluye un mensaje, calcula el año automáticamente y contiene enlaces a GitHub y al inicio.

## 2. Estructura de archivos

```text
Ezequiel_Fontana/
├── README.md
├── EXPLICACION_PORTFOLIO.md
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/
    ├── perfil-simple.svg
    ├── proyecto-yerbatera.png
    ├── proyecto-yerbatera-recibo.png
    ├── proyecto-vitalhome.png
    └── proyecto-vitalhome-contactos.png
```

- **`README.md`**: resumen del portfolio, tecnologías, funcionalidades, instrucciones de visualización y enlace publicado.
- **`EXPLICACION_PORTFOLIO.md`**: este documento de explicación.
- **`index.html`**: archivo principal. Contiene las secciones y enlaza el CSS, el JavaScript y los recursos visuales.
- **`css/style.css`**: reglas de diseño y de adaptación a diferentes pantallas.
- **`js/script.js`**: código que da comportamiento a los controles de la página.
- **`img/perfil-simple.svg`**: ilustración vectorial usada en la presentación.
- **`img/proyecto-yerbatera.png`**: captura principal del proyecto de registro de pesaje.
- **`img/proyecto-yerbatera-recibo.png`**: imagen del recibo de pesaje que se puede ver desde la galería.
- **`img/proyecto-vitalhome.png`**: captura principal de la aplicación VitalHome.
- **`img/proyecto-vitalhome-contactos.png`**: captura adicional de la pantalla de contactos de VitalHome.

### Archivo principal y conexiones

El punto de entrada es `index.html`. Dentro de su `<head>` hay una etiqueta `<link>` que carga `css/style.css` y una etiqueta `<script>` que carga `js/script.js`. El atributo `defer` del script hace que el navegador espere a terminar de interpretar el HTML antes de ejecutar el JavaScript. Así, los elementos que el script necesita buscar ya están disponibles.

El HTML referencia las imágenes con rutas relativas, por ejemplo `img/perfil-simple.svg`. Esto significa que el navegador busca la carpeta `img` desde la ubicación del propio `index.html`. El CSS afecta a los elementos por medio de selectores de etiqueta, clase e identificador; el JavaScript localiza elementos mediante sus identificadores y clases para responder a eventos.

## 3. Explicación del código

### `index.html`: contenido y estructura

#### Inicio del documento

- `<!DOCTYPE html>` indica que el documento debe interpretarse como HTML moderno.
- `<html lang="es">` indica el idioma principal. Esto ayuda a los navegadores y a tecnologías de asistencia a interpretar el contenido.
- `<meta charset="UTF-8">` habilita caracteres como tildes y la letra ñ.
- `<meta name="viewport" ...>` hace que el ancho de la página se ajuste al ancho del dispositivo, algo necesario para una visualización móvil correcta.
- La descripción y el título ayudan a identificar la página en la pestaña del navegador y en información para buscadores.
- Dos etiquetas `preconnect` preparan la conexión con Google Fonts. Después se solicita Manrope y DM Mono.
- La hoja de estilos se carga desde `css/style.css`.
- El script se carga desde `js/script.js` con `defer`, como se explicó antes.

#### Navegación y presentación

El enlace “Saltar al contenido” apunta al identificador `contenido`. Está oculto visualmente fuera de la pantalla hasta que recibe el foco del teclado; así las personas que navegan con teclado pueden evitar recorrer el menú cada vez.

El encabezado contiene el logo de texto “EF” y una navegación con enlaces a `#sobre-mi`, `#proyectos` y `#contacto`. El símbolo `#` indica que el enlace apunta a un elemento con ese `id` dentro de la misma página. El botón del menú móvil tiene atributos como `aria-expanded` y `aria-controls`, que expresan su estado y qué parte de la página controla.

La sección de presentación está identificada como `inicio`. Incluye el título principal, un texto introductorio, un enlace a los proyectos y una ilustración. El `alt` de la ilustración proporciona una descripción textual en lugar de depender solo de la imagen.

#### Sección “Sobre mí”

Esta parte reúne la información personal, formación, intereses y objetivo. Las listas (`ul` y `li`) agrupan los datos relacionados. Más abajo, otra lista muestra las tecnologías y herramientas. El contenido en sí es HTML; los estilos determinan cómo se distribuye y se ve.

#### Sección “Proyectos”

La sección presenta dos elementos `article`, uno por proyecto. Cada tarjeta contiene:

- Un enlace sobre la imagen principal que lleva al repositorio de GitHub.
- Un grupo de botones con miniaturas para alternar las capturas.
- La categoría y el año.
- El nombre y la descripción.
- Una nota que indica si el trabajo es práctico o grupal.
- Etiquetas con las tecnologías indicadas.
- Un enlace de texto al código.

La categoría se escribe como `data-category` en cada tarjeta y el filtro de cada botón como `data-filter`. Los atributos `data-*` permiten guardar datos en el HTML para que JavaScript los lea. Los enlaces externos usan `target="_blank"` para abrir otra pestaña y `rel="noopener noreferrer"` como protección al abrir páginas externas.

#### Sección de contacto y pie

El enlace `mailto:` abre el programa de correo configurado por quien visita la página, con la dirección indicada. No es lo mismo que el formulario: el formulario no tiene un destino de servidor.

Los campos se conectan con sus etiquetas mediante `for` e `id`. El campo de email tiene `type="email"`; el mensaje tiene `maxlength="300"`; y los atributos `required` y `minlength` describen condiciones de los campos. El formulario usa `novalidate` porque JavaScript controla la validación y muestra mensajes propios.

El elemento `form-notice` funciona como zona para los avisos. `role="status"` y `aria-live="polite"` permiten que un lector de pantalla anuncie las actualizaciones sin interrumpir bruscamente.

El pie incluye el elemento `current-year`, cuyo contenido se completa desde JavaScript.

### `css/style.css`: estilos y diseño responsive

#### Variables y reglas generales

Al principio, `:root` define variables CSS con nombres como `--page`, `--text`, `--accent` y `--font-body`. Una variable permite reutilizar un mismo valor: si una regla usa `var(--accent)`, toma el color de acento configurado arriba. Esto hace más fácil mantener consistentes los colores y las fuentes.

La regla `box-sizing: border-box` facilita el cálculo de las dimensiones porque incluye el relleno y los bordes dentro del ancho declarado. `body` establece la fuente, el color y el interlineado base. Las reglas para `a`, `button`, `input` y `textarea` unifican parte de su aspecto.

`:focus-visible` dibuja un contorno visible cuando se navega con teclado. `.container` centra el contenido y limita su anchura para que no se extienda demasiado en pantallas grandes. El encabezado usa `position: sticky` para permanecer cerca de la parte superior al desplazarse.

#### Distribución de las secciones

El CSS usa **Grid** para distribuciones en columnas, por ejemplo en la presentación, “Sobre mí” y la cuadrícula de proyectos. Usa **Flexbox** para alinear elementos en una fila o columna, como enlaces del menú, etiquetas y el pie.

Las clases como `.project-card`, `.filter-button` y `.contact-form` permiten aplicar estilos específicos a grupos de elementos. Las clases de estado, como `.is-active` e `.is-open`, cambian el aspecto o la visibilidad cuando JavaScript las agrega o las quita.

#### Adaptación a pantallas

El diseño responsive se implementa con consultas `@media`, que aplican reglas solo cuando el ancho de pantalla está por debajo de un umbral:

- Con un ancho máximo de **760 píxeles**, aparece el botón de menú y se ocultan inicialmente los enlaces de navegación. Si JavaScript añade `is-open`, los enlaces se muestran en una columna. La presentación y “Sobre mí” pasan a una columna y se reducen algunos espacios.
- Con un ancho máximo de **520 píxeles**, la cuadrícula de proyectos pasa de dos columnas a una. También se permite que el pie de página distribuya sus elementos en varias líneas.
- `clamp()` ajusta el tamaño de ciertos títulos entre un mínimo y un máximo, usando también el ancho de la pantalla como referencia.
- `prefers-reduced-motion` detecta la preferencia del sistema para reducir movimiento y acorta las transiciones y animaciones. Esto mejora la comodidad de quienes prefieren menos efectos.

Así, el contenido se reorganiza en vez de intentar conservar a la fuerza el diseño de escritorio en una pantalla angosta.

### `js/script.js`: interacciones

Al inicio, el script busca los controles y áreas relevantes con `document.querySelector` (un elemento) y `document.querySelectorAll` (varios). Después registra funciones para eventos como `click`, `input` y `submit`.

#### Menú móvil

Cuando se pulsa `menu-toggle`, el script lee el valor de `aria-expanded`. Si estaba cerrado, lo abre; si estaba abierto, lo cierra. Para mantener sincronizados el estado y la apariencia, actualiza `aria-expanded`, cambia el texto accesible del botón y agrega o quita la clase `is-open` en la lista de enlaces.

También registra un evento para cada enlace del menú. Al elegir uno, cierra el menú y actualiza sus atributos. Esto evita que el panel quede abierto después de navegar a una sección.

#### Filtro de proyectos

Cada botón de filtro lee su valor `data-filter`. Luego, el script recorre las tarjetas y compara ese valor con el `data-category` de cada una. El filtro “todos” deja visibles todas; otro filtro solo muestra coincidencias. Las demás reciben `hidden = true`.

El código también actualiza la clase visual `is-active` y el atributo accesible `aria-pressed`. Cuenta las tarjetas visibles y muestra el aviso de estado vacío si el resultado es cero.

#### Galería de miniaturas

Al pulsar una miniatura, el script busca la tarjeta que la contiene con `closest(".project-card")`. Dentro de esa tarjeta encuentra la imagen principal y actualiza su dirección (`src`) y su texto alternativo (`alt`) con los valores guardados en la miniatura.

Después recorre las miniaturas de esa misma tarjeta, marca la seleccionada con `is-active` y actualiza `aria-pressed`. La imagen cambia sin recargar la página y sin afectar la galería del otro proyecto.

#### Contador de caracteres

El evento `input` se ejecuta cada vez que cambia el contenido del mensaje. El script mide `messageInput.value.length` y actualiza el texto del contador. El máximo está configurado en el HTML como 300 caracteres.

#### Errores de campos: `setFieldError`

`setFieldError(field, message)` es una función auxiliar. Construye un identificador de error usando el identificador del campo. Si el mensaje de error todavía no tiene un elemento HTML, crea un `<small>`, lo inserta junto al campo y agrega ese identificador a `aria-describedby`.

Al final coloca el texto del error y establece `aria-invalid` en `true` o `false`. Esto hace que el mensaje se vea y que la relación con el campo también pueda ser interpretada por tecnologías de asistencia. Si no hay error, la función deja el mensaje vacío y marca el campo como no inválido.

#### Envío y validación del formulario

El evento `submit` empieza con `event.preventDefault()`: impide que el navegador navegue o envíe el formulario de manera tradicional. Luego comprueba:

- Que el nombre, quitando espacios de los extremos, tenga al menos dos caracteres.
- Que el campo de email no esté vacío y que el navegador lo considere válido mediante `email.validity.valid`.
- Que el mensaje, sin contar espacios en los extremos, tenga al menos diez caracteres.

Para cada campo que no cumple, llama a `setFieldError` con un mensaje; cuando sí cumple, limpia el error anterior. Si todos los campos son válidos, muestra una confirmación, reinicia los campos y pone el contador en cero. Si hay errores, muestra un aviso general para revisar los campos.

**Límite importante:** la confirmación dice expresamente que el mensaje está listo, pero que esta demostración no lo envía a un servidor. No hay un servicio de envío ni un backend en los archivos revisados.

#### Año actual

La última parte asigna a `current-year` el resultado de `new Date().getFullYear()`. El navegador toma el año de la fecha disponible en el dispositivo. Así, el pie puede actualizarse sin cambiar manualmente el número cada año.

### Archivos de imágenes

Los cuatro archivos PNG son capturas utilizadas en las tarjetas y sus galerías. El SVG es una ilustración vectorial, que se inserta en la presentación como cualquier otra imagen mediante `<img>`. Estos recursos no contienen funciones de la página: aportan el contenido visual.

## 4. Decisiones de diseño

### Colores

Los valores están centralizados en `:root` de `css/style.css`:

- El fondo principal es un tono claro cálido (`--page`).
- Las superficies principales son blancas (`--surface`) y hay una superficie secundaria ligeramente distinta (`--surface-raised`).
- El texto principal es oscuro (`--text`); el texto secundario usa un tono más apagado (`--muted`).
- El verde (`--accent`) destaca botones, enlaces y detalles.
- `--line` se usa para bordes y separadores.

Esta combinación crea contraste entre el texto y el fondo, y mantiene el verde como señal visual consistente. El código muestra esos usos; no documenta una explicación personal del autor sobre cómo se eligieron exactamente esos tonos.

### Tipografías

**Manrope** es la fuente principal para el texto de lectura y los títulos. **DM Mono** es monoespaciada y se usa en rótulos pequeños, como categorías y etiquetas, para diferenciarlos visualmente. Si las fuentes de Google no están disponibles, `sans-serif` y `monospace` sirven como alternativas.

### Estructura visual

El contenido se limita a un ancho máximo para mantener líneas legibles en pantallas amplias. Los espacios amplios separan las secciones; los bordes finos distinguen tarjetas y bloques sin recargar el diseño. Las tarjetas de proyectos ponen primero la captura y luego los detalles. En pantallas pequeñas, se reduce el número de columnas para conservar una lectura cómoda.

El diseño también incluye estados de foco de teclado, textos alternativos y etiquetas ARIA. No son adornos: permiten usar la interfaz con teclado y dan información adicional a tecnologías de asistencia.

## 5. Cómo se ejecuta y se publica

### Abrirlo en la computadora

El `README.md` propone dos opciones:

1. Abrir la carpeta del proyecto y hacer doble clic en `index.html`; el navegador mostrará la página.
2. Abrir la carpeta en Visual Studio Code y usar la extensión Live Server para verla desde un servidor local.

No hace falta instalar paquetes ni ejecutar una compilación. Se requiere Internet para cargar Manrope y DM Mono desde Google Fonts; si no hay conexión, se usarán las familias genéricas definidas como alternativas. Las imágenes y el CSS son archivos locales del proyecto.

### Publicarlo online

El README informa que el portfolio está publicado en GitHub Pages en:

<https://ezefont.github.io/portfolio-ezequiel-fontana/>

GitHub Pages puede servir los archivos estáticos del proyecto, por lo que un sitio compuesto por HTML, CSS, JavaScript e imágenes puede publicarse sin configurar un servidor propio. El enlace se cita según el README; esta explicación no verifica su disponibilidad actual.

## 6. Guion para mi exposición

### Guion aproximado de cinco minutos

> Hola, hoy voy a presentar mi portfolio personal. Lo preparé para mostrar quién soy, qué estoy estudiando, qué herramientas conozco y algunos proyectos en los que trabajé.
>
> El portfolio está hecho con HTML, CSS y JavaScript, sin un framework. El HTML organiza el contenido. El CSS define los colores, las fuentes y cómo se distribuyen los elementos. JavaScript agrega interacciones, como el menú móvil y los filtros. Elegí trabajar con estas tecnologías porque son las que forman la base de una página web y permiten construir este sitio sin herramientas adicionales.
>
> El archivo principal es `index.html`. Ahí están las secciones de la página y las referencias a la hoja de estilos, al script y a las imágenes. El archivo `style.css` se ocupa de la parte visual, mientras que `script.js` controla las acciones. Las imágenes están en una carpeta separada para mantener los recursos organizados.
>
> La primera sección es la presentación. Tiene mi nombre, una descripción breve y un botón para ir a los proyectos. Después está “Sobre mí”, donde aparecen mi formación, mis intereses, un objetivo y las herramientas que conozco.
>
> En la sección de proyectos muestro dos trabajos. El primero es un sistema para registrar el pesaje de camiones de productores de yerba mate. El segundo es VitalHome, una aplicación móvil orientada al cuidado de adultos mayores. En cada tarjeta se ven capturas, una descripción, algunas tecnologías y un enlace al repositorio. Los botones de filtro permiten ver proyectos de escritorio o mobile, y las miniaturas permiten cambiar la imagen principal.
>
> El diseño se adapta a pantallas distintas mediante CSS responsive. En una pantalla amplia, la presentación y los proyectos pueden ocupar varias columnas. Cuando el ancho disminuye, las secciones pasan a una columna y aparece un botón para abrir el menú. También se reducen espacios y tamaños para que el contenido quepa mejor en el celular.
>
> JavaScript controla el menú, el filtro y las galerías. También cuenta los caracteres del mensaje. En el formulario comprueba que el nombre tenga al menos dos caracteres, que el email sea válido y que el mensaje tenga al menos diez. Si hay un problema, muestra el error cerca del campo.
>
> Es importante aclarar que el formulario es una demostración: valida los datos y muestra una confirmación, pero no manda el mensaje a un servidor. Para recibir mensajes de verdad, habría que conectarlo a un servicio de envío o crear una parte de servidor.
>
> Finalmente, el sitio se puede abrir directamente con el navegador o mediante Live Server en Visual Studio Code. El README indica que está publicado con GitHub Pages. Como mejoras futuras, podría agregar más proyectos, hacer que el formulario envíe mensajes y revisar el contenido y la optimización de recursos. Gracias.

### Diez preguntas posibles y respuestas sugeridas

1. **¿Cuál es el archivo principal?**  
   `index.html`, porque organiza el contenido de la página y enlaza el CSS y el JavaScript.

2. **¿Qué diferencia hay entre HTML, CSS y JavaScript?**  
   HTML define el contenido y su estructura; CSS controla su apariencia; JavaScript agrega interacciones.

3. **¿Qué significa que el sitio sea responsive?**  
   Que el diseño se reorganiza según el ancho de la pantalla para que se pueda usar en una computadora, una tableta o un celular.

4. **¿Cómo se filtran los proyectos?**  
   Cada tarjeta tiene una categoría en `data-category`. El botón tiene un filtro en `data-filter`; JavaScript compara ambos valores y oculta las tarjetas que no coinciden.

5. **¿Cómo cambia la imagen de una tarjeta?**  
   Cada miniatura guarda la ruta y el texto alternativo de su imagen. Al pulsarla, JavaScript los copia a la imagen principal de esa tarjeta.

6. **¿El formulario envía el mensaje?**  
   No. Valida los campos y muestra una confirmación local, pero no se conecta a un servidor ni entrega el mensaje.

7. **¿Para qué sirve `defer` en el script?**  
   Hace que el navegador ejecute JavaScript después de terminar de leer el HTML. Así el script puede encontrar los botones y campos que necesita.

8. **¿Para qué sirve el texto `alt` de las imágenes?**  
   Describe la imagen si no se carga y ayuda a las personas que usan lectores de pantalla.

9. **¿Qué pasa si no se pueden cargar las fuentes externas?**  
   El navegador usa las fuentes genéricas alternativas definidas en el CSS.

10. **¿Cómo se puede publicar este portfolio?**  
    El README indica GitHub Pages. Como es un sitio estático, basta con publicar sus archivos para que el servicio pueda mostrarlos.

## 7. Cosas que puedo mejorar

### Limitaciones actuales

- El formulario solo valida y muestra una confirmación; no envía el mensaje.
- La página presenta dos proyectos, por lo que se podría ampliar la muestra de trabajos.
- Las fuentes se cargan desde Google Fonts y dependen de una conexión externa para mostrarse exactamente como se diseñaron.
- En el texto de formación hay algunas palabras que convendría revisar antes de exponer, por ejemplo “Programacón” y “Escuala”. Esta observación es solo una sugerencia de edición; no cambia el contenido del proyecto.

### Tres mejoras posibles para proponer

1. **Conectar el formulario a un servicio de envío o a un backend**, para que los mensajes puedan llegar realmente a una dirección de correo.
2. **Agregar más proyectos** con sus capturas, descripción, tecnologías y enlaces, para mostrar más experiencia.
3. **Revisar el contenido y optimizar los recursos**, corrigiendo errores de escritura y comprobando el peso de imágenes y la carga de fuentes para mejorar claridad y rendimiento.

Estas mejoras son propuestas para mencionar en la exposición; no se aplican como parte de esta explicación.
