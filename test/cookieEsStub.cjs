/**
 * cookie-es ships only `.mjs`, which Jest's CommonJS runtime cannot load. React Router imports it
 * for server-side cookie helpers only, which this client-side app never calls.
 */
const unavailable = () => {
  throw new Error('cookie-es is stubbed in Jest (server-side React Router API).')
}

module.exports = { parse: unavailable, serialize: unavailable, splitSetCookieString: unavailable }
