function toHtml(text: string) {
  // 1) Preservar tags <mark> existentes del search (si los hay)
  //    Reemplazarlos temporalmente con placeholders
  const markPlaceholder = '\u0000MARK\u0000';
  const markEndPlaceholder = '\u0000/MARK\u0000';
  const textWithPlaceholders = text
    .replace(/<mark class="[^"]*">/g, markPlaceholder)
    .replace(/<\/mark>/g, markEndPlaceholder);

  // 2) Escapar HTML básico para seguridad
  const escapedText = textWithPlaceholders
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 3) Restaurar los tags <mark>
  const withMarks = escapedText
    .replace(new RegExp(markPlaceholder, 'g'), '<mark class="bg-primary/30 rounded px-0.5">')
    .replace(new RegExp(markEndPlaceholder, 'g'), '</mark>');

  // 4) Poner en negritas el "Nombre:" al inicio de línea
  const withBoldSpeakers = withMarks.replace(
    /(^|\n)([A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚñáéíóú]+):/g,
    (_m, br, name) => `${br}<strong>${name}:</strong>`
  );

  // 5) Convertir saltos de línea a <br>
  return withBoldSpeakers.replace(/\n/g, "<br>");
}

interface FormattedDialogueProps {
  value: string;
}

export default function FormattedDialogue({ value }: FormattedDialogueProps) {
  return (
    <div
      className="prose dark:prose-invert dialogue"
      style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
      dangerouslySetInnerHTML={{ __html: toHtml(value) }}
    />
  );
}
