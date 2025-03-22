import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DocumentEvaluationService } from './document-evaluation.service';
import { DocumentRequest, DocumentResponse } from '../proto/document-evaluation.pb';

@Controller()
export class DocumentEvaluationController {
  constructor(private readonly documentEvaluationService: DocumentEvaluationService) {}

  @GrpcMethod('DocumentEvaluationService', 'EvaluateDocuments')
  evaluateDocuments(request: DocumentRequest): Promise<DocumentResponse> {
    return this.documentEvaluationService.evaluateDocuments(request, null);
  }
}
