import { Injectable } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { 
  Document, 
  DocumentRequest, 
  DocumentResponse, 
  EvaluationResult 
} from '../proto/document-evaluation.pb';
import { OpenAI } from 'openai'; // Assuming OpenAI SDK is installed

@Injectable()
export class DocumentEvaluationService {
  private openai = new OpenAI({ apiKey: 'your-api-key' });

  async evaluateDocuments(
    request: DocumentRequest,
    metadata: Metadata
  ): Promise<DocumentResponse> {
    const results: EvaluationResult[] = [];

    for (const doc of request.documents) {
      const evaluation = await this.evaluateDocument(doc);
      results.push(evaluation);
    }

    return { results };
  }

  private async evaluateDocument(doc: Document): Promise<EvaluationResult> {
    const messages = [
      { role: 'system', content: this.getSystemMessage() },
      { role: 'user', content: `####${JSON.stringify(doc)}####` },
    ];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0,
      max_tokens: 500,
    });

    return JSON.parse(response.choices[0].message.content);
  }

  private getSystemMessage(): string {
    return `Follow these steps to evaluate the quality of a document...`;
  }
}
