import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-charcoal-dark border border-accent-orange/20"
          }
        }}
      />
    </div>
  )
}
