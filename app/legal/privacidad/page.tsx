import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Spanish Listening',
  description: 'Política de privacidad y protección de datos de Spanish Listening',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>Política de Privacidad</h1>
        
        <p className="text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2>1. Información General</h2>
        <p>
          En Spanish Listening, respetamos tu privacidad y estamos comprometidos con la protección 
          de tus datos personales. Esta política de privacidad describe cómo recopilamos, usamos y 
          protegemos tu información.
        </p>

        <h2>2. Información que Recopilamos</h2>
        <p>
          Nuestro sitio web utiliza almacenamiento local del navegador (localStorage) para guardar:
        </p>
        <ul>
          <li>Resultados de quizzes completados</li>
          <li>Preferencias de tema (modo claro/oscuro)</li>
          <li>Progreso de aprendizaje</li>
        </ul>
        <p>
          Esta información se almacena únicamente en tu dispositivo y no se envía a ningún servidor.
        </p>

        <h2>3. Uso de Google AdSense</h2>
        <p>
          Este sitio web utiliza Google AdSense para mostrar anuncios. Google puede utilizar cookies 
          y tecnologías similares para:
        </p>
        <ul>
          <li>Mostrar anuncios personalizados basados en tus intereses</li>
          <li>Medir la efectividad de los anuncios</li>
          <li>Prevenir fraude publicitario</li>
        </ul>
        <p>
          Puedes administrar tus preferencias de anuncios visitando{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Configuración de anuncios de Google
          </a>.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Utilizamos cookies esenciales para el funcionamiento del sitio. Las cookies de terceros 
          (Google AdSense) se utilizan para publicidad. Puedes configurar tu navegador para rechazar 
          cookies, aunque esto puede afectar la funcionalidad del sitio.
        </p>

        <h2>5. Tus Derechos</h2>
        <p>Tienes derecho a:</p>
        <ul>
          <li>Acceder a tu información personal</li>
          <li>Borrar tus datos (limpiando el localStorage de tu navegador)</li>
          <li>Optar por no participar en la publicidad personalizada</li>
        </ul>

        <h2>6. Cambios a Esta Política</h2>
        <p>
          Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre 
          cambios significativos publicando la nueva política en esta página.
        </p>

        <h2>7. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política de privacidad, contáctanos a través de los 
          canales proporcionados en el sitio web.
        </p>
      </article>
    </div>
  );
}
