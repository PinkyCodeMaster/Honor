import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Shield, Star, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const featuredListings = [
    {
      id: 1,
      title: "Tokyo Marui AK-47 AEG",
      price: 450,
      condition: "Like New",
      category: "Airsoft",
      location: "Los Angeles, CA",
      seller: "TacticalGear_Pro",
      rating: 4.9,
      verified: true,
      image: "/tokyo-marui-ak-47-aeg.jpeg",
    },
    {
      id: 2,
      title: "Planet Eclipse CS2 Pro Marker",
      price: 1200,
      condition: "Used - Good",
      category: "Paintball",
      location: "Austin, TX",
      seller: "PaintballKing",
      rating: 4.8,
      verified: true,
      image: "/planet-eclipse-cs2-pro-marker.png",
    },
    {
      id: 3,
      title: "Vortex Viper PST Gen II 5-25x50",
      price: 650,
      condition: "New",
      category: "Realsteel",
      location: "Phoenix, AZ",
      seller: "OpticsPro",
      rating: 5.0,
      verified: true,
      image: "/vortex-viper-pst-gen-Ii-525X50.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">The Premier Marketplace for Tactical Gear</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Buy and sell airsoft, paintball, and realsteel equipment with confidence. Verified sellers, secure
            transactions, and a community you can trust.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search for gear, brands, or categories..." className="pl-10 pr-4 py-3 text-lg" />
              <Button className="absolute right-0 top-1/2 transform -translate-y-1/2">Search</Button>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/airsoft">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🔫</span>
                  </div>
                  <CardTitle>Airsoft</CardTitle>
                  <CardDescription>Electric, gas, and spring-powered replicas</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/paintball">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <CardTitle>Paintball</CardTitle>
                  <CardDescription>Markers, gear, and accessories</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/realsteel">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <CardTitle>Realsteel</CardTitle>
                  <CardDescription>Optics, accessories, and components</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold">Featured Listings</h3>
            <Button variant="outline" asChild>
              <Link href="/browse">View All</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <Link href={`/listings/${listing.id}`} key={listing.id}>
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image src={listing.image || "/placeholder.svg"} alt={listing.title} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                    <Badge className="absolute top-2 left-2" variant="secondary">
                      {listing.category}
                    </Badge>
                    <Badge className="absolute top-2 right-2" variant="outline">
                      {listing.condition}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title}</h4>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-primary">£{listing.price}</span>
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

                    <Button className="w-full mt-4">View Details</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section >

      {/* Trust & Safety Section */}
      <section className="bg-muted/50 py-16" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trade with Confidence</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive trust and safety systems protect every transaction
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Verified Sellers</h4>
              <p className="text-sm text-muted-foreground">Identity verification and background checks</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Secure Payments</h4>
              <p className="text-sm text-muted-foreground">Escrow protection and fraud monitoring</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Review System</h4>
              <p className="text-sm text-muted-foreground">Transparent feedback from real transactions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">Expert help when you need it most</p>
            </div>
          </div>
        </div>
      </section >


    </div >
  )
}
