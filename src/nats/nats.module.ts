import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, envs } from 'src/confing';

@Module({
    imports: [
        ClientsModule.register([
      { 
        name: NATS_SERVICE, 
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers
          // host: envs.productMicroserviceHost,
          // port:  envs.productMicroservicePort
        }
      }
    ])
    ],
    
    exports: [
        ClientsModule.register([
      { 
        name: NATS_SERVICE, 
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers
          // host: envs.productMicroserviceHost,
          // port:  envs.productMicroservicePort
        }
      }
    ])
    ]
})
export class NatsModule {}

/* 
    La siguiente Configuración es una manera mas corta y funcional de hacer lo mismo de arriba 
    Lo deje como el curso.
*/

// const natsClientConfig: ClientProviderOptions = {
//     name: NATS_SERVICE,
//     transport: Transport.NATS,
//     options: {
//       servers: envs.natsServers,
//     },
//   };
  
//   @Module({
//     imports: [
//       ClientsModule.register([natsClientConfig]),
//     ],
//     exports: [
//       ClientsModule.register([natsClientConfig]),
//     ],
//   })
//   export class NatsModule {}
