# Listening por Niveles

Una aplicación web educativa para practicar comprensión auditiva en español, organizada por niveles CEFR (A1-C2).

## 🎯 Características

- **6 niveles CEFR**: A1, A2, B1, B2, C1, C2
- **Componentes interactivos**:
  - Reproductor de audio HTML5 con controles avanzados
  - Transcripciones colapsables con búsqueda de texto
  - Listas de vocabulario con tooltips y copia rápida
  - Quizzes evaluables (opción única y múltiple)
- **Almacenamiento local**: Los resultados se guardan en localStorage
- **SEO optimizado**: Metadata, sitemap.xml, robots.txt
- **AdSense ready**: Placeholders para anuncios (ver README_ADSENSE.md)
- **Modo oscuro**: Tema claro/oscuro con persistencia
- **Responsive**: Diseño adaptable a móvil, tablet y desktop

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

### Compilación para producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
listening-niveles/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal (home)
│   ├── layout.tsx         # Layout global
│   ├── globals.css        # Estilos globales
│   ├── nivel/
│   │   └── [slug]/
│   │       └── page.tsx   # Páginas dinámicas de nivel
│   ├── legal/
│   │   ├── privacidad/    # Política de privacidad
│   │   └── terminos/      # Términos y condiciones
│   ├── robots.ts          # Configuración de robots.txt
│   └── sitemap.ts         # Generación de sitemap.xml
├── components/            # Componentes React reutilizables
│   ├── LevelCard.tsx      # Tarjeta de nivel
│   ├── AudioPlayer.tsx    # Reproductor de audio
│   ├── Transcript.tsx     # Transcripción colapsable
│   ├── VocabList.tsx      # Lista de vocabulario
│   ├── Quiz.tsx           # Quiz evaluable
│   ├── AdSlot.tsx         # Contenedor de anuncios
│   ├── ThemeProvider.tsx  # Proveedor de tema
│   └── ThemeToggle.tsx    # Botón cambiar tema
├── content/               # Archivos JSON de contenido
│   ├── a1.json           # Contenido nivel A1
│   ├── a2.json           # Contenido nivel A2
│   ├── b1.json           # Contenido nivel B1
│   ├── b2.json           # Contenido nivel B2
│   ├── c1.json           # Contenido nivel C1
│   └── c2.json           # Contenido nivel C2
├── lib/                   # Utilidades
│   └── levels.ts          # Configuración de niveles
├── types/                 # Tipos TypeScript
│   └── level.ts           # Interfaces de nivel
├── public/                # Archivos estáticos
│   ├── audios/           # Archivos de audio MP3 (coloca aquí tus audios)
│   ├── images/           # Imágenes
│   └── ads.txt           # Archivo ads.txt para AdSense
└── README_ADSENSE.md      # Instrucciones para configurar AdSense
```

## 🎵 Añadir Audios

1. Coloca tus archivos de audio MP3 en `/public/audios/`
2. Nombra los archivos según el nivel y título (ej: `a1-supermercado.mp3`)
3. Actualiza la ruta en el archivo JSON correspondiente:

```json
{
  "audioSrc": "/audios/a1-supermercado.mp3"
}
```

## 📝 Editar Contenido

Cada nivel tiene su propio archivo JSON en `/content/`:

```json
{
  "title": "A1 — En el supermercado",
  "audioSrc": "/audios/a1-supermercado.mp3",
  "transcript": "Texto completo de la transcripción...",
  "vocab": [
    {
      "term": "la caja",
      "meaning": "checkout"
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "type": "single",
      "question": "¿Dónde ocurre la historia?",
      "options": ["Escuela", "Supermercado", "Hospital", "Banco"],
      "answerIndex": 1,
      "explanation": "La historia ocurre en un supermercado..."
    }
  ]
}
```

### Tipos de Preguntas

- `"type": "single"` - Una sola respuesta correcta (radio buttons)
- `"type": "multiple"` - Múltiples respuestas correctas (checkboxes)

Para preguntas de opción múltiple, usa un array en `answerIndex`:

```json
{
  "type": "multiple",
  "answerIndex": [0, 2, 3]
}
```

## 🎨 Personalización

### Colores

Edita los tokens de diseño en `app/globals.css`:

```css
:root {
  --primary: 59 91% 47%;        /* Color principal */
  --background: 0 0% 100%;      /* Fondo */
  --foreground: 222 47% 11%;    /* Texto */
  /* ... más colores */
}
```

### Niveles

Para añadir, modificar o eliminar niveles, edita `lib/levels.ts`:

```typescript
export const LEVELS: LevelInfo[] = [
  {
    slug: 'a1',
    name: 'A1',
    description: 'Principiante...',
    color: 'hsl(180 70% 50%)',
  },
  // ... más niveles
];
```

## 💰 AdSense

Para activar AdSense cuando tengas tu ID de publicación:

1. Lee `README_ADSENSE.md`
2. Actualiza `pub-XXXXXXXXXXXXXXXX` en `/public/ads.txt`
3. Sigue las instrucciones del README de AdSense

## 📊 Performance

El sitio está optimizado para carga rápida:

- ✅ Code-splitting automático con next/dynamic
- ✅ Sin prefetch en enlaces de niveles
- ✅ Componentes pesados con carga diferida
- ✅ JSON separado por nivel
- ✅ Suspense boundaries para mejor UX
- ✅ Imágenes optimizadas con Sharp

## 🔒 Privacidad

- Los datos se almacenan únicamente en localStorage del navegador
- No se envía información personal a servidores
- Ver `/legal/privacidad` para más detalles

## 📄 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📞 Soporte

Para preguntas o problemas, contacta a través de los canales indicados en el sitio web.

---

Hecho con ❤️ para estudiantes de español
