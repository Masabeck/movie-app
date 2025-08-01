type TokenPayload = {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
};

export const getTokenPayload = (): TokenPayload | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    if (!payload) return null;

    const decoded = JSON.parse(atob(payload));
    if (typeof decoded !== 'object' || decoded === null) return null;

    return decoded as TokenPayload;
  } catch (err) {
    console.error('Failed to parse token payload:', err);
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const payload = getTokenPayload();
  if (!payload?.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
};
