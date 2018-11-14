# Software de remisión (Excepción de ausentismo).

Software para manejar archivos de excepción en ausentismo de la Uniminuto de Girardot, enfocado a la administración, creación, edición, eliminación, graficación y comparación entre los datos de la base de datos.

Aplicación web diseñada bajo NodeJS, GraphQL y MongoDB, siguiendo el concepto SPA (Single Page Application) con React y PWA (Progressive Web Application), los cuales ofrecen un ecosistema seguro, adaptado para móviles y sin problemas de rendimiento a la hora de manipular una gran cantidad de datos.

Este funciona de la siguiente manera:

![Alt text](https://i.imgur.com/qCy9N2D.png "INFORMATION FUNCTIONALITY")

Puede probar este sistema aquí:

> La siguiente URL es de prueba, la universidad Uniminuto usará otro domino para el manejo de datos. Para poder entrar, envie un correo a andresmontoyafcb@gmail.com para obtener los datos.

https://ausentismodesercion.now.sh/

Este sistema cuenta con dos tipos de usurios, los cuales son los Administradores y los usuarios comunes.

![Alt text](https://i.imgur.com/aPkCRiP.png "USER WORKS")

Aprende a manejarlo leyendo:

[Manual de usuario (Versión de escritorio)](https://docs.google.com/document/d/1JQmSufvyk8H02z9-OY6WPfp0x8GGYOt4DIj55Y3WvEo/edit?usp=sharing)

[Manual de usuario (Versión para celulares)](https://docs.google.com/document/d/1dmSFLYvSqUbUCbqmPfUDGxPgOw6BU621H4yB-Zp96g4/edit?usp=sharing)

## Soporte

En este apartado únicamente se va a hablar acerca de como subir este software a cualquier servidor y resolver posible problemas técnicos.

**Recomendaciones**

Antes de subir a producción, este seguro que el dominio trabaja bajo HTTPS y HTTP2, para que el software pueda usar las funciones de una aplicación PWA y así mismo, las peticiones que se hagan a GraphQL se ejecuten rápidamente.

Un ejemplo de este tipo de funcionamiento, podria hacer el procesos **pesado** y **forzoso** que se necesita para subir los Excels que se utilizan para almacenar la información de cada estudiante por periodo.

![Alt text](https://i.imgur.com/Y9pYber.png "UPLOAD EXCEL")

**Configuración de variables**

*Variables de cliente*

Entre a la carpeta *Client*, luego cree un archivo .env con el contenido de [.env.example](client/.env.example), despues remplaze `http://your-awesome-site.com` por el sitio que esta usando en producción.

> Por recomendación, cuando pegue la URL, elimine el ultimo /. [Aquí podrá encontrar la razón](https://github.com/MontoyaAndres/GradeProject/blob/master/client/src/utils/api.js), leyendo el funcionamiento de las peticiones GET.

```
# Contenido de ejemplo para el archivo .env

REACT_APP_SERVER_URL=https://ausentismodesercion.now.sh
```

*Variables de servidor*

Entre a la carpeta *Server*, luego cree un archivo .env con el contenido de [.env.example](server/.env.example), despues remplaze las variables con < TEXTO > por las que este usando.

```
# Contenido de archivo .env.example

DATABASE_URL=<Mongodb_url>
SECRET1=<Secret_key>
SECRET2=<Secret_key>
PORT=<Port>
GRAPHQL_END_POINT=<Graphql_end_point>

EMAIL_SECRET=<Secret_key>
EMAIL_SERVICE=<Email_service>,
EMAIL_USER=<Email_user>
EMAIL_PASSWORD=<Email_password>
```

Por ejemplo:

> Es recomendable que el puerto sea `80` ya que por este medio *Por lo regular* GraphQL hace las peticiones.

> El endpoint esta configurado para que sea `/graphql`por defecto, o lo puede cambiar [aquí](client/src/apollo.js#L7).

```
# Contenido de ejemplo para el archivo .env

DATABASE_URL=mongodb://HOST:27017/ausentismodesercion
SECRET1='YourSuperSecretPasswordForAuth'
SECRET2='YourSuperSecretPasswordForPasswords'
PORT=80
GRAPHQL_END_POINT='/graphql'

EMAIL_SECRET='YourSuperSecretPasswordForEmail'
EMAIL_SERVICE='Gmail',
EMAIL_USER='correo@gmail.com'
EMAIL_PASSWORD='password123'
```

**Aplicación en producción**

Entre a la carpeta *Client* y luego ejecute el comando *Build*, el cual puede ver en [package.json](client/package.json) y espere un momento hasta que finalize.

```
npm run build
```

Una vez terminado, vaya a la carpeta *Server* y ejecute el comando *Build*, el cual puede ver en [package.json](server/package.json)

```
npm run build
```

Y luego inicie la aplicación.

```
npm start
```

> Si su sevidor funciona bajo GIT, procure que la carpeta files que crea el comando *Build* haya sido subida con exito.

¿Cómo trabaja internamente la web subida en now.sh?

![Alt text](https://i.imgur.com/NNWbTv0.png "PAGE WORKS")

## Cronograma

https://docs.google.com/spreadsheets/d/1GhwYvmZus2zo12BZq1Y4yOzL_2oVIeFiUdy8mA4kGA0/edit?usp=sharing
    
