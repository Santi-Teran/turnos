import { useEffect, useState } from 'react';
import { getUserInfo } from '../api';

export const handleUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const result = await getUserInfo(userId, token);
      if (result.success) {
        setUserInfo(result.data);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading, error };
};