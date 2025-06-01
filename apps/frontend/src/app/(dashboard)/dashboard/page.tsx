"use client"

import { MessageSquare, Package, DollarSign, Star, Plus, Edit, Eye, Shield, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session, isPending } = authClient.useSession()
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login")
    }
  }, [isPending, session, router])

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
              <CardDescription>Please wait while we check your session</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // prevent rendering if session doesn't exist (e.g. while redirecting)
  if (!isPending && !session) {
    return null
  }

  const user = session!.user

  const handleSignOut = async () => {
    await authClient.signOut()
    router.refresh()
    router.push("/login")
  }


  const initials = user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase() : ""


  const profile = {
    totalListings: 12,
    activeListings: 8,
    totalSales: 24,
    totalEarnings: 3450,
    rating: 4.8,
    verified: true,
  }

  const recentListings = [
    {
      id: 1,
      title: "Tokyo Marui M4A1 SOPMOD",
      price: 380,
      status: "active",
      views: 45,
      inquiries: 3,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      title: "Dye i5 Paintball Mask",
      price: 150,
      status: "sold",
      views: 67,
      inquiries: 8,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      title: "Magpul MBUS Pro Sight Set",
      price: 120,
      status: "pending",
      views: 23,
      inquiries: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const recentMessages = [
    {
      id: 1,
      from: "TacticalBuyer",
      subject: "Question about Tokyo Marui M4A1",
      preview: "Hi, is this still available? Can you provide more photos of...",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      from: "GearCollector",
      subject: "Interested in Dye i5 Mask",
      preview: "Would you consider $140 for the mask? I can pick up locally...",
      time: "1 day ago",
      unread: false,
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      item: "Planet Eclipse Geo 4",
      buyer: "PaintballPro",
      amount: 850,
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: 2,
      item: "Vortex Strike Eagle 1-6x24",
      buyer: "ShooterMike",
      amount: 280,
      status: "shipped",
      date: "2024-01-12",
    },
  ]

  const myPurchases = [
    {
      id: 1,
      item: "KWA Ronin T6 AEG 2.5 Gearbox",
      seller: "AirsoftEnthusiast",
      amount: 380,
      status: "shipped",
      orderDate: "2024-01-14",
      trackingNumber: "1Z999AA1234567890",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: 2,
      item: "Dye i5 Paintball Mask - Thermal Lens",
      seller: "GearCollector",
      amount: 150,
      status: "delivered",
      orderDate: "2024-01-10",
      trackingNumber: "1Z999AA1234567891",
      deliveredDate: "2024-01-13",
    },
    {
      id: 3,
      item: "Aimpoint PRO Red Dot Sight",
      seller: "PrecisionShooter",
      amount: 380,
      status: "processing",
      orderDate: "2024-01-16",
      trackingNumber: null,
      estimatedDelivery: "2024-01-20",
    },
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
                <Link href="/browse">Browse</Link>
              </Button>
              <Button asChild>
                <Link href="/list-item">
                  <Plus className="h-4 w-4 mr-2" />
                  List Item
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={user.image || "/placeholder.svg?height=80&width=80"} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center space-x-2">
                  <CardTitle>{user.displayUsername}</CardTitle>
                  {user.emailVerified && <Shield className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{profile.rating}</span>
                  <span className="text-muted-foreground">({profile.totalSales} sales)</span>
                </div>
              </CardHeader>
            </Card>

            <div className="mt-6 space-y-2">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </Button>
              <Button
                variant={activeTab === "listings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("listings")}
              >
                <Package className="h-4 w-4 mr-2" />
                My Listings
              </Button>
              <Button
                variant={activeTab === "messages" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("messages")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button
                variant={activeTab === "transactions" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("transactions")}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Transactions
              </Button>
              <Button
                variant={activeTab === "purchases" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("purchases")}
              >
                <Package className="h-4 w-4 mr-2" />
                My Purchases
              </Button>
              <Button variant="ghost" onClick={handleSignOut}>
                <ExitIcon className="mr-2 size-4" aria-hidden="true" />
                Log out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{profile.activeListings}</div>
                      <p className="text-xs text-muted-foreground">{profile.totalListings} total listings</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{profile.totalSales}</div>
                      <p className="text-xs text-muted-foreground">${profile.totalEarnings} earned</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Rating</CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{profile.rating}</div>
                      <p className="text-xs text-muted-foreground">Based on {profile.totalSales} reviews</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Purchases</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{myPurchases.length}</div>
                      <p className="text-xs text-muted-foreground">
                        {myPurchases.filter((p) => p.status === "delivered").length} delivered
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Listings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentListings.map((listing) => (
                        <div key={listing.id} className="flex items-center space-x-4">
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            width={60}
                            height={60}
                            className="rounded-lg"
                            sizes="(max-width: 768px) 60px, 60px"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{listing.title}</p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>${listing.price}</span>
                              <Badge
                                variant={
                                  listing.status === "active"
                                    ? "default"
                                    : listing.status === "sold"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {listing.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{listing.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{listing.inquiries}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentMessages.map((message) => (
                        <div key={message.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{message.from}</span>
                              {message.unread && (
                                <Badge variant="default" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="text-sm font-medium">{message.subject}</p>
                          <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "listings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold">My Listings</h1>
                  <Button asChild>
                    <Link href="/list-item">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Listing
                    </Link>
                  </Button>
                </div>

                <Tabs defaultValue="active" className="w-full">
                  <TabsList>
                    <TabsTrigger value="active">Active ({profile.activeListings})</TabsTrigger>
                    <TabsTrigger value="sold">Sold</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="space-y-4">
                    {recentListings
                      .filter((l) => l.status === "active")
                      .map((listing) => (
                        <Card key={listing.id}>
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              <Image
                                src={listing.image}
                                alt={listing.title}
                                width={100}
                                height={100}
                                className="rounded-lg"
                                sizes="(max-width: 768px) 100px, 100px"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{listing.title}</h3>
                                <p className="text-2xl font-bold text-primary">${listing.price}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{listing.views} views</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{listing.inquiries} inquiries</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col space-y-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Messages</h1>

                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <Card key={message.id} className={message.unread ? "border-primary" : ""}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{message.from}</span>
                              {message.unread && <Badge variant="default">New</Badge>}
                            </div>
                            <h3 className="font-medium">{message.subject}</h3>
                            <p className="text-muted-foreground">{message.preview}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{message.time}</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Transaction History</h1>

                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <Card key={transaction.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold">{transaction.item}</h3>
                            <p className="text-sm text-muted-foreground">
                              Sold to {transaction.buyer} on {transaction.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">${transaction.amount}</p>
                            <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                              {transaction.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {transaction.status === "shipped" && <Clock className="h-3 w-3 mr-1" />}
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "purchases" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">My Purchases</h1>

                <div className="space-y-4">
                  {myPurchases.map((purchase) => (
                    <Card key={purchase.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{purchase.item}</h3>
                            <p className="text-sm text-muted-foreground">
                              From {purchase.seller} • Ordered {purchase.orderDate}
                            </p>
                            {purchase.trackingNumber && (
                              <p className="text-sm text-muted-foreground">Tracking: {purchase.trackingNumber}</p>
                            )}
                            {purchase.status === "delivered" && purchase.deliveredDate && (
                              <p className="text-sm text-green-600">Delivered on {purchase.deliveredDate}</p>
                            )}
                            {purchase.status === "shipped" && purchase.estimatedDelivery && (
                              <p className="text-sm text-muted-foreground">
                                Expected delivery: {purchase.estimatedDelivery}
                              </p>
                            )}
                          </div>
                          <div className="text-right space-y-2">
                            <p className="text-2xl font-bold">${purchase.amount}</p>
                            <Badge
                              variant={
                                purchase.status === "delivered"
                                  ? "default"
                                  : purchase.status === "shipped"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {purchase.status === "delivered" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {purchase.status === "shipped" && <Clock className="h-3 w-3 mr-1" />}
                              {purchase.status === "processing" && <Clock className="h-3 w-3 mr-1" />}
                              {purchase.status}
                            </Badge>
                            <div className="space-y-1">
                              {purchase.status === "delivered" && (
                                <Button variant="outline" size="sm" className="w-full">
                                  Leave Review
                                </Button>
                              )}
                              {purchase.status === "shipped" && (
                                <Button variant="outline" size="sm" className="w-full">
                                  Track Package
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="w-full">
                                Contact Seller
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
