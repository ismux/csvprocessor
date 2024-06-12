# CSV Processor

## Descripción general

La funcionalidad del proyecto consiste en la visualización en forma de tarjetas del contenido de los archivos CSV previamente cargados.
Cada línea del CSV comprondrá cada una de las tarjetas, las cuales podrán ser filtradas por todos sus campos.

El proyecto consta de un monorepositorio multipaquete que se agrupa en:
- packages/front: Componentes visuales (inicia por defecto en el puerto 4000)
- packages/back: API (inicia por defecto en el puerto 3000)

## Inicio del proyecto

Para arrancar el proyecto se deben ejecutar los siguientes comandos, estando posicionado sobre la raíz del proyecto:
1. Instalar las dependencias:
```
npm install
```

2. Ejecutar el proyecto 
```
npm run dev
```
> [!NOTE]
> El proyecto está configurado para que al inciar, se arranque tanto el front como el API:

```json
{
  "name": "csvprocessor",
  "private": true,
 "scripts": {
  "dev:back": "npm run dev --workspace=back",
  "dev:front": "npm run dev --workspace=front",
  "dev": "npm-run-all --parallel dev:back dev:front"
 },
 "workspaces": [
    "packages/**"
 ],
 "devDependencies": {
  "@s-ui/mono": "^2.45.0",
  "npm-run-all": "^4.1.5"
 }
}
```
*package.json raíz*  

## Funcionamiento del API

El API ha sido creado con node, y está configurado para que genere una nueva BBDD para persistir los ficheros CSV, 
en caso de que no exista previamente.

La comunicación del API con la BBDD se ha realizado mediante la librería <a href="https://www.npmjs.com/package/msnodesqlv8" target="_blank">msnodesqlv8</a>

### Inicio y configuración de la BBDD

En el fichero *dbconfig.ts* de packages/back se encuentra: 
- Los parámetros de configuración por defecto de la BBDD:
```ts
export const dbConfig : any = {
    server: '.\\SQLEXPRESS', 
    database: 'master',
    options: {
        trustedConnection: true
    }
};
```
- Las diferentes consultas que se utilizarán para crear la BBDD, insertar y obtener los datos.

En el fichero *.env* de packages/back se encuentra el puerto sobre el que se levantará el API, así como el número de columnas
que se generará en la tabla *[DataContent]* y que se utilizarán para persistir los datos de los CSV:
```.env
REACT_APP_PORT=3000
REACT_APP_API_URL=http://localhost:3000
REACT_APP_CSVCOLS=7
```

Al iniciar el API se generará la siguiente estructura de BBDD, en caso de que no exista previamente:

- BBDD *DataCsv*
- Tabla *csv.DataFile*    -> Se almacenarán los nombres de los ficheros CSV.
- Tabla *csv.DataContent* -> Se almacenan las columnas de los CSV y la relación del fichero al que pertenece.

## Funcionamiento del Front

El Front permite cargar archivos CSV para posteriormente visualizarlos en forma de tarjetas. También permite eliminarlos.
Está configurado para arrancar en el puerto 4000:
```.env
VITE_APP_PORT=4000
VITE_APP_API=http://localhost:3000
```
- Para el diseño de la interfaz se ha utilizado <a href="https://mui.com/" target="_blank">Material UI</a>
- Para la comunicación con el API se ha utilizado <a href="https://www.npmjs.com/package/react-axios" target="_blank">Axios</a>
