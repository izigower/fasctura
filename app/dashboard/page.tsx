"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowUpDown, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Filter, 
  Plus, 
  Search, 
  Send, 
  XCircle 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

// Mock data for quotes
const mockQuotes = [
  {
    id: "Q-2023-001",
    client: "Acme Inc.",
    amount: "€2,450.00",
    date: "2023-05-15",
    status: "accepted",
  },
  {
    id: "Q-2023-002",
    client: "TechStart Ltd",
    amount: "€1,200.00",
    date: "2023-05-18",
    status: "sent",
  },
  {
    id: "Q-2023-003",
    client: "Design Masters",
    amount: "€3,750.00",
    date: "2023-05-20",
    status: "draft",
  },
  {
    id: "Q-2023-004",
    client: "Global Solutions",
    amount: "€5,000.00",
    date: "2023-05-22",
    status: "rejected",
  },
  {
    id: "Q-2023-005",
    client: "Startup Ventures",
    amount: "€1,800.00",
    date: "2023-05-25",
    status: "sent",
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  
  // Filter quotes based on search term and active tab
  const filteredQuotes = mockQuotes.filter(quote => {
    const matchesSearch = 
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      quote.client.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    return matchesSearch && quote.status === activeTab
  })

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Draft</Badge>
      case "sent":
        return <Badge variant="secondary" className="flex items-center gap-1"><Send className="h-3 w-3" /> Sent</Badge>
      case "accepted":
        return <Badge variant="success" className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"><CheckCircle2 className="h-3 w-3" /> Accepted</Badge>
      case "rejected":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your quotes and track their status</p>
        </div>
        <Link href="/dashboard/quotes/new">
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> New Quote
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockQuotes.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Accepted Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockQuotes.filter(q => q.status === "accepted").length}
            </div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((mockQuotes.filter(q => q.status === "accepted").length / 
                (mockQuotes.filter(q => q.status === "accepted").length + 
                 mockQuotes.filter(q => q.status === "rejected").length)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quotes</CardTitle>
          <CardDescription>
            View and manage all your quotes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search quotes..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Date: Newest first</DropdownMenuItem>
                  <DropdownMenuItem>Date: Oldest first</DropdownMenuItem>
                  <DropdownMenuItem>Amount: High to low</DropdownMenuItem>
                  <DropdownMenuItem>Amount: Low to high</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <FileText className="h-4 w-4" /> All
              </TabsTrigger>
              <TabsTrigger value="draft" className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> Draft
              </TabsTrigger>
              <TabsTrigger value="sent" className="flex items-center gap-1">
                <Send className="h-4 w-4" /> Sent
              </TabsTrigger>
              <TabsTrigger value="accepted" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Accepted
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-1">
                <XCircle className="h-4 w-4" /> Rejected
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        <div className="flex items-center gap-1 cursor-pointer">
                          ID <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Client <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Amount <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Date <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuotes.length > 0 ? (
                      filteredQuotes.map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell className="font-medium">{quote.id}</TableCell>
                          <TableCell>{quote.client}</TableCell>
                          <TableCell>{quote.amount}</TableCell>
                          <TableCell>{new Date(quote.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <StatusBadge status={quote.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/dashboard/quotes/${quote.id}`}>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No quotes found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}