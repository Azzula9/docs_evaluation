import { Injectable } from '@nestjs/common';
import { getCompletionFromMessages } from '../utils/llm-helper';
import { EvaluateRequest, EvaluateResponse, EvaluationResult } from './interfaces/evaluation.interface';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

@Injectable()
export class EvaluationService {
  async evaluateDocuments(request: EvaluateRequest): Promise<EvaluateResponse> {
    const results: EvaluationResult[] = [];

    for (const doc of request.documents) {
      const formattedContent = `
      Document ID: ${doc.id}
      Title: ${doc.title}
      Content: ${doc.content}
    `;

      const messages = [
        new SystemMessage(SYSTEM_MESSAGE),
        new HumanMessage(formattedContent),
      ];

      const response = await getCompletionFromMessages(messages);
      const result = JSON.parse(response);
      result.document_id = doc.id; 
      results.push(result);
    }

    return { results };
  }
}

const SYSTEM_MESSAGE = `
Follow these steps to evaluate the quality of a document before adding it to the RAG system.
The document content will be delimited with four hashtags, i.e. ####.

Step 1:  Analyze the content quality:
- Accuracy: Is the information factually correct? (Weight: 20%)
- Completeness: Does the document cover all necessary details? (Weight: 20%)
- Clarity: Is the document well-written and easy to understand? (Weight: 20%)
- Relevance: Is the document useful for the RAG system? (Weight: 15%)
- Objectivity: Is there any bias in the content? (Weight: 15%)

Step 2:  Check structural and linguistic quality:
- Grammar & Readability: Are there grammatical errors? (Weight: 5%)
- Formatting & Consistency: Is the document well-structured? (Weight: 5%)
- Redundancy: Is information repeated within the document? (Weight: 5%)

Step 3:  Evaluate source credibility and metadata:
- Source Credibility: Is the document from a trustworthy source? (Weight: 5%)
- Date of Information: Is the content up to date? (Weight: 5%)
- References: Are citations properly included? (Weight: 5%)

Step 4:  Compare with existing documents:
- Contradictions: Does this document conflict with any stored document? (Weight: 5%)
- Repetition Across Files: Does it contain duplicate content from other documents? (Weight: 5%)
- New Value: Does it introduce unique insights? (Weight: 5%)

Final Decision: 
- Calculate the total score based on the above criteria. If the document's total score is above 70%, it is considered valid.
- Include a boolean field \`"is_valid"\` to indicate if the document meets the required quality standards.

For each document, provide a structured JSON output with detailed evaluation:

{
  "document_id": "type": "integer",(MUST match the provided ID exactly)
  "completeness": "High/Medium/Low",
  "clarity": "High/Medium/Low",
  "relevance": "High/Medium/Low",
  "objectivity": "High/Medium/Low",
  "grammar": "Good/Needs Improvement",
  "formatting": "Good/Needs Improvement",
  "redundancy": "None/Low/Medium/High",
  "date_of_information": "Recent/Outdated",
  "contradictions": "None/Low/Medium/High",
  "repetition_across_files": "None/Low/Medium/High",
  "new_value": "High/Medium/Low",
  "is_valid": true/false,  (calculated based on weighted scores)
  "mistakes": {
    "grammar": "List of grammar issues if any",
    "formatting": "Issues related to structure, headings, or bullet points",
    "redundancy": "Mention if any repeated information was found"
  },
}
`;
