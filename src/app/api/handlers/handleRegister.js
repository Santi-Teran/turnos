import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser, verifyCode } from "../api";

export const useRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userConfiguration: {
      address: {
        addressLine: "",
      },
    },
    password: "",
    subscriptionId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const url = window.location.href;
    const preapprovalIdParam = url.split("preapproval_id=")[1];
    if (preapprovalIdParam) {
      const subscriptionId = preapprovalIdParam.split("&")[0];
      setFormData((prevData) => ({
        ...prevData,
        subscriptionId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "addressLine") {
      setFormData((prevData) => ({
        ...prevData,
        userConfiguration: {
          ...prevData.userConfiguration,
          address: {
            ...prevData.userConfiguration.address,
            addressLine: value,
          },
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await registerUser(formData);
      if (result.success) {
        return true; // Devuelve true si el registro fue exitoso
      } else {
        setError(result.data.message);
        return false;
      }
    } catch (error) {
      setError(
        "Ocurrió un error al registrar tu cuenta. Inténtalo de nuevo más tarde."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (code) => {
    setLoading(true);
    setError(null);

    try {
      const result = await verifyCode(formData.email, code);
      if (result.success) {
        router.push("/login");
      } else {
        setError("El código ingresado es incorrecto. Inténtalo nuevamente.");
      }
    } catch (error) {
      setError(
        "Ocurrió un error al verificar tu código. Inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleVerifyCode,
    loading,
    error,
  };
};
