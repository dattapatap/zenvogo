/**
 * Renders schema.org structured data as a JSON-LD <script> (server-rendered, so crawlers and
 * AI engines see it in the HTML). `<` is escaped to prevent script injection.
 * Pass one object or an array of objects.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
