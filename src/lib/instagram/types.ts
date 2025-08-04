export interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
  username: string
  like_count?: number
  comments_count?: number
}

export interface InstagramApiResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

export interface InstagramTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface InstagramError {
  error: {
    message: string
    type: string
    code: number
  }
}