type JsonLdScriptsProps = {
  schemas: Record<string, unknown>[];
};

export function JsonLdScripts({ schemas }: JsonLdScriptsProps) {
  return schemas.map((schema, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ));
}
