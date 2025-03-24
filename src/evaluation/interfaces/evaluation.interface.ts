export interface EvaluateRequest {
    documents: Document[];
  }
  
  export interface Document {
    id: number;
    title: string;
    content: string;
  }
  
  export interface EvaluationResult {
    document_id: number;
    completeness: string;
    clarity: string;
    relevance: string;
    objectivity: string;
    grammar: string;
    formatting: string;
    redundancy: string;
    date_of_information: string;
    contradictions: string;
    repetition_across_files: string;
    new_value: string;
    is_valid: boolean;
  }
  
  export interface EvaluateResponse {
    results: EvaluationResult[];
  }
  