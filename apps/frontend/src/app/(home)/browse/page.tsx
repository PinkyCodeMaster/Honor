"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin, Shield, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [showFilters, setShowFilters] = useState(false)

  const listings = [
    {
      id: 1,
      title: "Tokyo Marui AK-47 AEG with Upgrades",
      price: 450,
      condition: "Like New",
      category: "Airsoft",
      subcategory: "Rifles & Guns",
      location: "Los Angeles, CA",
      seller: "TacticalGear_Pro",
      rating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
      views: 45,
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Planet Eclipse CS2 Pro Marker",
      price: 1200,
      condition: "Used - Good",
      category: "Paintball",
      subcategory: "Markers",
      location: "Austin, TX",
      seller: "PaintballKing",
      rating: 4.8,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
      views: 67,
      posted: "1 day ago",
    },
    {
      id: 3,
      title: "Vortex Viper PST Gen II 5-25x50",
      price: 650,
      condition: "New",
      category: "Realsteel",
      subcategory: "Optics",
      location: "Phoenix, AZ",
      seller: "OpticsPro",
      rating: 5.0,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
      views: 23,
      posted: "3 hours ago",
    },
    {
      id: 4,
      title: "Dye i5 Paintball Mask - Thermal Lens",
      price: 150,
      condition: "Used - Good",
      category: "Paintball",
      subcategory: "Masks & Goggles",
      location: "Denver, CO",
      seller: "GearCollector",
      rating: 4.7,
      verified: false,
      image: "/placeholder.svg?height=200&width=300",
      views: 89,
      posted: "5 days ago",
    },
    {
      id: 5,
      title: "Magpul MBUS Pro Sight Set",
      price: 120,
      condition: "Like New",
      category: "Realsteel",
      subcategory: "Accessories",
      location: "Miami, FL",
      seller: "TacticalSupply",
      rating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
      views: 34,
      posted: "1 week ago",
    },
    {
      id: 6,
      title: "KWA Ronin T6 AEG 2.5 Gearbox",
      price: 380,
      condition: "Used - Fair",
      category: "Airsoft",
      subcategory: "Rifles & Guns",
      location: "Seattle, WA",
      seller: "AirsoftEnthusiast",
      rating: 4.6,
      verified: true,
      image: "/placeholder.svg?height=200&width=300",
      views: 56,
      posted: "4 days ago",
    },
  ]

  const categories = ["All", "Airsoft", "Paintball", "Realsteel"]
  const conditions = ["New", "Like New", "Used - Good", "Used - Fair", "For Parts"]
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              TacticalMarket
            </Link>
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

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search for gear, brands, or keywords..." className="pl-10" />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Showing {listings.length} results</p>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Airsoft: 2</Badge>
              <Badge variant="secondary">Paintball: 2</Badge>
              <Badge variant="secondary">Realsteel: 2</Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={50} className="w-full" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <h3 className="font-semibold mb-3">Condition</h3>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={condition} />
                        <label htmlFor={condition} className="text-sm cursor-pointer">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seller Options */}
                <div>
                  <h3 className="font-semibold mb-3">Seller</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <label htmlFor="verified" className="text-sm cursor-pointer">
                        Verified sellers only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="local" />
                      <label htmlFor="local" className="text-sm cursor-pointer">
                        Local pickup available
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Listings Grid/List */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
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
                        {listing.category}
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

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{listing.seller}</span>
                            {listing.verified && <Shield className="h-4 w-4 text-green-500" />}
                          </div>
                          <span>{listing.posted}</span>
                        </div>
                      </div>

                      <Button className="w-full mt-4" asChild>
                        <Link href={`/listing/${listing.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Image
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          width={150}
                          height={100}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg line-clamp-2">{listing.title}</h4>
                            <span className="text-2xl font-bold text-primary ml-4">${listing.price}</span>
                          </div>

                          <div className="flex items-center space-x-4 mb-2">
                            <Badge variant="secondary">{listing.category}</Badge>
                            <Badge variant="outline">{listing.condition}</Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{listing.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{listing.location}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{listing.seller}</span>
                                {listing.verified && <Shield className="h-4 w-4 text-green-500" />}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span>{listing.views} views</span>
                              <span>{listing.posted}</span>
                              <Button size="sm" asChild>
                                <Link href={`/listing/${listing.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
