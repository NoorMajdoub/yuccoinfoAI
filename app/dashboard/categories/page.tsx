"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FolderOpen,
  Plus,
  FileText,
  FileSpreadsheet,
  File,
  MoreHorizontal,
  Edit,
  Trash,
  ArrowUpDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for categories
const mockCategories = [
  {
    id: "cat-1",
    name: "Reports",
    description: "Financial and business reports",
    documentCount: 24,
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    usage: 65,
  },
  {
    id: "cat-2",
    name: "Contracts",
    description: "Legal agreements and contracts",
    documentCount: 18,
    icon: <File className="h-5 w-5 text-purple-500" />,
    usage: 42,
  },
  {
    id: "cat-3",
    name: "Invoices",
    description: "Customer and vendor invoices",
    documentCount: 36,
    icon: <FileText className="h-5 w-5 text-green-500" />,
    usage: 78,
  },
  {
    id: "cat-4",
    name: "HR Documents",
    description: "Employee and HR related documents",
    documentCount: 15,
    icon: <File className="h-5 w-5 text-orange-500" />,
    usage: 35,
  },
  {
    id: "cat-5",
    name: "Marketing",
    description: "Marketing materials and strategies",
    documentCount: 12,
    icon: <File className="h-5 w-5 text-pink-500" />,
    usage: 28,
  },
  {
    id: "cat-6",
    name: "Balance Sheets",
    description: "Company balance sheets and financial statements",
    documentCount: 8,
    icon: <FileSpreadsheet className="h-5 w-5 text-green-500" />,
    usage: 20,
  },
  {
    id: "cat-7",
    name: "Income Statements",
    description: "Profit and loss statements",
    documentCount: 10,
    icon: <FileSpreadsheet className="h-5 w-5 text-blue-500" />,
    usage: 25,
  },
  {
    id: "cat-8",
    name: "Others",
    description: "Miscellaneous documents",
    documentCount: 5,
    icon: <FolderOpen className="h-5 w-5 text-gray-500" />,
    usage: 12,
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const handleCreateCategory = () => {
    if (!newCategory.name) return

    const newCategoryObj = {
      id: `cat-${categories.length + 1}`,
      name: newCategory.name,
      description: newCategory.description || "No description",
      documentCount: 0,
      icon: <FolderOpen className="h-5 w-5 text-gray-500" />,
      usage: 0,
    }

    setCategories([...categories, newCategoryObj])
    setNewCategory({ name: "", description: "" })
    setIsDialogOpen(false)
  }

  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((cat) => {
          if (activeTab === "financial") {
            return ["Balance Sheets", "Income Statements", "Reports", "Invoices"].includes(cat.name)
          } else if (activeTab === "legal") {
            return ["Contracts", "HR Documents"].includes(cat.name)
          } else if (activeTab === "marketing") {
            return ["Marketing"].includes(cat.name)
          }
          return true
        })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize your documents with custom categories.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>Add a new category to organize your documents.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Tax Documents"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Brief description of this category"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCategory}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-3 w-3" />
              Sort
            </Button>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Storage usage</span>
                    <span className="text-sm font-medium">{category.usage}%</span>
                  </div>
                  <Progress value={category.usage} className="h-2" />
                </CardContent>
                <CardFooter className="pt-1">
                  <div className="flex justify-between items-center w-full">
                    <Badge variant="outline" className="font-normal">
                      {category.documentCount} {category.documentCount === 1 ? "document" : "documents"}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/dashboard/documents?category=${category.name}`}>View</a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
