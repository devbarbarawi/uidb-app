import '@testing-library/jest-dom'
import 'jest-styled-components'

// Tests must mock fetch explicitly; nothing may reach the network.
globalThis.fetch = () => Promise.reject(new Error('fetch must be mocked in tests'))
