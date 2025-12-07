import {genkit} from '@genkit-ai/next';
import '@/ai';
export const {GET, POST} = genkit({
  plugins: [],
  root: '/api/genkit',
});
