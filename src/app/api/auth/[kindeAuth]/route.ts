import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { kindeAuth } = req.query;

  if (!kindeAuth || typeof kindeAuth !== 'string') {
    // Handle the case where kindeAuth is missing or not a string
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  // Adjust the arguments based on the expected parameters for handleAuth
  // For example: await handleAuth(req, kindeAuth, additionalArgument);
  await handleAuth(req, kindeAuth);
}
