# ASORISA WEB 
Asociación de Sordos de Risaralda

Descripción del Proyecto
ASORISA Web es una tienda online desarrollada para apoyar la accesibilidad, comunicación y gestión de la Asociación de Sordos de Risaralda.
El sistema utiliza Angular Framework para el frontend y una arquitectura 100% serverless sobre AWS (Amazon Web Service) para el backend, garantizando:

- Alta disponibilidad
- Bajo costo
- Escalabilidad automática
- Seguridad mediante IAM
- Integración con almacenamiento y notificaciones

La arquitectura se compone de:
- Frontend: Angular Framework desplegado en AWS CloudFront con acceso a S3
- Backend: AWS Lambda + API Gateway
- Base de datos: DynamoDB
- Almacenamiento de imágenes: Amazon S3
- Monitoreo: AWS CloudWatch
- Notificaciones: AWS SNS
- Seguridad: IAM Roles & Policies

Componentes y su Función:
- DynamoDB
Base de datos NoSQL.
Escalabilidad automática.
Llaves primarias personalizables.
Ideal para almacenar productos, usuarios y registros sin estructura rígida.
Flexibilidad para manejar diferentes atributos de productos.

- IAM (Identity & Access Management)
Gestión de accesos y permisos.
Roles de mínimo privilegio para Lambda, S3 y DynamoDB.
Evita accesos no autorizados y define quién puede interactuar con cada servicio.

- Amazon S3
Almacenamiento de archivos estáticos del frontend.
Hosting para imágenes de productos.
Integración directa con CloudFront para baja latencia.

- AWS Lambda
Backend serverless.
Ejecuta la lógica de negocio: Crear, eliminar y consultar productos
Subir imágenes
Conectar con DynamoDB
Se ejecuta solo cuando es llamado, por lo cual reduce costos.

- API Gateway
Puerta de entrada del backend.
Expone los endpoints REST para que Angular pueda hacer peticiones.
Redirige el tráfico hacia Lambda.

- CloudFront
CDN para distribuir el frontend de manera rápida en todo el país.
Se conecta al bucket S3 mediante OAC (Origin Access Control).
Brinda HTTPS, caching y protección.

- CloudWatch
Monitoreo y logs de Lambda, errores y consumo.
Alarma de fallos en el backend o en solicitudes fallidas.

- SNS (Simple Notification Service)
Servicio de notificaciones.
Se usa para enviar alertas generadas por CloudWatch.
Notifica errores críticos del backend al equipo técnico.

Flujo General del Sistema
El usuario abre la página → CloudFront entrega el frontend desde S3.
El frontend hace solicitudes a API Gateway.
API Gateway invoca Lambda.
Lambda ejecuta la lógica e interactúa con DynamoDB o S3.
CloudWatch registra logs de cada ejecución.
Si ocurre un error crítico → SNS envía una notificación.

Tecnologías Usadas:
- Angular Framework
- TypeScript
- AWS CloudFront
- Amazon S3
- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- IAM Roles & Policies
- CloudWatch Logging & Metrics
- SNS Notifications
