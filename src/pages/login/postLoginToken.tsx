
import axios from 'axios';

export const postLoginToken = async (idToken: string): Promise<boolean> => {
  const API_URL = 'http://localhost:8080';
  const path = '/v1/oauth/login';

  try {
    const response = await axios.post(`${API_URL}${path}`, idToken, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.success) {
      throw new Error('Failed to receive login token');
    }

    // Perform any operations with the token, such as storing it
    // ...

    return true;
  } catch (error: unknown) {
    console.error('postLoginToken Error:', (error as Error).message);
    return false;
  }
};