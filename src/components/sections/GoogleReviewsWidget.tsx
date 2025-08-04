'use client'

export function GoogleReviewsWidget() {
  return (
    <div className="w-full">
      {/* Google's official review widget */}
      <script src="https://widget.trustmary.com/XYZ123" /> {/* Replace with your widget ID */}
      
      {/* Or use an iframe */}
      <iframe
        src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}