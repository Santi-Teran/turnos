import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginUser(formData);

      if (result.success) {
        router.push("/dashboard");
      } else {
        toast.error("Mail o contraseña incorrectos");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};
