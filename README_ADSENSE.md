# Configuración de Google AdSense

Este documento explica cómo activar Google AdSense en tu aplicación de Listening por Niveles.

## 📋 Requisitos Previos

Antes de configurar AdSense, asegúrate de tener:

1. ✅ Un dominio propio (AdSense no funciona con subdominios gratuitos como `.replit.app`)
2. ✅ Una cuenta de Google AdSense aprobada
3. ✅ Tu Publisher ID (formato: `pub-XXXXXXXXXXXXXXXX`)

## 🚀 Pasos para Activar AdSense

### 1. Actualizar ads.txt

Edita el archivo `/public/ads.txt` y reemplaza el placeholder con tu Publisher ID real:

```txt
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Reemplaza `XXXXXXXXXXXXXXXX` con tu Publisher ID real de 16 dígitos.

**Ejemplo:**
```txt
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

### 2. Añadir el Script de AdSense al Layout

Edita `app/layout.tsx` y añade el script de AdSense en la sección `<head>`:

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Script de AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {/* ... resto del código */}
      </body>
    </html>
  );
}
```

**¡Importante!** Reemplaza `XXXXXXXXXXXXXXXX` con tu Publisher ID real.

### 3. Actualizar el Componente AdSlot

Edita `components/AdSlot.tsx` para mostrar anuncios reales en lugar de placeholders:

```tsx
'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  slot: 'header' | 'sidebar' | 'in-content' | 'footer';
  className?: string;
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  // IDs de tus unidades de anuncio creadas en AdSense
  const adSlotIds = {
    header: 'XXXXXXXXXX',      // Tu Slot ID para header
    sidebar: 'YYYYYYYYYY',     // Tu Slot ID para sidebar
    'in-content': 'ZZZZZZZZZZ', // Tu Slot ID para in-content
    footer: 'WWWWWWWWWW',      // Tu Slot ID para footer
  };

  const sizes = {
    header: { width: 728, height: 90 },
    sidebar: { width: 300, height: 600 },
    'in-content': { width: 336, height: 280 },
    footer: { width: 728, height: 90 },
  };

  const size = sizes[slot];

  return (
    <div className={className} data-testid={`ad-slot-${slot}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlotIds[slot]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

**Configura:**
- Reemplaza `XXXXXXXXXXXXXXXX` con tu Publisher ID
- Reemplaza `XXXXXXXXXX`, `YYYYYYYYYY`, etc. con los Slot IDs de tus unidades de anuncio

## 📍 Ubicaciones de Anuncios

El sitio tiene placeholders para anuncios en estas ubicaciones:

### Home Page (`app/page.tsx`)

1. **Header Ad** - Encima del título principal
   - Desktop: 728×90 (Leaderboard)
   - Móvil: 320×50 (Mobile Banner)

2. **In-Content Ad** - Debajo de las tarjetas de nivel
   - 336×280 (Large Rectangle)
   - Responsive

3. **Footer Ad** - Al final de la página
   - 728×90 (Leaderboard)
   - Responsive

### Páginas de Nivel (`app/nivel/[slug]/page.tsx`)

1. **In-Content Ad** - Entre el título y el reproductor
   - 336×280 (Large Rectangle)

2. **Sidebar Ad** (Desktop) - Sticky en el lateral derecho
   - 300×600 (Half Page)
   - 300×250 (Medium Rectangle) como alternativa

## 🎯 Crear Unidades de Anuncio en AdSense

1. Ve a tu [panel de AdSense](https://www.google.com/adsense/)
2. Navega a **Anuncios** > **Por unidad de anuncio**
3. Crea una nueva unidad para cada ubicación:
   - **Header**: Display ad (Adaptable)
   - **Sidebar**: Display ad (300×600 o 300×250)
   - **In-Content**: Display ad (336×280 o Adaptable)
   - **Footer**: Display ad (Adaptable)
4. Copia el Slot ID de cada unidad y actualiza `AdSlot.tsx`

## ⚠️ Políticas Importantes de AdSense

Para mantener tu cuenta en buen estado:

### ✅ Permitido

- Contenido educativo de calidad
- Diseño limpio y navegable
- Anuncios claramente separados del contenido
- Cumplir con las políticas de AdSense

### ❌ Prohibido

- Hacer clic en tus propios anuncios
- Pedir a otros que hagan clic en los anuncios
- Contenido copiado o plagiado
- Contenido para adultos o ilegal
- Ocultar anuncios detrás de otros elementos

📖 Lee las [Políticas del Programa de AdSense](https://support.google.com/adsense/answer/48182)

## 🔍 Verificar la Configuración

1. **Verifica ads.txt**:
   - Visita: `https://tu-dominio.com/ads.txt`
   - Debe mostrar tu Publisher ID correctamente

2. **Verifica el script**:
   - Abre las herramientas de desarrollador (F12)
   - Ve a la pestaña Network
   - Busca peticiones a `googlesyndication.com`
   - Deben cargarse sin errores

3. **Verifica los anuncios**:
   - Los anuncios pueden tardar 24-48 horas en aparecer
   - Inicialmente verás anuncios en blanco o de prueba
   - No hagas clic en tus propios anuncios para probar

## 📊 Cumulative Layout Shift (CLS)

Los contenedores de anuncios están diseñados para minimizar CLS:

- `min-h-[Xpx]` reserva espacio antes de que el anuncio cargue
- Evita que el contenido salte cuando los anuncios aparecen
- Mejora la experiencia del usuario y el SEO

## 🛠️ Troubleshooting

### Los anuncios no aparecen

1. ✅ Verifica que tu cuenta de AdSense esté aprobada
2. ✅ Confirma que estás usando un dominio propio (no `.replit.app`)
3. ✅ Espera 24-48 horas después de añadir el código
4. ✅ Revisa la consola del navegador en busca de errores
5. ✅ Verifica que el archivo ads.txt sea accesible

### Error: "AdSense account not approved"

- Tu cuenta de AdSense debe estar completamente aprobada
- El dominio debe estar verificado en AdSense
- Puede tardar varios días después de la solicitud

### Error: "Invalid ad unit"

- Verifica que los Slot IDs sean correctos
- Asegúrate de que las unidades de anuncio estén activas en AdSense

## 💡 Mejores Prácticas

1. **No sobrecargues de anuncios**: Mantén un equilibrio entre contenido y publicidad
2. **Posicionamiento estratégico**: Los anuncios deben ser visibles pero no intrusivos
3. **Mobile-first**: Optimiza la experiencia móvil (más del 60% del tráfico)
4. **Rendimiento**: Monitorea que los anuncios no ralenticen el sitio
5. **Cumplimiento**: Revisa regularmente las políticas de AdSense

## 📈 Maximizar Ingresos

- Usa anuncios adaptativos cuando sea posible
- Experimenta con diferentes ubicaciones
- Mantén contenido de calidad y actualizado
- Aumenta el tráfico mediante SEO
- Analiza reportes en el panel de AdSense

## 🔐 Seguridad

- **Nunca compartas** tu Publisher ID en repositorios públicos
- Usa variables de entorno para IDs sensibles en producción
- Revisa regularmente la actividad de tu cuenta

## 📞 Soporte

Si tienes problemas con AdSense:

1. Consulta el [Centro de Ayuda de AdSense](https://support.google.com/adsense/)
2. Visita el [Foro de la Comunidad de AdSense](https://support.google.com/adsense/community)
3. Contacta directamente con el soporte de Google AdSense

---

¡Buena suerte con la monetización de tu sitio educativo! 🎉
