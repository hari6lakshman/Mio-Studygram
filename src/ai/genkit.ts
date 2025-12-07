import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Add a retry mechanism for transient errors like 503s.
      requestRetries: 3,
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
