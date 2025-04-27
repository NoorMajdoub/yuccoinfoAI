"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Share, Printer, Star, FileText, Clock, Tag, Edit, Trash, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function DocumentViewPage({ params }: { params: { id: string } }) {
  const [isStarred, setIsStarred] = useState(false)

  // Mock document data
  const document = {
    id: params.id,
    name: "Financial Report Q1 2023",
    type: "pdf",
    category: "Reports",
    size: "2.4 MB",
    uploadedAt: "April 15, 2023",
    lastViewed: "2 hours ago",
    tags: ["financial", "quarterly", "2023"],
    description: "Quarterly financial report for Q1 2023 including revenue, expenses, and profit analysis.",
    content:
      "This is a placeholder for the document content. In a real application, this would be the actual content of the document, possibly rendered as HTML or in a PDF viewer component.",
    metadata: {
      author: "Jane Smith",
      createdAt: "April 10, 2023",
      modifiedAt: "April 15, 2023",
      pages: 24,
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/documents">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{document.name}</h1>
            <p className="text-muted-foreground">
              {document.type.toUpperCase()} • {document.size} • Last viewed {document.lastViewed}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsStarred(!isStarred)}>
            <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
            <span className="sr-only">{isStarred ? "Unstar" : "Star"}</span>
          </Button>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="outline" size="icon">
            <Share className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="outline" size="icon" className="text-destructive">
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="text">Text Content</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="h-16 w-16 text-muted-foreground" />
                  </div>
                </TabsContent>
                <TabsContent value="text" className="mt-4">
                  <div className="p-4 border rounded-lg bg-muted/30 min-h-[400px]">
                    <p className="text-sm">{document.content}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Automatically generated insights from the document content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Document Summary</h3>
                <p className="text-sm text-muted-foreground">
                  This financial report presents the Q1 2023 results, showing a 15% increase in revenue compared to Q1
                  2022. The report highlights key growth areas in the technology and services sectors, while noting
                  challenges in supply chain management. Overall profit margins improved by 2.3% due to cost
                  optimization initiatives.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Key Figures</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Revenue: $12.4M (↑15% YoY)</li>
                  <li>Expenses: $8.2M (↑8% YoY)</li>
                  <li>Profit: $4.2M (↑32% YoY)</li>
                  <li>Profit Margin: 33.8% (↑2.3% YoY)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Suggested Actions</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Review supply chain optimization strategies</li>
                  <li>Analyze technology sector growth drivers</li>
                  <li>Prepare Q2 forecast based on Q1 trends</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Category</p>
                  <Badge variant="outline">{document.category}</Badge>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">{document.description}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Metadata</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Author: {document.metadata.author}</p>
                    <p>Created: {document.metadata.createdAt}</p>
                    <p>Modified: {document.metadata.modifiedAt}</p>
                    <p>Pages: {document.metadata.pages}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Current Version</p>
                    <p className="text-xs text-muted-foreground">April 15, 2023 at 10:30 AM</p>
                  </div>
                  <Badge>Latest</Badge>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Version 2</p>
                    <p className="text-xs text-muted-foreground">April 12, 2023 at 2:15 PM</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7">
                    Restore
                  </Button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Version 1</p>
                    <p className="text-xs text-muted-foreground">April 10, 2023 at 9:45 AM</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7">
                    Restore
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />
                  <p className="text-sm font-medium">Financial Report Q4 2022</p>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />
                  <p className="text-sm font-medium">Annual Financial Report 2022</p>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />
                  <p className="text-sm font-medium">Q1 2023 Presentation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
