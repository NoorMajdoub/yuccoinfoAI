import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, File, FileImage, FileSpreadsheet, FileType, MoreHorizontal, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for recent documents
const recentDocuments = [
  {
    id: "doc-1",
    name: "Financial Report Q1 2023",
    type: "pdf",
    category: "Reports",
    uploadedAt: "2023-04-15T10:30:00",
    starred: true,
  },
  {
    id: "doc-2",
    name: "Employee Handbook",
    type: "docx",
    category: "HR",
    uploadedAt: "2023-03-22T14:15:00",
    starred: false,
  },
  {
    id: "doc-3",
    name: "Marketing Strategy 2023",
    type: "pptx",
    category: "Marketing",
    uploadedAt: "2023-04-10T09:45:00",
    starred: true,
  },
  {
    id: "doc-4",
    name: "Product Roadmap",
    type: "xlsx",
    category: "Product",
    uploadedAt: "2023-04-05T16:20:00",
    starred: false,
  },
  {
    id: "doc-5",
    name: "Client Contract - ABC Corp",
    type: "pdf",
    category: "Contracts",
    uploadedAt: "2023-04-18T11:10:00",
    starred: false,
  },
]

export default function RecentDocuments() {
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
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDocuments.map((doc) => (
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
