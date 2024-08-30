"use client";
import { useState } from "react";
import { Nunito } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdLock, MdMail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const nunito = Nunito({ subsets: ["latin"] });

const RestorePassword = () => {
  const [step, setStep] = useState(1); // Paso 1: solicitar email, Paso 2: ingresar código, Paso 3: cambiar contraseña
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState(""); // Token para cambiar la contraseña
  const [canResend, setCanResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post(
        `https://www.misturnos.somee.com/api/Users/verify-identity?email=${email}`
      );
      if (response.status === 200) {
        setStep(2);
        startResendTimer(); // Inicia el temporizador para permitir reenvío
      } else {
        console.error("Error al enviar el código");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const startResendTimer = () => {
    setCanResend(false);
    setTimeout(() => setCanResend(true), 60000); // Espera 1 minuto para permitir reenvío
  };

  const handleCodeSubmit = async () => {
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
      } else {
        console.error("Código inválido");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post(
        "https://www.misturnos.somee.com/api/Users/change-password",
        {
          email: email,
          password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Coloca el token en el header
        }
      );
      if (response.status === 200) {
        console.log("Contraseña cambiada con éxito");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        console.error("Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
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
              className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}
            >
              Enviar código
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
              className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}
            >
              Verificar código
            </button>
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
              className={`${nunito.className} text-lg bg-arena text-dark-blue font-black px-6 py-2 rounded-lg`}
            >
              Cambiar contraseña
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default RestorePassword;
