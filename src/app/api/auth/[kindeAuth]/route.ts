import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { kindeAuth } = req.query;

  if (!kindeAuth || typeof kindeAuth !== 'string') {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  try {
    // Call the handleAuth function
    await handleAuth(req, kindeAuth);

    // Send a success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling auth:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}