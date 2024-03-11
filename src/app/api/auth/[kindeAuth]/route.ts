// src/app/api/auth/[kindeAuth]/route.ts

import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextApiRequest } from 'next';

export async function GET(request: NextApiRequest | undefined, { params }: any) {
  const endpoint = params.kindeAuth;
  if (!request) {
    return { status: 400, body: { error: 'Invalid request' } };
  }

  try {
    // Call the handleAuth function or other logic here
     handleAuth(request, endpoint);

    // Send a success response if needed
    return { status: 200, body: { success: true } };
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error handling auth:', error);
    return { status: 500, body: { error: 'Internal server error' } };
  }
}
