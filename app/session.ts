export const setAdminSession = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminToken', token);
      // Also set as cookie for middleware access
      document.cookie = `adminToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week
    }
  };
  
  export const getAdminSession = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminToken');
    }
    return null;
  };
  
  export const clearAdminSession = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
      // Also clear cookie
      document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };