import { parseString } from './utils';

export const PORT = process.env.PORT || 5001;
export const API_SERVICE_URL = parseString(
  'http://assignments.reaktor.com/birdnest'
);

export const SSE_INTERVAL = 5 * 1000;
