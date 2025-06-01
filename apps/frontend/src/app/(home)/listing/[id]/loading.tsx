export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Image skeleton */}
            <div className="aspect-[4/3] bg-muted rounded-lg animate-pulse" />

            {/* Description skeleton */}
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Purchase card skeleton */}
            <div className="h-96 bg-muted rounded-lg animate-pulse" />

            {/* Seller card skeleton */}
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
