import { FaPen, FaCalendarAlt, FaClock, FaMobile, FaLock, FaChartBar } from "react-icons/fa";

const services = [
  {
    title: "Gestioná tus Turnos",
    icon: <FaCalendarAlt  className="text-3xl text-white" />,
    description: "Organizá y administrá los turnos de tu negocio de manera eficiente y sin complicaciones.",
    benefits: [
      "Fácil programación y reprogramación de citas.",
      "Notificaciones automáticas para clientes.",
      "Vista de calendario intuitiva."
    ]
  },
  {
    title: "Personalizá tu Página",
    icon: <FaPen className="text-3xl text-white" />,
    description: "Dale a tu página un toque único que refleje la identidad de tu negocio.",
    benefits: [
      "Cambio de colores y temas.",
      "Personalización de logotipos y marcas.",
      "Configuración de contenido adaptable."
    ]
  },
  {
    title: "Horarios Flexibles",
    icon: <FaClock className="text-3xl text-white" />,
    description: "Establecé horarios de atención flexibles para ajustarte a las necesidades de tus clientes.",
    benefits: [
      "Configuración fácil de horarios de apertura y cierre.",
      "Gestión de disponibilidad por servicios.",
      "Bloqueo de horarios específicos."
    ]
  },
  {
    title: "Reportes Detallados",
    icon: <FaChartBar className="text-3xl text-white" />,
    description: "Accedé a reportes detallados para entender mejor el rendimiento de tu negocio.",
    benefits: [
      "Análisis de turnos y tendencias.",
      "Estadísticas de ingresos y clientes.",
      "Exportación de datos para análisis externos."
    ]
  },
  {
    title: "Acceso desde Cualquier Dispositivo",
    icon: <FaMobile className="text-3xl text-white" />,
    description: "Gestioná tu negocio en cualquier momento y lugar con acceso multiplataforma.",
    benefits: [
      "Compatibilidad con dispositivos móviles y de escritorio.",
      "Sincronización en tiempo real.",
      "Acceso seguro y encriptado."
    ]
  },
  {
    title: "Seguridad y Privacidad",
    icon: <FaLock className="text-3xl text-white" />,
    description: "Asegurá la información de tu negocio y tus clientes con nuestras medidas de seguridad avanzadas.",
    benefits: [
      "Protección de datos sensible.",
      "Copias de seguridad regulares.",
      "Cumplimiento con normativas de privacidad."
    ]
  }
];

export { services };

const service = [
  {
    title: "Gestioná tus Turnos",
    icon: <FaCalendarAlt  className="text-8xl p-6" />
  },
  {
    title: "Personalizá tu Página",
    icon: <FaPen className="text-8xl p-6" />,
  },
  {
    title: "Horarios Flexibles",
    icon: <FaClock className="text-8xl p-6" />,
  },
  {
    title: "Reportes Detallados",
    icon: <FaChartBar className="text-8xl p-6" />,
  },
  {
    title: "Acceso desde Cualquier Dispositivo",
    icon: <FaMobile className="text-8xl p-6" />,
  },
  {
    title: "Seguridad y Privacidad",
    icon: <FaLock className="text-8xl p-6" />,
  }
];

export { service };