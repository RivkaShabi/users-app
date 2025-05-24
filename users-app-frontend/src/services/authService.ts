import { LoginPayload, RegisterPayload } from '../models/interface';

const BASE_URL = 'http://localhost:5000/api/auth';

// Register a new user
export const register = async (data: RegisterPayload): Promise<string> => {
  try {
    console.log('[register] Registering user:', data.username);
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      // Throw error object with message and status for error handling
      throw { message: err.message || 'Registration failed', status: res.status };
    }

    return 'Registration successful';
  } catch (error: any) {
    // If error has status, rethrow as is, otherwise wrap in Error
    console.error('[register] Error:', error);
    if (error.status) {
      throw error;
    }
    throw new Error(error.message);
  }
};

// Login user and get token
export const login = async (data: LoginPayload): Promise<string> => {
  try {
    console.log('[login] Logging in user:', data.username);
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (!res.ok) {
      // Throw an error object with both message and status
      throw { message: json.message || 'Login failed', status: res.status };
    }

    const token = json.token;
    console.log('[login] Login successful, token received');
    return token;
  } catch (error: any) {
    // If error has status, rethrow as is, otherwise wrap in Error
    console.error('[login] Error:', error);
    if (error.status) {
      throw error;
    }
    throw new Error(error.message);
  }
};
