/**
 * Serializes JSON-LD for safe embedding in a <script> tag.
 * Escapes `<` to prevent breaking out of the script context (e.g. </script>).
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
