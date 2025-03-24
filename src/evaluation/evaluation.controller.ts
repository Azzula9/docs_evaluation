import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { EvaluationService } from './evaluation.service';
import { EvaluateRequest, EvaluateResponse } from './interfaces/evaluation.interface';

@Controller()
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @GrpcMethod('DocumentEvaluation', 'EvaluateDocuments')
  async evaluateDocuments(data: EvaluateRequest): Promise<EvaluateResponse> {
    return this.evaluationService.evaluateDocuments(data);
  }
}
