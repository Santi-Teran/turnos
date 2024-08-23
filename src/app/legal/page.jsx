import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

const LegalPage = () => {
  return (
    <div>
      <NavBar />
      <div className={`${inter.className} px-4 max-w-4xl mx-auto py-20`}>
        <h1 className="text-3xl font-bold mb-4">Políticas de Privacidad</h1>
        <p className="mt-4">
          En Turnover, operado por Marea Tech, valoramos tu privacidad y estamos
          comprometidos a proteger la información personal que compartes con
          nosotros. Esta política describe cómo recopilamos, usamos y protegemos
          tus datos.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          1. Información que Recopilamos
        </h2>
        <p>
          <strong>Usuario Negocio:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>
            Datos personales: Nombre, correo electrónico, dirección, y
            contraseña.
          </li>
          <li>
            Datos del negocio: Nombre del negocio, descripción, misión, visión,
            historia, logo, moneda, idioma, Instagram, teléfono, horarios de
            apertura y cierre, horarios de descanso.
          </li>
          <li>
            Datos de servicios: Servicios ofrecidos, feriados y otros detalles
            relevantes para la gestión de citas.
          </li>
        </ul>
        <p className="mt-4">
          <strong>Usuario Cliente:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>Datos personales: Nombre y número de teléfono.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">
          2. Uso de la Información
        </h2>
        <p>
          Datos del Usuario Negocio: Utilizamos esta información para la
          personalización del dashboard, gestión de notificaciones, y seguridad.
        </p>
        <p>
          Datos del Usuario Cliente: Estos datos se utilizan para la reserva de
          turnos y para facilitar la comunicación entre el negocio y el cliente.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          3. Procesamiento de Pagos
        </h2>
        <p>
          Utilizamos MercadoPago como servicio de terceros para el procesamiento
          de pagos. Los datos relacionados con el pago son gestionados
          exclusivamente por MercadoPago bajo sus propias políticas de
          privacidad.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          4. Protección de la Información
        </h2>
        <p>
          Implementamos medidas de seguridad como el uso de contraseñas y tokens
          de sesión para proteger la información de los usuarios. El acceso a
          los datos personales es restringido y solo utilizado para los fines
          establecidos en esta política.
        </p>

        <h2 className="text-2xl font-semibold mt-6">5. Derechos del Usuario</h2>
        <p>
          Los usuarios negocios pueden modificar la información de su negocio
          desde el dashboard. Sin embargo, no pueden modificar sus datos
          personales como nombre, correo electrónico, o dirección directamente
          desde la plataforma. Los usuarios pueden solicitar la eliminación de
          sus datos poniéndose en contacto con nosotros.
        </p>

        <h2 className="text-2xl font-semibold mt-6">6. Retención de Datos</h2>
        <p>
          Retenemos los datos de los usuarios hasta que soliciten la baja del
          servicio.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          7. Cambios en la Política
        </h2>
        <p>
          Nos reservamos el derecho de modificar esta política de privacidad.
          Notificaremos a los usuarios negocios de cualquier cambio a través del
          correo electrónico registrado.
        </p>

        <h2 className="text-2xl font-semibold mt-6">8. Contacto</h2>
        <p>
          Para preguntas o inquietudes, puedes contactarnos en
          [correo@mareatech.com].
        </p>

        <h1 className="text-3xl font-bold mt-10 mb-4">
          Condiciones del Servicio
        </h1>
        <p>
          <strong>Fecha de entrada en vigor:</strong> [Fecha]
        </p>
        <p className="mt-4">
          Bienvenido a Turnover, un servicio ofrecido por Marea Tech. Al usar
          nuestra plataforma, aceptas cumplir con los términos y condiciones que
          se describen a continuación.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          1. Descripción del Servicio
        </h2>
        <p>
          Turnover es una plataforma online que permite a los negocios gestionar
          y programar citas de manera eficiente y permite a los clientes de
          estos negocios reservar turnos.
        </p>

        <h2 className="text-2xl font-semibold mt-6">2. Registro y Cuentas</h2>
        <p>
          Para utilizar Turnover, los usuarios negocios deben registrarse
          proporcionando su nombre, correo electrónico, dirección, y otra
          información relevante para la personalización de su perfil de negocio.
          Los usuarios son responsables de mantener la confidencialidad de su
          cuenta y contraseña.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          3. Pagos y Suscripciones
        </h2>
        <p>
          El servicio de Turnover es ofrecido bajo un modelo de suscripción
          mensual. Los usuarios negocios deben realizar el pago correspondiente
          para mantener el acceso a la plataforma. En caso de impago, el acceso
          al servicio será suspendido hasta que se regularice la situación. No
          se ofrecerán reembolsos por pagos ya realizados.
        </p>

        <h2 className="text-2xl font-semibold mt-6">4. Uso Aceptable</h2>
        <p>
          Los usuarios negocios deben utilizar la plataforma de manera legal y
          ética. Queda prohibido el uso de Turnover para actividades ilícitas,
          fraudulentas o que violen los derechos de terceros.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          5. Modificaciones y Terminación del Servicio
        </h2>
        <p>
          Nos reservamos el derecho de modificar o discontinuar el servicio en
          cualquier momento. En caso de cambios significativos, los usuarios
          negocios serán notificados por correo electrónico.
        </p>

        <h2 className="text-2xl font-semibold mt-6">
          6. Jurisdicción y Ley Aplicable
        </h2>
        <p>
          Estos términos se regirán e interpretarán de acuerdo con las leyes de
          la República Argentina.
        </p>

        <h2 className="text-2xl font-semibold mt-6">7. Contacto</h2>
        <p>
          Para cualquier consulta sobre estos términos, puedes comunicarte con
          nosotros en [correo@mareatech.com].
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default LegalPage;
