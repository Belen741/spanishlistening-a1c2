import { NextResponse } from 'next/server';
import { getResendClient } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, type } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      );
    }

    const { client, fromEmail } = await getResendClient();

    const typeLabel = type === 'suggestion' ? 'Sugerencia' : 'Comentario';
    
    await client.emails.send({
      from: fromEmail,
      to: 'hablandoconbelen@gmail.com',
      subject: `[Spanish Listening] ${typeLabel} de ${name || 'Anónimo'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nuevo ${typeLabel.toLowerCase()}</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Tipo:</strong> ${typeLabel}</p>
            <p><strong>Nombre:</strong> ${name || 'No proporcionado'}</p>
            <p><strong>Email:</strong> ${email || 'No proporcionado'}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Enviado desde Spanish Listening
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
