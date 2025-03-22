import { Module } from '@nestjs/common';
import { DocumentEvaluationService } from './document-evaluation.service';
import { DocumentEvaluationController } from './document-evaluation.controller';

@Module({
  providers: [DocumentEvaluationService],
  controllers: [DocumentEvaluationController],
})
export class DocumentEvaluationModule {}
