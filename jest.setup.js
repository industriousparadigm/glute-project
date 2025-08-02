// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Fix for TextEncoder/TextDecoder not being available in jsdom
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock NextResponse for API route testing
jest.mock('next/server', () => ({
  NextRequest: global.Request,
  NextResponse: {
    json: (body, init) => {
      const response = new Response(JSON.stringify(body), {
        ...init,
        headers: {
          'content-type': 'application/json',
          ...init?.headers
        }
      })
      return response
    }
  }
}))

// Polyfill for Request/Response for Next.js API route testing
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init) {
      // Store URL as a private property
      this._url = input
      this.method = init?.method || 'GET'
      this.body = init?.body
      
      // Create a Headers object with get method
      const headerEntries = Object.entries(init?.headers || {})
      this.headers = {
        get: (key) => {
          const entry = headerEntries.find(([k]) => k.toLowerCase() === key.toLowerCase())
          return entry ? entry[1] : null
        }
      }
      
      // Define url as a getter
      Object.defineProperty(this, 'url', {
        get: function() {
          return this._url
        },
        enumerable: true,
        configurable: true
      })
    }
    
    async json() {
      return JSON.parse(this.body)
    }
  }
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body
      this.status = init?.status || 200
      this.headers = new Map(Object.entries(init?.headers || {}))
    }
    
    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    }
  }
}