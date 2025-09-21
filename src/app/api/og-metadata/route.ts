import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GluteProject/1.0)'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()

    // Extract Open Graph metadata using regex
    const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/) ||
                    html.match(/<meta\s+name="twitter:title"\s+content="([^"]*)"/) ||
                    html.match(/<title>([^<]*)<\/title>/)

    const ogDescription = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/) ||
                         html.match(/<meta\s+name="twitter:description"\s+content="([^"]*)"/) ||
                         html.match(/<meta\s+name="description"\s+content="([^"]*)"/);

    const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/) ||
                   html.match(/<meta\s+name="twitter:image"\s+content="([^"]*)"/);

    const siteName = html.match(/<meta\s+property="og:site_name"\s+content="([^"]*)"/);

    // Clean up extracted text
    const cleanText = (text: string) => {
      return text
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()
    }

    const metadata = {
      title: ogTitle?.[1] ? cleanText(ogTitle[1]) : new URL(url).hostname,
      description: ogDescription?.[1] ? cleanText(ogDescription[1]) : '',
      image: ogImage?.[1] || null,
      siteName: siteName?.[1] ? cleanText(siteName[1]) : new URL(url).hostname,
      url: url
    }

    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Error fetching OG metadata:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    )
  }
}