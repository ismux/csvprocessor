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
 "scripts": {
 "back:dev": "cd packages/back && npm run dev",
 "front:dev": "cd packages/front && npm run dev",
 "dev": "npm-run-all --parallel back:dev front:dev"
 },
 "devDependencies": {
  "npm-run-all": "^4.1.5"
 }
}
```
*package.json raíz*  
