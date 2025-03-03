# Mapfres Autoinspecciones web

## Instalación

  * Se requiere [Node.js](https://nodejs.org/) v20.9.0+.
  * `npm install -g @ionic/cli`
  * `npm install node-sass`
  * `npm install @ionic/app-scripts@latest --save-dev`
  * `npm i` - En la carpeta del proyecto

## Ejecución

En la carpeta del proyecto ejecutar el siguiente comando para iniciar el proyecto:

  * `ionic serve` - Ejecutar el proyecto en modo desarrollo
 
## Generación de archivos desplegables

En la carpeta del proyecto ejecutar el siguiente comando para generar los archivos de despliegue:

  * `ionic build --prod`  - Generar los archivos para despliegue en producción
  * ionic build --prod -- --base-href /inspeccion/

Los archivos generados están ubicados en la carpeta "www".


## URLs:
- INT: https://d3kln67rce7w64.cloudfront.net
- PRE: https://d345lgchhyzk8l.cloudfront.net
- PRO: https://d2k9pmrqkvl1g2.cloudfront.net


open -na "Google Chrome" --args --user-data-dir="/tmp/ChromeDev" --disable-web-security

git reset -q HEAD -- .nvmrc
git reset -q HEAD -- environment.service.ts