import { serializeJsonLd } from './json-ld';

describe('serializeJsonLd', () => {
  it('escapes less-than characters', () => {
    const result = serializeJsonLd({ name: '</script>' });
    expect(result).not.toContain('</script>');
    expect(result).toContain('\\u003c');
  });
});
