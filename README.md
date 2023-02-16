# Instrucciones para la instalación y configuración de la app Angular

## Servidor Local

Para el caso de un entorno de desarrollo, es necesario tener preparado localmente las configuraciones necesarias para desarrollar y ejecutar la aplicación, y tener establecida la plantilla de Fuse Theme, siguiendo los pasos:

* Configurar el espacio de trabajo local para desarrollar y ejecutar la aplicación de Angular, siguiendo las instrucciones de la documentación oficial que se puede consultar en: https://angular.io/guide/setup-local.
* Disponer de la plantilla base de Fuse Theme, y seguir las instrucciones de instalación consultando la documentación oficial en: https://angular-material.fusetheme.com/docs/guides/getting-started/introduction.
* Utilizando la interfaz de línea de comandos, posicionarse en la raíz de la plantilla Fuse Theme, y ejecutar el comando **ng serve**. Angular CLI construirá los archivos necesarios para ejecutar la aplicación de forma local.
* Una vez que termine el proceso, se podrá abrir la aplicación desde un servidor local accesible desde http://localhost:4200.

## Servidor Producción

Por otro lado, en el caso de un entorno de producción, se debe realizar los siguientes pasos:

* Se debe realizar el proceso de construcción de los archivos ejecutables de la aplicación, esto por medio del uso de Angular CLI. Desde la línea de comando se debe posicionar sobre la raíz del proyecto de la plantilla de Fuse Theme, y ejecutar el comando **ng build**.
* El proceso de construcción generará archivos ejecutables dentro de la carpeta **/dist/fuse**, mismos que pueden ser colocados en cualquier servidor web que pueda despachar archivos HTML.

## Configuraciones Adicionales

Debido a que la aplicación hace peticiones a la URL de la API, es necesario establecer esta en los archivos de configuración de Fuse Theme, que se pueden encontrar en **/src/environments**. La URL para producción se configura en la variable **apiURL** del archivo **environment.prod.ts**, y para local la misma variable pero dentro del archivo **environment.ts**.