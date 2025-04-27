"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  FileUp,
  Filter,
  MoreHorizontal,
  Search,
  SortAsc,
  Star,
  Download,
  Trash,
  Share,
  FileType,
  File,
  FileImage,
  FileSpreadsheet,
  Sparkles,
  KeyRound,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock data for documents
const mockDocuments = [
  {
    id: "doc-1",
    name: "Financial Report Q1 2023",
    type: "pdf",
    category: "Reports",
    size: "2.4 MB",
    uploadedAt: "2023-04-15T10:30:00",
    starred: true,
  },
  {
    id: "doc-2",
    name: "Employee Handbook",
    type: "docx",
    category: "HR",
    size: "1.8 MB",
    uploadedAt: "2023-03-22T14:15:00",
    starred: false,
  },
  {
    id: "doc-3",
    name: "Marketing Strategy 2023",
    type: "pptx",
    category: "Marketing",
    size: "5.2 MB",
    uploadedAt: "2023-04-10T09:45:00",
    starred: true,
  },
  {
    id: "doc-4",
    name: "Product Roadmap",
    type: "xlsx",
    category: "Product",
    size: "1.1 MB",
    uploadedAt: "2023-04-05T16:20:00",
    starred: false,
  },
  {
    id: "doc-5",
    name: "Client Contract - ABC Corp",
    type: "pdf",
    category: "Contracts",
    size: "3.7 MB",
    uploadedAt: "2023-04-18T11:10:00",
    starred: false,
  },
  {
    id: "doc-6",
    name: "Team Photo - Company Retreat",
    type: "jpg",
    category: "Photos",
    size: "4.5 MB",
    uploadedAt: "2023-03-15T13:25:00",
    starred: false,
  },
  {
    id: "doc-7",
    name: "Invoice #12345",
    type: "pdf",
    category: "Invoices",
    size: "0.8 MB",
    uploadedAt: "2023-04-20T10:05:00",
    starred: false,
  },
  {
    id: "doc-8",
    name: "Balance Sheet 2023",
    type: "xlsx",
    category: "Balance Sheets",
    size: "1.2 MB",
    uploadedAt: "2023-04-22T09:15:00",
    starred: false,
  },
  {
    id: "doc-9",
    name: "Income Statement Q1 2023",
    type: "xlsx",
    category: "Income Statements",
    size: "0.9 MB",
    uploadedAt: "2023-04-21T14:30:00",
    starred: true,
  },
]

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [searchType, setSearchType] = useState("keyword")

  // Get unique categories and types for filters
  const categories = ["all", ...new Set(mockDocuments.map((doc) => doc.category))]
  const types = ["all", ...new Set(mockDocuments.map((doc) => doc.type))]

  // Filter documents based on search query and filters
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter

    return matchesSearch && matchesCategory && matchesType
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Get icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "docx":
        return <File className="h-4 w-4 text-blue-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-4 w-4 text-green-500" />
      case "pptx":
        return <FileType className="h-4 w-4 text-orange-500" />
      case "jpg":
      case "png":
        return <FileImage className="h-4 w-4 text-purple-500" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Browse, search, and manage all your documents in one place.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/upload">
            <Button>
              <FileUp className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </Link>
        </div>
      </div>

      <Card className="p-4">
        <Tabs defaultValue="keyword" onValueChange={(value) => setSearchType(value)}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="keyword" className="flex items-center">
                <KeyRound className="mr-2 h-4 w-4" />
                Keyword Search
              </TabsTrigger>
              <TabsTrigger value="semantic" className="flex items-center">
                <Sparkles className="mr-2 h-4 w-4" />
                Semantic Search
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
              <Button variant="outline" size="icon">
                <SortAsc className="h-4 w-4" />
                <span className="sr-only">Sort</span>
              </Button>
            </div>
          </div>

          <TabsContent value="keyword" className="mt-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by document name, content, or metadata..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Keyword search finds exact matches in document names, content, and metadata.
            </p>
          </TabsContent>

          <TabsContent value="semantic" className="mt-0">
            <div className="relative">
              <Sparkles className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Describe what you're looking for in natural language..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Switch id="include-context" />
              <Label htmlFor="include-context" className="text-xs text-muted-foreground">
                Include document context in search
              </Label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Semantic search understands the meaning of your query and finds relevant documents, even if they don't
              contain the exact words.
            </p>
          </TabsContent>
        </Tabs>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label={doc.starred ? "Unstar document" : "Star document"}
                    >
                      <Star
                        className={`h-4 w-4 ${doc.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getFileIcon(doc.type)}
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.category}</Badge>
                  </TableCell>
                  <TableCell className="uppercase">{doc.type}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{formatDate(doc.uploadedAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No documents found. Try adjusting your filters or search query.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
