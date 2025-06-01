"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Star,
  MapPin,
  Shield,
  Heart,
  Share2,
  Flag,
  MessageSquare,
  ShoppingCart,
  Eye,
  Calendar,
  Package,
  Truck,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ZoomInIcon as Zoom,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Mock data - in real app this would come from API
const getListingData = (id: string) => {
  const listings = {
    "1": {
      id: 1,
      title: "Tokyo Marui AK-47 AEG with Upgrades",
      price: 450,
      originalPrice: 520,
      condition: "Like New",
      category: "Airsoft",
      subcategory: "Rifles & Guns",
      brand: "Tokyo Marui",
      model: "AK-47",
      description: `This Tokyo Marui AK-47 AEG is in excellent condition and has been upgraded with premium parts. Perfect for both beginners and experienced players.

**Included Upgrades:**
- Prometheus 6.03mm tight bore barrel
- Modify flat hop bucking
- SHS high torque motor
- 11.1v LiPo ready wiring
- Metal spring guide

**What's Included:**
- Tokyo Marui AK-47 AEG
- 1x Hi-Cap magazine (600 rounds)
- Original box and manual
- Cleaning rod
- Battery connector adapter

**Specifications:**
- FPS: ~400 with 0.20g BBs
- Rate of Fire: ~15-18 RPS
- Hop-up: Adjustable
- Battery: 8.4v NiMH or 11.1v LiPo
- Weight: 3.2kg

This rifle has been well maintained and only used in 5 games. No issues whatsoever. Selling due to upgrading to a different platform.`,
      images: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      location: "Los Angeles, CA",
      seller: {
        username: "TacticalGear_Pro",
        rating: 4.9,
        totalReviews: 127,
        verified: true,
        memberSince: "2022",
        responseTime: "Usually responds within 2 hours",
        avatar: "/placeholder.svg?height=80&width=80",
        totalListings: 23,
        completedSales: 89,
      },
      specifications: {
        Brand: "Tokyo Marui",
        Model: "AK-47",
        Type: "AEG (Automatic Electric Gun)",
        FPS: "~400 with 0.20g BBs",
        "Barrel Length": "455mm",
        Weight: "3.2kg",
        "Magazine Capacity": "600 rounds",
        "Battery Type": "8.4v NiMH / 11.1v LiPo",
        "Hop-up": "Adjustable",
        "Fire Modes": "Semi/Full Auto",
      },
      shipping: {
        localPickup: true,
        shipping: true,
        shippingCost: 25,
        shippingTime: "3-5 business days",
      },
      views: 156,
      watchers: 12,
      postedDate: "2024-01-10",
      lastUpdated: "2024-01-12",
    },
  }

  return listings[id as keyof typeof listings] || null
}

const relatedListings = [
  {
    id: 6,
    title: "KWA Ronin T6 AEG 2.5 Gearbox",
    price: 380,
    condition: "Used - Fair",
    image: "/placeholder.svg?height=200&width=300",
    seller: "AirsoftEnthusiast",
    rating: 4.6,
  },
  {
    id: 7,
    title: "Elite Force Glock 17 Gen4 GBB",
    price: 120,
    condition: "Used - Good",
    image: "/placeholder.svg?height=200&width=300",
    seller: "AirsoftCollector",
    rating: 4.7,
  },
  {
    id: 8,
    title: "Krytac Trident CRB M4 AEG",
    price: 320,
    condition: "Like New",
    image: "/placeholder.svg?height=200&width=300",
    seller: "FieldOperator",
    rating: 4.8,
  },
]

export default function ListingPage() {
  const params = useParams()
  const listing = getListingData(params.id as string)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [message, setMessage] = useState("")

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
          <p className="text-muted-foreground mb-4">The listing you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/browse">Browse All Listings</Link>
          </Button>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)
  }

  const handleContactSeller = () => {
    setShowContactForm(true)
  }

  const handleSendMessage = () => {
    // In real app, this would send the message
    console.log("Sending message:", message)
    setMessage("")
    setShowContactForm(false)
    // Show success message
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              wolfpackdefence
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/browse">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Browse
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

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
            <li>
              <Link href="/browse" className="hover:text-foreground">
                Browse
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${listing.category.toLowerCase()}`} className="hover:text-foreground">
                {listing.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium truncate">{listing.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative aspect-[4/3] bg-muted rounded-t-lg overflow-hidden">
                    <Image
                      src={listing.images[currentImageIndex] || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover cursor-zoom-in"
                      onClick={() => {}}
                    />

                    {/* Image Navigation */}
                    {listing.images.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute left-2 top-1/2 transform -translate-y-1/2"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {currentImageIndex + 1} / {listing.images.length}
                    </div>

                    {/* Zoom Icon */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {}}
                    >
                      <Zoom className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Thumbnail Strip */}
                  {listing.images.length > 1 && (
                    <div className="p-4">
                      <div className="flex space-x-2 overflow-x-auto">
                        {listing.images.map((image, index) => (
                          <button
                            key={index}
                            className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                              index === currentImageIndex ? "border-primary" : "border-muted"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${listing.title} ${index + 1}`}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {listing.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(listing.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-muted last:border-b-0">
                      <span className="font-medium text-muted-foreground">{key}:</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Pickup */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping & Pickup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Local Pickup Available</p>
                    <p className="text-sm text-muted-foreground">{listing.location}</p>
                  </div>
                </div>

                {listing.shipping.shipping && (
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Shipping Available - ${listing.shipping.shippingCost}</p>
                      <p className="text-sm text-muted-foreground">{listing.shipping.shippingTime}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Purchase Info and Seller */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Title and Price */}
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{listing.category}</Badge>
                      <Badge variant="outline">{listing.condition}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-primary">${listing.price}</span>
                      {listing.originalPrice && listing.originalPrice > listing.price && (
                        <span className="text-lg text-muted-foreground line-through">${listing.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>

                    <Button variant="outline" className="w-full" onClick={handleContactSeller}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Seller
                    </Button>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1" onClick={() => setIsWishlisted(!isWishlisted)}>
                        <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                        {isWishlisted ? "Saved" : "Save"}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Listing Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{listing.views} views</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>{listing.watchers} watching</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {listing.postedDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{listing.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={listing.seller.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{listing.seller.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{listing.seller.username}</h3>
                      {listing.seller.verified && <Shield className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{listing.seller.rating}</span>
                      <span className="text-muted-foreground">({listing.seller.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Member since</p>
                    <p className="font-medium">{listing.seller.memberSince}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total sales</p>
                    <p className="font-medium">{listing.seller.completedSales}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Response time</p>
                  <p>{listing.seller.responseTime}</p>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/seller/${listing.seller.username}`}>View Seller Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Safety Reminder:</strong> Always inspect items before purchase and meet in safe, public
                locations for local pickups.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Contact Seller</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Send a message to {listing.seller.username} about &ldquo;{listing.title}&rdquo;
                  </p>
                  <Textarea
                      placeholder="Hi, I&apos;m interested in your listing. Is this still available?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSendMessage} className="flex-1">
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={() => setShowContactForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Related Listings */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedListings.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2" variant="outline">
                    {item.condition}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 line-clamp-2">{item.title}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-primary">${item.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">by {item.seller}</p>
                  <Button className="w-full" size="sm" asChild>
                    <Link href={`/listing/${item.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
