"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Shield, Calendar, Package, MessageSquare, Flag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Mock seller data
const getSellerData = (username: string) => {
  const sellers = {
    TacticalGear_Pro: {
      username: "TacticalGear_Pro",
      displayName: "Tactical Gear Pro",
      avatar: "/placeholder.svg?height=120&width=120",
      verified: true,
      rating: 4.9,
      totalReviews: 127,
      memberSince: "January 2022",
      location: "Los Angeles, CA",
      responseTime: "Usually responds within 2 hours",
      description:
        "Professional airsoft gear dealer with over 10 years of experience. Specializing in high-quality AEGs and upgrades. All items are thoroughly tested before listing.",
      stats: {
        totalListings: 23,
        activeListings: 15,
        completedSales: 89,
        totalEarnings: 12450,
      },
      listings: [
        {
          id: 1,
          title: "Tokyo Marui AK-47 AEG with Upgrades",
          price: 450,
          condition: "Like New",
          image: "/placeholder.svg?height=200&width=300",
          views: 156,
          posted: "3 days ago",
        },
        {
          id: 9,
          title: "G&P M4A1 Metal Body AEG",
          price: 320,
          condition: "Used - Good",
          image: "/placeholder.svg?height=200&width=300",
          views: 89,
          posted: "1 week ago",
        },
        {
          id: 10,
          title: "Prometheus 6.03mm Tight Bore Barrel",
          price: 65,
          condition: "New",
          image: "/placeholder.svg?height=200&width=300",
          views: 34,
          posted: "2 weeks ago",
        },
      ],
      reviews: [
        {
          id: 1,
          reviewer: "AirsoftNewbie",
          rating: 5,
          comment: "Excellent seller! Item exactly as described and shipped quickly. Great communication throughout.",
          date: "2024-01-10",
          item: "Tokyo Marui M4A1",
        },
        {
          id: 2,
          reviewer: "FieldOperator",
          rating: 5,
          comment: "Professional packaging and fast shipping. The AEG works perfectly. Highly recommended!",
          date: "2024-01-05",
          item: "Krytac CRB",
        },
        {
          id: 3,
          reviewer: "TacticalCollector",
          rating: 4,
          comment: "Good seller, item was as described. Minor delay in shipping but good communication.",
          date: "2023-12-28",
          item: "G&P M4 Body",
        },
      ],
    },
  }

  return sellers[username as keyof typeof sellers] || null
}

export default function SellerProfilePage() {
  const params = useParams()
  const seller = getSellerData(params.username as string)

  if (!seller) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Seller Not Found</h1>
          <p className="text-muted-foreground mb-4">The seller profile you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/browse">Browse Listings</Link>
          </Button>
        </div>
      </div>
    )
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
                <Link href="/browse">Browse</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Seller Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32 mx-auto md:mx-0">
                <AvatarImage src={seller.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{seller.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <h1 className="text-3xl font-bold">{seller.displayName}</h1>
                  {seller.verified && <Shield className="h-6 w-6 text-green-500" />}
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-semibold">{seller.rating}</span>
                  <span className="text-muted-foreground">({seller.totalReviews} reviews)</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{seller.stats.activeListings}</div>
                    <div className="text-sm text-muted-foreground">Active Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{seller.stats.completedSales}</div>
                    <div className="text-sm text-muted-foreground">Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{seller.rating}</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3yr</div>
                    <div className="text-sm text-muted-foreground">Member</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{seller.location}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {seller.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{seller.responseTime}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{seller.description}</p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Button variant="outline">
                    <Flag className="h-4 w-4 mr-2" />
                    Report User
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="listings">Active Listings ({seller.stats.activeListings})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({seller.totalReviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seller.listings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2" variant="outline">
                      {listing.condition}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 line-clamp-2">{listing.title}</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-primary">${listing.price}</span>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Package className="h-3 w-3" />
                        <span>{listing.views} views</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Posted {listing.posted}</p>
                    <Button className="w-full" size="sm" asChild>
                      <Link href={`/listing/${listing.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {seller.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{review.reviewer.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.reviewer}</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{review.date}</p>
                        <p>Purchase: {review.item}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
