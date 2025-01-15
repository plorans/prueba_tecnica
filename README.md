# Prueba Tecnica - Bloxtek

Sistema de Registro y Login

## Descripcion

Este proyecto es un sistemas simple de autenticación que permite a los usuarios registrarse e iniciar sesión utilizando su correo electrónico y contraseña.  
La aplicación demuestra una implementación full-stack utilizando Next.js para el frontend y Express.js con PostgreSQL para el backend. 
El objetivo es crear un sistema funcional, seguro y fácil de usar.

## Características

- Registro de usuarios con correo electrónico y contraseña.
- Funcionalidad de inicio de sesión con contraseñas cifradas para mayor seguridad.
- Validación de datos del lado del servidor.
- Diseño intuitivo.

## Tecnologías Utilizadas

-  Next.js: Para el frontend, aprovechando su enrutamiento y optimizaciones de rendimiento.
-  Express.js: Para el backend, gestionando solicitudes API y conexiones a la base de datos.
-  PostgreSQL: Para almacenar de manera segura los datos de los usuarios.
-  bcrypt: Para cifrar las contraseñas de los usuarios y garantizar la seguridad.

### Requerimientos Previos

### 1. Node.js

El proyecto requiere **Node.js**. Puedes descargarlo desde su página oficial:
- [Descargar Node.js](https://nodejs.org/)

### 2. Base de datos

El proyecto utiliza **PostgreSQL** como base de datos. Asegúrate de tener PostgreSQL instalado y corriendo en tu máquina. Si necesitas instrucciones, visita [la pagina oficial de PostgreSQL](https://www.postgresql.org/).

## Configuración del proyecto
1. Clonar el proyecto.
```
git clone https://github.com/plorans/prueba_tecnica.git
```
3. Entrar a al folder que contien el backend e instalar dependencias de node.
```
cd .\prueba_tecnica\
cd .\Back\
npm install
```
4. Configuramos la conexion a la base de datos en src/db.js.
```
user: 'tu_usuario_postgres',
host: 'localhost',
database: 'tu_database',
password: 'tu_contraseña_postgres',
port: 5432
```
5. Una vez instaladas las dependecias y configurada la base de datos, encendemos el servidor.
```
npm start
```
6. Entrar al folder que contiene el frontend e instalar las dependencias de node.
```
cd .\prueba_tecnica\
cd .\frontend\
npm install
```
7. Una vez instaladas las dependecias encendemos el servidor.
```
npm run dev
```
La aplicación estará disponible en http://localhost:3000.

# Configuracion con Docker (Opcional)
1. Descargar el archivo docker-compose.yml y init.sql del apartado de Releases.

```
docker-compose up --build
```

## Cómo Usar el Proyecto

- Abre la aplicación en http://localhost:3000.
- Navega a la página de registro y crea una cuenta proporcionando tu correo electrónico y contraseña.
- Usa la página de inicio de sesión para ingresar con tus credenciales.
- Al iniciar sesión correctamente, serás redirigido al panel principal.
