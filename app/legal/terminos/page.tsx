import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Spanish Listening',
  description: 'Términos y condiciones de uso de Spanish Listening',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>Términos y Condiciones</h1>
        
        <p className="text-muted-foreground">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2>1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar Spanish Listening, aceptas estar sujeto a estos términos y 
          condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes usar 
          nuestro servicio.
        </p>

        <h2>2. Uso del Servicio</h2>
        <p>
          Spanish Listening proporciona materiales educativos gratuitos para la práctica de 
          comprensión auditiva en español. Te concedemos una licencia limitada, no exclusiva y 
          no transferible para acceder y usar el servicio para fines personales y educativos.
        </p>

        <h2>3. Contenido Educativo</h2>
        <p>
          Todo el contenido proporcionado (audios, transcripciones, vocabulario, quizzes) es con 
          fines educativos. Nos esforzamos por mantener la precisión del contenido, pero no 
          garantizamos que esté libre de errores.
        </p>

        <h2>4. Propiedad Intelectual</h2>
        <p>
          Todo el contenido, diseño, código y materiales en este sitio están protegidos por derechos 
          de autor y otras leyes de propiedad intelectual. No puedes reproducir, distribuir o crear 
          trabajos derivados sin permiso expreso.
        </p>

        <h2>5. Almacenamiento Local</h2>
        <p>
          El servicio utiliza el almacenamiento local de tu navegador para guardar tu progreso y 
          preferencias. Eres responsable de mantener la seguridad de tu dispositivo. Podemos borrar 
          o modificar estos datos según sea necesario.
        </p>

        <h2>6. Publicidad</h2>
        <p>
          Este sitio muestra anuncios a través de Google AdSense. No controlamos el contenido de 
          estos anuncios y no somos responsables de las prácticas de privacidad de los anunciantes.
        </p>

        <h2>7. Limitación de Responsabilidad</h2>
        <p>
          Spanish Listening se proporciona "tal cual" sin garantías de ningún tipo. No seremos 
          responsables de ningún daño directo, indirecto, incidental o consecuente que surja del uso 
          o la imposibilidad de usar el servicio.
        </p>

        <h2>8. Enlaces Externos</h2>
        <p>
          Nuestro servicio puede contener enlaces a sitios web de terceros. No somos responsables 
          del contenido o las prácticas de privacidad de estos sitios externos.
        </p>

        <h2>9. Modificaciones del Servicio</h2>
        <p>
          Nos reservamos el derecho de modificar o discontinuar el servicio (o cualquier parte del 
          mismo) en cualquier momento sin previo aviso.
        </p>

        <h2>10. Cambios a los Términos</h2>
        <p>
          Podemos actualizar estos términos ocasionalmente. El uso continuado del servicio después 
          de los cambios constituye tu aceptación de los nuevos términos.
        </p>

        <h2>11. Ley Aplicable</h2>
        <p>
          Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin tener 
          en cuenta sus disposiciones sobre conflictos de leyes.
        </p>

        <h2>12. Contacto</h2>
        <p>
          Si tienes preguntas sobre estos términos y condiciones, contáctanos a través de los 
          canales proporcionados en el sitio web.
        </p>
      </article>
    </div>
  );
}
