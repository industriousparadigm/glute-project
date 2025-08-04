// Rate limiter for Google API calls
const DAILY_LIMIT = 50 // Super conservative
const CACHE_DURATION = 3600000 // 1 hour

let requestCount = 0
let resetTime = Date.now() + 86400000 // 24 hours
let cache: { data: any; expires: number } | null = null

export function checkRateLimit() {
  // Reset counter daily
  if (Date.now() > resetTime) {
    requestCount = 0
    resetTime = Date.now() + 86400000
  }
  
  // Block if over limit
  if (requestCount >= DAILY_LIMIT) {
    throw new Error('Daily API limit reached for safety')
  }
  
  requestCount++
}

export function getCached() {
  if (cache && cache.expires > Date.now()) {
    return cache.data
  }
  return null
}

export function setCache(data: any) {
  cache = {
    data,
    expires: Date.now() + CACHE_DURATION
  }
}