export const getTokenPayload = (): any | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (err) {
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const payload = getTokenPayload();
  if (!payload?.exp) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
};
