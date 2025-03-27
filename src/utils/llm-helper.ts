import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletionFromMessages(messages: any[]): Promise<string> {
  try {
    const response = await llm.call(messages);
    return response.text;
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
    throw new Error("Failed to get completion from OpenAI.");
  }
}
