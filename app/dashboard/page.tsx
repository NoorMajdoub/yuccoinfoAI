import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, FileUp, FolderOpen, Search, Clock, Star } from "lucide-react"
import Link from "next/link"
import RecentDocuments from "@/components/recent-documents"
import DocumentStats from "@/components/document-stats"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your documents and access recent files.</p>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DocumentStats
          title="Total Documents"
          value="128"
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
        />
        <DocumentStats title="Categories" value="12" icon={<FolderOpen className="h-5 w-5 text-muted-foreground" />} />
        <DocumentStats
          title="Recent Uploads"
          value="24"
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          subtitle="Last 30 days"
        />
        <DocumentStats title="Starred" value="16" icon={<Star className="h-5 w-5 text-muted-foreground" />} />
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Documents</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <RecentDocuments />
        </TabsContent>
        <TabsContent value="starred" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Starred Documents</CardTitle>
              <CardDescription>Documents you've marked as important.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">You haven't starred any documents yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shared Documents</CardTitle>
              <CardDescription>Documents shared with you by other users.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No documents have been shared with you yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2">
            <FileUp className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Upload Document</span>
            <span className="text-xs text-muted-foreground text-center">Add new documents to your library</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2">
            <Search className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Advanced Search</span>
            <span className="text-xs text-muted-foreground text-center">Find documents with powerful filters</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2">
            <FolderOpen className="h-8 w-8 mb-2" />
            <span className="text-sm font-medium">Manage Categories</span>
            <span className="text-xs text-muted-foreground text-center">Organize your document library</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
