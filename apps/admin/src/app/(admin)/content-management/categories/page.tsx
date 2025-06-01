"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FolderTree, Plus, Edit, Trash2, MoreHorizontal, Eye } from "lucide-react"

// Placeholder data
const categories = [
    {
        id: 1,
        name: "Airsoft",
        slug: "airsoft",
        description: "Airsoft guns, accessories, and equipment",
        parentId: null,
        isActive: true,
        listingCount: 1245,
        subcategories: [
            { id: 11, name: "Rifles", slug: "airsoft-rifles", listingCount: 456 },
            { id: 12, name: "Pistols", slug: "airsoft-pistols", listingCount: 234 },
            { id: 13, name: "Accessories", slug: "airsoft-accessories", listingCount: 555 },
        ],
    },
    {
        id: 2,
        name: "Paintball",
        slug: "paintball",
        description: "Paintball markers, gear, and supplies",
        parentId: null,
        isActive: true,
        listingCount: 892,
        subcategories: [
            { id: 21, name: "Markers", slug: "paintball-markers", listingCount: 345 },
            { id: 22, name: "Masks & Protection", slug: "paintball-protection", listingCount: 234 },
            { id: 23, name: "Paintballs & CO2", slug: "paintball-supplies", listingCount: 313 },
        ],
    },
    {
        id: 3,
        name: "Tactical Gear",
        slug: "tactical-gear",
        description: "Military-style equipment and accessories",
        parentId: null,
        isActive: true,
        listingCount: 567,
        subcategories: [
            { id: 31, name: "Vests & Armor", slug: "tactical-vests", listingCount: 123 },
            { id: 32, name: "Holsters", slug: "tactical-holsters", listingCount: 234 },
            { id: 33, name: "Bags & Packs", slug: "tactical-bags", listingCount: 210 },
        ],
    },
    {
        id: 4,
        name: "Optics & Scopes",
        slug: "optics-scopes",
        description: "Sights, scopes, and optical equipment",
        parentId: null,
        isActive: true,
        listingCount: 234,
        subcategories: [
            { id: 41, name: "Red Dot Sights", slug: "red-dot-sights", listingCount: 89 },
            { id: 42, name: "Scopes", slug: "scopes", listingCount: 67 },
            { id: 43, name: "Iron Sights", slug: "iron-sights", listingCount: 78 },
        ],
    },
]

export default function CategoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <p className="text-muted-foreground">Manage marketplace categories and subcategories</p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="category-name">Category Name</Label>
                                <Input id="category-name" placeholder="Enter category name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category-slug">URL Slug</Label>
                                <Input id="category-slug" placeholder="category-slug" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category-description">Description</Label>
                                <Textarea id="category-description" placeholder="Category description" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label>Active</Label>
                                <Switch defaultChecked />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsCreateDialogOpen(false)}>Create Category</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Categories Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-sm text-muted-foreground">Total Categories</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-sm text-muted-foreground">Subcategories</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">2,938</div>
                        <p className="text-sm text-muted-foreground">Total Listings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">100%</div>
                        <p className="text-sm text-muted-foreground">Active Categories</p>
                    </CardContent>
                </Card>
            </div>

            {/* Categories Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FolderTree className="h-5 w-5" />
                        All Categories
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Listings</TableHead>
                                <TableHead>Subcategories</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{category.name}</div>
                                            <div className="text-sm text-muted-foreground">{category.description}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <code className="text-sm bg-muted px-2 py-1 rounded">{category.slug}</code>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{category.listingCount} listings</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{category.subcategories.length} subcategories</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                            {category.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setSelectedCategory(category)}>
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit Category
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete Category
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Category Details Dialog */}
            {selectedCategory && (
                <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Category Details - {selectedCategory.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="font-semibold mb-2">Category Information</h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <strong>Name:</strong> {selectedCategory.name}
                                        </div>
                                        <div>
                                            <strong>Slug:</strong> {selectedCategory.slug}
                                        </div>
                                        <div>
                                            <strong>Description:</strong> {selectedCategory.description}
                                        </div>
                                        <div>
                                            <strong>Status:</strong> {selectedCategory.isActive ? "Active" : "Inactive"}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Statistics</h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <strong>Total Listings:</strong> {selectedCategory.listingCount}
                                        </div>
                                        <div>
                                            <strong>Subcategories:</strong> {selectedCategory.subcategories.length}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Subcategories</h3>
                                <div className="space-y-2">
                                    {selectedCategory.subcategories.map((sub: any) => (
                                        <div key={sub.id} className="flex justify-between items-center p-2 border rounded">
                                            <div>
                                                <div className="font-medium">{sub.name}</div>
                                                <div className="text-sm text-muted-foreground">{sub.slug}</div>
                                            </div>
                                            <Badge variant="outline">{sub.listingCount} listings</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                                Close
                            </Button>
                            <Button>Edit Category</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
