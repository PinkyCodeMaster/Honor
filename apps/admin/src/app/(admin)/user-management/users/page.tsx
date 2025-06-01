"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Search, MoreHorizontal, Shield, Eye, Ban, CheckCircle, Trash2, } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { toast } from "sonner"

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchUsers()
  }, [searchTerm, statusFilter, offset, limit])

  const fetchUsers = async () => {
    const query: any = {
      limit,
      offset,
      sortBy: "createdAt",
      sortDirection: "desc",
    }

    if (searchTerm) {
      query.searchField = "email"
      query.searchOperator = "contains"
      query.searchValue = searchTerm
    }

    if (statusFilter !== "all") {
      query.filter = [
        {
          field: "status",
          operator: "eq",
          value: statusFilter,
        },
      ]
    }

    const users = await authClient.admin.listUsers({ query })
    setUsers(users.data!.users || [])
    setTotal(users.data!.total || 0)
  }

  const getStatusBadge = (banned: boolean | null) => {
    if (banned) {
      return <Badge variant="destructive">Banned</Badge>
    }

    return <Badge className="bg-green-100 text-green-800">Active</Badge>
  }

  const setUserRole = async (
    userId: string,
    role: "user" | "admin"
  ) => {
    try {
      await authClient.admin.setRole({ userId, role })
      toast.success(`User role updated to "${role}"`)
      fetchUsers()
    } catch (error) {
      toast.error("Failed to update user role")
      console.error(error)
    }
  }

  const banUser = async (userId: string) => {
    try {
      await authClient.admin.banUser({ userId, banReason: "Violation" })
      toast.success("User has been banned")
      fetchUsers()
    } catch (error) {
      toast.error("Failed to ban user")
      console.error(error)
    }
  }

  const unbanUser = async (userId: string) => {
    try {
      await authClient.admin.unbanUser({ userId })
      toast.success("User has been unbanned")
      fetchUsers()
    } catch (error) {
      toast.error("Failed to unban user")
      console.error(error)
    }
  }

  const totalPages = Math.ceil(total / limit)
  const currentPage = offset / limit + 1

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage and monitor all platform users</p>
        </div>
        <Button>Export Users</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
                <SelectItem value="pending">Pending Verification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({total})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Listings</TableHead>
                <TableHead>Trust Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.banned)}</TableCell>
                  <TableCell>
                    {user.emailVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <span className="text-muted-foreground">Pending</span>
                    )}
                  </TableCell>
                  <TableCell>{format(new Date(user.createdAt), "dd-MM-yy")}</TableCell>
                  <TableCell>{format(new Date(user.updatedAt), "dd-MM-yy")}</TableCell>
                  <TableCell>{user.listingsCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{user.trustScore}</span>
                      <span className="text-muted-foreground">/5.0</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setUserRole(user.id, "admin")}>
                          <Shield className="h-4 w-4 mr-2" />
                          Set Role: Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => banUser(user.id)} className="text-orange-600">
                          <Ban className="h-4 w-4 mr-2" />
                          Ban User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => unbanUser(user.id)} className="text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Unban User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <div className="space-x-2">
              <Button
                size="sm"
                variant="outline"
                disabled={offset === 0}
                onClick={() => setOffset(Math.max(0, offset - limit))}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={offset + limit >= total}
                onClick={() => setOffset(offset + limit)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
