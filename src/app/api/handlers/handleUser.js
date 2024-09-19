import { useEffect, useState } from "react";
import { getUserInfo } from "../api";
import { useRouter } from "next/navigation";

export const handleUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const result = await getUserInfo(userId, token);
      if (result.success) {
        setUserInfo(result.data);
      } else {
        setError(result.message);
        router.push("/login");
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading, error };
};
