# Markdown Links👩🏻‍💻

Este proyecto es una librería creada en NodeJs que permitirá leer archivos Markdown que se encuentren dentro de un directorio o en un archivo. Podrás extraer los links de estos y validar el estatus de cada uno. Como resultado nos puede entregar distintas estadísticas según el comando que se ingrese.


## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas quemanejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas.

## Diagrama de flujo
A continuación se muestra el diagrama de flujo creado para desarrollar dicha librería:

<img src="src/images/flowchart.png" alt="version-final" width="510px" height=750px/>


## Instalación

Se puede instalar por npm:

## Guía de uso
Se logra ejecutar la librería por medio de la terminal:

(nombre del path) <path-to-file> [options]

Las rutas ingresadas pueden ser relativa o absoluta y las opciones son: --stats, --validate, o usar las dos juntas --stats --validate.





