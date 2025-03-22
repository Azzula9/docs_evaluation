import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentEvaluationModule } from './document-evaluation/document-evaluation.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(DocumentEvaluationModule, {
    transport: Transport.GRPC,
    options: {
      package: 'documentevaluation',
      protoPath: 'proto/document-evaluation.proto',
    },
  });

  await app.listen();
  console.log('gRPC Document Evaluation Microservice is running');
}

bootstrap();
