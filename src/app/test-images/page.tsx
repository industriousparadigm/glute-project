export default function TestImages() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Testing Image Loading</h1>
      
      <h2 className="text-xl mb-2">Direct img tag:</h2>
      <img src="/images/logo.jpg" alt="Test logo" width={200} height={200} className="mb-4" />
      
      <h2 className="text-xl mb-2">Next/Image component:</h2>
      <div className="space-y-4">
        <div>
          <p>Logo:</p>
          <img src="/images/logo.jpg" alt="Logo" width={100} height={100} />
        </div>
        <div>
          <p>Gym image:</p>
          <img src="/images/gym-weights-area.jpg" alt="Gym" width={300} height={200} />
        </div>
      </div>
      
      <h2 className="text-xl mb-2 mt-4">All paths being tested:</h2>
      <ul className="list-disc ml-6">
        <li>/images/logo.jpg</li>
        <li>/images/gym-weights-area.jpg</li>
        <li>/images/gym-cardio-zone.jpg</li>
      </ul>
    </div>
  );
}