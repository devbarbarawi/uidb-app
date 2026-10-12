/**
 * Escapes a URL for use in a CSS `url()` declaration. Vite inlines small SVGs as data URIs that
 * contain single quotes, which would end a hand-written `url('…')` early and drop the rule.
 * @param url The URL to escape.
 * @returns The escaped CSS `url()` declaration.
 */

export const escapeCssUrl = (url: string) =>
  `url("${url.replace(/["\\\n]/g, (char) => (char === '\n' ? '\\a ' : `\\${char}`))}")`
