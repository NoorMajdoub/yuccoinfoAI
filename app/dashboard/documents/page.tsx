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

interface SearchResult {
  id: number;
  filename: string;
  content_type: string;
  type: string;
  snippet: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadedAt: string;
  starred: boolean;
}

// Mock data for documents
const mockDocuments: Document[] = [
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
]

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [searchType, setSearchType] = useState("keyword")
  const [results, setResults] = useState<SearchResult[]>([])
  const [adr, setadr] = useState("")

  const handleSendMessage = async () => {
    setSubmittedQuery(searchQuery)
    // alert(searchType)
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    let url = "";
    if (searchType === "semantic") {
      url = `http://localhost:8000/search2/?keyword=${encodeURIComponent(searchQuery)}`;
    } else if (searchType === "keyword") {
      url = `http://localhost:8000/search/?keyword=${encodeURIComponent(searchQuery)}`;
    }
  
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Error fetching search results")
      }
      const data = await response.json()
      setResults(data)
      console.log(data)
    } catch (err) {
      console.error("Error fetching search results:", err)
    } 
  }

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

  // Filter mock documents based on filters (when no search query)
  const filteredMockDocuments = mockDocuments.filter((doc) => {
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    return matchesCategory && matchesType
  })

  // Filter results based on filters (when there is a search query)
  const filteredResults = results.filter((result) => {
    const matchesCategory = categoryFilter === "all" || result.type === categoryFilter
    const matchesType = typeFilter === "all" || result.content_type.split('/')[1] === typeFilter
    return matchesCategory && matchesType
  })

  // Get unique categories and types for filters
  const categories = ["all", ...new Set([
    ...mockDocuments.map((doc) => doc.category),
    ...results.map((result) => result.type)
  ])]
  
  const types = ["all", ...new Set([
    ...mockDocuments.map((doc) => doc.type),
    ...results.map((result) => result.content_type.split('/')[1])
  ])]

  const showingResults = submittedQuery.trim() !== ""
  const hasContent = showingResults ? filteredResults.length > 0 : filteredMockDocuments.length > 0

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
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by document name, content, or metadata..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button onClick={handleSendMessage}>
                Search
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Keyword search finds exact matches in document names, content, and metadata.
            </p>
          </TabsContent>

          <TabsContent value="semantic" className="mt-0">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Sparkles className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Describe what you're looking for in natural language..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button onClick={handleSendMessage}>
                Search
              </Button>
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
              {showingResults ? (
                <>
                  <TableHead>File</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Content</TableHead>
                </>
              ) : (
                <>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Starred</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!hasContent ? (
              <TableRow>
                <TableCell colSpan={showingResults ? 4 : 6} className="text-center py-6 text-muted-foreground">
                  {showingResults ? 
                    "No search results found. Try adjusting your filters or search query." : 
                    "No documents found matching your filters."}
                </TableCell>
              </TableRow>
            ) : showingResults ? (
              filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="flex items-center gap-2">
                    {getFileIcon(result.content_type.split('/')[1])}
                    {result.filename}
                  </TableCell>
                  <TableCell>{result.content_type.split('/')[1].toUpperCase()}</TableCell>
                  <TableCell>{result.type}</TableCell>
                  <TableCell className="max-w-xs truncate">{result.snippet}</TableCell>
                </TableRow>
              ))
            ) : (
              filteredMockDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center gap-2">
                    {getFileIcon(doc.type)}
                    {doc.name}
                    {doc.starred && <Star className="h-4 w-4 text-yellow-400" />}
                  </TableCell>
                  <TableCell>{doc.type.toUpperCase()}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{formatDate(doc.uploadedAt)}</TableCell>
                  <TableCell>
                    {doc.starred ? (
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Star className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}