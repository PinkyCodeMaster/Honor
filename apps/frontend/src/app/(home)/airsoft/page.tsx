import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MapPin, Shield, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AirsoftPage() {
  const airsoftListings = [
    {
      id: 1,
      title: "Tokyo Marui AK-47 AEG with Upgrades",
      price: 450,
      condition: "Like New",
      subcategory: "Rifles & Guns",
      location: "Los Angeles, CA",
      seller: "TacticalGear_Pro",
      rating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "KWA Ronin T6 AEG 2.5 Gearbox",
      price: 380,
      condition: "Used - Fair",
      subcategory: "Rifles & Guns",
      location: "Seattle, WA",
      seller: "AirsoftEnthusiast",
      rating: 4.6,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      title: "Elite Force Glock 17 Gen4 GBB",
      price: 120,
      condition: "Used - Good",
      subcategory: "Pistols",
      location: "Chicago, IL",
      seller: "AirsoftCollector",
      rating: 4.7,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      title: "Krytac Trident CRB M4 AEG",
      price: 320,
      condition: "Like New",
      subcategory: "Rifles & Guns",
      location: "Dallas, TX",
      seller: "FieldOperator",
      rating: 4.8,
      verified: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 9,
      title: "ASG CZ P-09 CO2 Pistol",
      price: 85,
      condition: "Used - Good",
      subcategory: "Pistols",
      location: "Orlando, FL",
      seller: "AirsoftDealer",
      rating: 4.5,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 10,
      title: "G&G Combat Machine CM16 Raider",
      price: 180,
      condition: "Used - Fair",
      subcategory: "Rifles & Guns",
      location: "Portland, OR",
      seller: "BeginnerGear",
      rating: 4.3,
      verified: false,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const subcategories = [
    "All Airsoft",
    "Rifles & Guns",
    "Pistols",
    "Accessories",
    "Protective Gear",
    "Batteries & Chargers",
    "Magazines",
    "Optics & Scopes",
  ]

  return (
    <div className="min-h-screen bg-background">
     

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Airsoft Gear Marketplace</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the best airsoft rifles, pistols, and accessories from trusted sellers in the community
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search airsoft gear, brands, or models..." className="pl-10 pr-4 py-3 text-lg" />
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
            <li className="text-foreground font-medium">Airsoft</li>
          </ol>
        </nav>

        {/* Subcategories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((subcategory) => (
              <Button
                key={subcategory}
                variant={subcategory === "All Airsoft" ? "default" : "outline"}
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
            <h3 className="text-lg font-semibold">Airsoft Gear ({airsoftListings.length} items)</h3>
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
          {airsoftListings.map((listing) => (
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
          <h2 className="text-2xl font-bold mb-6">Popular Airsoft Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Tokyo Marui", "KWA", "Krytac", "G&G", "Elite Force", "ASG"].map((brand) => (
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
