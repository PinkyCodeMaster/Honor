import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MapPin, Shield, Filter, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"

export default function RealsteelPage() {
  const realsteelListings = [
    {
      id: 3,
      title: "Vortex Viper PST Gen II 5-25x50",
      price: 650,
      condition: "New",
      subcategory: "Optics",
      location: "Phoenix, AZ",
      seller: "OpticsPro",
      rating: 5.0,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Magpul MBUS Pro Sight Set",
      price: 120,
      condition: "Like New",
      subcategory: "Accessories",
      location: "Miami, FL",
      seller: "TacticalSupply",
      rating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 15,
      title: "Aimpoint PRO Red Dot Sight",
      price: 380,
      condition: "Used - Good",
      subcategory: "Optics",
      location: "Nashville, TN",
      seller: "PrecisionShooter",
      rating: 4.8,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 16,
      title: "Safariland 6354DO Holster",
      price: 85,
      condition: "Like New",
      subcategory: "Holsters & Cases",
      location: "Colorado Springs, CO",
      seller: "TacticalGearDealer",
      rating: 4.7,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 17,
      title: "Geissele Super Dynamic 3-Gun Trigger",
      price: 240,
      condition: "New",
      subcategory: "Accessories",
      location: "Virginia Beach, VA",
      seller: "GunsmithPro",
      rating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 18,
      title: "Otis Elite Cleaning System",
      price: 45,
      condition: "Used - Good",
      subcategory: "Maintenance Tools",
      location: "Boise, ID",
      seller: "MaintenanceGuru",
      rating: 4.6,
      verified: false,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const subcategories = [
    "All Realsteel",
    "Optics",
    "Accessories",
    "Holsters & Cases",
    "Maintenance Tools",
    "Grips & Stocks",
    "Magazines",
    "Training Equipment",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-primary">
                TacticalMarket
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/airsoft" className="text-muted-foreground hover:text-foreground">
                  Airsoft
                </Link>
                <Link href="/paintball" className="text-muted-foreground hover:text-foreground">
                  Paintball
                </Link>
                <Link href="/realsteel" className="text-foreground font-medium">
                  Realsteel
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/list-item">List Your Gear</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Realsteel Accessories & Optics</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium optics, accessories, and components from verified sellers with proper documentation
            </p>
          </div>

          {/* Legal Notice */}
          <Alert className="max-w-4xl mx-auto mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> All realsteel transactions must comply with federal, state, and local laws.
              Buyers and sellers are responsible for ensuring legal compliance. No firearms or ammunition sales.
            </AlertDescription>
          </Alert>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search optics, accessories, or components..." className="pl-10 pr-4 py-3 text-lg" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">Search</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Realsteel</li>
          </ol>
        </nav>

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={subcategory === "All Realsteel" ? "default" : "outline"}
                className="mb-2"
              >
                {subcategory}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters and Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">Realsteel Accessories ({realsteelListings.length} items)</h3>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          <Button variant="outline" asChild>
            <Link href="/browse">View All Categories</Link>
          </Button>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {realsteelListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2" variant="secondary">
                  {listing.subcategory}
                </Badge>
                <Badge className="absolute top-2 right-2" variant="outline">
                  {listing.condition}
                </Badge>
                {listing.verified && (
                  <Badge className="absolute bottom-2 right-2 bg-green-500">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title}</h4>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-primary">${listing.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{listing.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{listing.seller}</span>
                    {listing.verified && <Shield className="h-4 w-4 text-green-500" />}
                  </div>
                </div>

                <Button className="w-full mt-4" asChild>
                  <Link href={`/listing/${listing.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Brands */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Popular Realsteel Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Vortex", "Aimpoint", "Magpul", "Geissele", "Safariland", "Otis"].map((brand) => (
              <Card key={brand} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="text-center py-4">
                  <CardTitle className="text-sm">{brand}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
