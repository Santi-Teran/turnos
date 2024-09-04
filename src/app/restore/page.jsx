"use client";
import { useState } from "react";
import { Nunito } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdLock, MdMail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const nunito = Nunito({ subsets: ["latin"] });

const RestorePassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [codeValid, setCodeValid] = useState(null); // null = no verificado, true = correcto, false = incorrecto
  const router = useRouter();

  const handleEmailSubmit = async () => {
    setIsLoading(true);
    setFeedbackMessage("Enviando correo...");
    try {
      const response = await axios.post(
        `https://www.misturnos.somee.com/api/Users/verify-identity?email=${email}`
      );
      if (response.status === 200) {
        setStep(2);
        setFeedbackMessage("");
        startResendTimer();
      } else {
        setFeedbackMessage("Error al enviar el código. Intente de nuevo.");
      }
    } catch (error) {
      setFeedbackMessage("Error al enviar el código. Intente de nuevo.");
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      if (step === 2 && !token) {
        setFeedbackMessage(
          "El correo puede tardar en llegar. Por favor, revise su bandeja de entrada."
        );
      }
    }, 60000); // 1 minuto
  };

  const startResendTimer = () => {
    setCanResend(false);
    setTimeout(() => setCanResend(true), 60000);
  };

  const handleCodeSubmit = async () => {
    setIsLoading(true);
    setFeedbackMessage("Verificando código...");
    try {
      const response = await axios.post(
        "https://www.misturnos.somee.com/api/Users/validate-code?flag=true",
        {
          phoneNumber: email,
          code: code,
        }
      );
      if (response.status === 200) {
        setToken(response.data.token);
        setStep(3);
        setCodeValid(true);
        setFeedbackMessage("");
      } else {
        setCodeValid(false);
        setFeedbackMessage("Código incorrecto. Inténtelo de nuevo.");
      }
    } catch (error) {
      setCodeValid(false);
      setFeedbackMessage("Error al verificar el código.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setIsLoading(true);
    setFeedbackMessage("Cambiando contraseña...");
    try {
      const response = await axios.post(
        "https://www.misturnos.somee.com/api/Users/change-password",
        {
          email: email,
          password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setFeedbackMessage("Contraseña cambiada con éxito. Redirigiendo...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setFeedbackMessage("Error al cambiar la contraseña.");
      }
    } catch (error) {
      setFeedbackMessage("Error al cambiar la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-5 mt-20 p-8 rounded-lg shadow-2xl w-full max-w-md gradient">
        <h1 className={`${nunito.className} text-3xl md:text-4xl font-black`}>
          Restaurar Contraseña
        </h1>

        {step === 1 && (
          <>
            <div className="flex items-center border p-2 gap-2 rounded-lg">
              <MdMail className="text-gray-100" />
              <input
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100`}
              />
            </div>
            <button
              type="button"
              onClick={handleEmailSubmit}
              disabled={isLoading}
              className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}
            >
              {isLoading ? "Enviando..." : "Enviar código"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Ingresa el código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`bg-transparent border p-2 rounded-lg focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100`}
            />
            <button
              type="button"
              onClick={handleCodeSubmit}
              disabled={isLoading}
              className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}
            >
              {isLoading ? "Verificando..." : "Verificar código"}
            </button>
            {codeValid === false && (
              <p className="text-red-600">
                Código incorrecto. Inténtelo de nuevo.
              </p>
            )}
            {feedbackMessage && (
              <p className="text-gray-600 mt-2">{feedbackMessage}</p>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex items-center border p-2 gap-2 rounded-lg">
              <MdLock className="text-gray-100" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`bg-transparent focus:outline-none focus:ring-0 w-full text-black placeholder:text-gray-100`}
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              )}
            </div>
            <button
              type="button"
              onClick={handlePasswordChange}
              disabled={isLoading}
              className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}
            >
              {isLoading ? "Cambiando..." : "Cambiar contraseña"}
            </button>
            {feedbackMessage && (
              <p className="text-gray-600 mt-2">{feedbackMessage}</p>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default RestorePassword;
