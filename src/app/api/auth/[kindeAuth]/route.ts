// src/app/api/auth/[kindeAuth]/route.ts

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
    // Call the handleAuth function or other logic here
    await handleAuth(req, kindeAuth);

    // Send a success response if needed
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error handling auth:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
