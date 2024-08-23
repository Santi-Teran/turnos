"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import { FaAngleDown } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

const FaqsPage = () => {
  const faqsNegocio = [
    {
      question: "¿Cómo me registro en Turnover?",
      answer:
        "Para registrarte, haz clic en 'Registrarse' en la página principal y completa el formulario con tu nombre, correo electrónico, dirección, y datos de tu negocio. Una vez que hayas creado tu cuenta, podrás acceder al dashboard y personalizar tu perfil de negocio.",
    },
    {
      question: "¿Cómo configuro los servicios y horarios de mi negocio?",
      answer:
        "Desde el dashboard, selecciona la opción 'Servicios' para agregar, editar o eliminar servicios. Para configurar los horarios de apertura y cierre, ve a 'Horarios' y ajusta los tiempos según las necesidades de tu negocio.",
    },
    {
      question: "¿Puedo agregar turnos manualmente?",
      answer:
        "Sí, puedes agregar turnos manualmente desde el dashboard. En la sección de 'Gestión de Turnos', selecciona 'Agregar Turno' y completa la información requerida.",
    },
    {
      question: "¿Qué hago si me voy de vacaciones?",
      answer:
        "Puedes utilizar la opción de 'Feriados' en el dashboard para marcar los días que estarás ausente. Así, tus clientes no podrán reservar turnos en esos días y evitarás conflictos en tu agenda.",
    },
    {
      question: "¿Hay un tiempo mínimo de permanencia en el plan?",
      answer:
        "No hay un tiempo mínimo de permanencia. El primer pago cubre un mes de servicio, y puedes cancelar en cualquier momento. Para cancelar tu suscripción, simplemente deja de abonar y el acceso a la plataforma se cancelará automáticamente.",
    },
    {
      question: "¿Cómo puedo darme de baja del servicio?",
      answer:
        "Para darte de baja, solo necesitas dejar de realizar los pagos mensuales. No hay un trámite adicional, ya que el acceso a la plataforma se cancelará automáticamente si no se recibe el pago.",
    },
    {
      question: "¿Qué debo hacer si olvido mi contraseña?",
      answer:
        "En la página de inicio de sesión, haz clic en 'Olvidé mi contraseña'. Se te enviará un correo electrónico con instrucciones para restablecer tu contraseña y volver a acceder a tu cuenta.",
    },
  ];

  const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b">
        <button
          className={`w-full flex justify-between items-center py-4 text-lg text-left font-medium focus:outline-none transition-all ${isOpen ? 'text-black' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {question}
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <FaAngleDown />
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"}`}
          style={{ maxHeight: isOpen ? "1000px" : "0" }}
        >
          <div className="py-2 text-gray-200">{answer}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${inter.className} flex flex-col gap-4 mx-4 md:mx-40 `}>
      <h3 className="text-3xl font-bold text-center">F.A.Q.s</h3>
      <p className="text-center">Algunas de las preguntas más frecuentes que nos hacen.</p>
      {faqsNegocio.map((faq, index) => (
        <AccordionItem
          key={index}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
};

export default FaqsPage;