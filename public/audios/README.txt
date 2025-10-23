COLOCA TUS ARCHIVOS DE AUDIO MP3 AQUÍ
=======================================

Los archivos JSON en /content hacen referencia a archivos de audio que deben 
estar en esta carpeta.

Ejemplos de nombres de archivo esperados:
- a1-supermercado.mp3
- a2-medico.mp3
- b1-apartamento.mp3
- b2-entrevista.mp3
- c1-energias.mp3
- c2-neuroplasticidad.mp3

Puedes nombrarlos como quieras, solo asegúrate de actualizar la ruta 
"audioSrc" en el archivo JSON correspondiente.

Ejemplo:
Si tu archivo se llama "mi-audio-a1.mp3", actualiza a1.json:

{
  "audioSrc": "/audios/mi-audio-a1.mp3",
  ...
}

Nota: Los archivos de audio NO están incluidos en el repositorio.
Debes proporcionar tus propios archivos MP3.
