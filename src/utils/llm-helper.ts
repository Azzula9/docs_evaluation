import 'dotenv/config';
import { OpenAI } from 'openai';
import { JSONSchema } from 'openai/lib/jsonschema';
import { ResponseFormatJSONObject } from 'openai/resources/shared';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function getCompletionFromMessages(
  messages: any[],
  model: string = 'gpt-4o-mini',
  temperature: number = 0,
  max_tokens: number = 3000,
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
      response_format: { type: 'json_object' } 
    });

    return response.choices[0].message?.content || '{}';
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
    throw new Error('Failed to get completion from OpenAI.');
  }
}
