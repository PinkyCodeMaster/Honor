import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MapPin, Shield, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PaintballPage() {
  const paintballListings = [
    {
      id: 2,
      title: "Planet Eclipse CS2 Pro Marker",
      price: 1200,
      condition: "Used - Good",
      subcategory: "Markers",
      location: "Austin, TX",
      seller: "PaintballKing",
      rating: 4.8,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Dye i5 Paintball Mask - Thermal Lens",
      price: 150,
      condition: "Used - Good",
      subcategory: "Masks & Goggles",
      location: "Denver, CO",
      seller: "GearCollector",
      rating: 4.7,
      verified: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 11,
      title: "Empire Axe 2.0 Paintball Gun",
      price: 450,
      condition: "Like New",
      subcategory: "Markers",
      location: "Atlanta, GA",
      seller: "PaintballPro",
      rating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 12,
      title: "Virtue Spire III Loader",
      price: 180,
      condition: "New",
      subcategory: "Pods & Loaders",
      location: "Phoenix, AZ",
      seller: "SpeedballGear",
      rating: 4.8,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 13,
      title: "HK Army Zero G Harness 4+3",
      price: 65,
      condition: "Used - Good",
      subcategory: "Clothing",
      location: "San Diego, CA",
      seller: "TournamentPlayer",
      rating: 4.6,
      verified: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 14,
      title: "Ninja SL2 68/4500 Carbon Tank",
      price: 220,
      condition: "Like New",
      subcategory: "Tanks & Hoses",
      location: "Tampa, FL",
      seller: "PaintballSupply",
      rating: 4.7,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const subcategories = [
    "All Paintball",
    "Markers",
    "Pods & Loaders",
    "Clothing",
    "Masks & Goggles",
    "Tanks & Hoses",
    "Barrels",
    "Accessories",
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
                <Link href="/paintball" className="text-foreground font-medium">
                  Paintball
                </Link>
                <Link href="/realsteel" className="text-muted-foreground hover:text-foreground">
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
            <h1 className="text-4xl font-bold mb-4">Paintball Gear Marketplace</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover top-quality paintball markers, masks, and equipment from fellow players
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search paintball markers, gear, or brands..." className="pl-10 pr-4 py-3 text-lg" />
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
            <li className="text-foreground font-medium">Paintball</li>
          </ol>
        </nav>

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={subcategory === "All Paintball" ? "default" : "outline"}
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
            <h3 className="text-lg font-semibold">Paintball Gear ({paintballListings.length} items)</h3>
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
          {paintballListings.map((listing) => (
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
          <h2 className="text-2xl font-bold mb-6">Popular Paintball Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Planet Eclipse", "Dye", "Empire", "Virtue", "HK Army", "Ninja"].map((brand) => (
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
