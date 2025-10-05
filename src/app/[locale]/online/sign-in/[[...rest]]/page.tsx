import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <SignIn
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
