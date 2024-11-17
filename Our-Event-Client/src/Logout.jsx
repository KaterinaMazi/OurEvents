import { useEffect } from 'react';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = '/';
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;