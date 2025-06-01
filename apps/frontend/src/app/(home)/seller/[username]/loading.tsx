export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="h-64 bg-muted rounded-lg animate-pulse mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
