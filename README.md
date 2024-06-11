## Cliente Gateway
El gateway es el punto de comunicacionn entre nuestros clientes y nuestros servicios.
Es el encagado de recibir las petiiones, enviarlas a los servicios
correspondientes y devolver la respuesta al cliente. 

## Dev
1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.templete`
4. Tener levantados los microservicios que se van a consumir
5. Levantar Nats (vease Nats para instrucciones).
6. Levantar proyecto con `npm run start:dev`


## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```