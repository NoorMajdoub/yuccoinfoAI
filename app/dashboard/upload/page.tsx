"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, Upload, LinkIcon, File, X, Loader2, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function UploadPage() {
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadComplete, setUploadComplete] = useState<boolean>(false)
  const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [enableOcr, setEnableOcr] = useState<boolean>(true)
  const [enableClassification, setEnableClassification] = useState<boolean>(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles((prev) => [...prev, ...filesArray])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files)
      setSelectedFiles((prev) => [...prev, ...filesArray])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (selectedFiles.length === 0 && uploadMethod === "file") {
      alert("Please select at least one file to upload")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const resetUpload = () => {
    setSelectedFiles([])
    setUploadProgress(0)
    setIsUploading(false)
    setUploadComplete(false)
    setCategory("")
    setDescription("")
  }

  // Mock categories
  const categories = ["Contracts", "Invoices", "Reports", "HR Documents", "Marketing", "Legal", "Product", "Other"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Documents</h1>
        <p className="text-muted-foreground">Add new documents to your library.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Method</CardTitle>
          <CardDescription>Choose how you want to add documents to your library.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="file"
            className="w-full"
            onValueChange={(value) => setUploadMethod(value as "file" | "url")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">
                <FileUp className="mr-2 h-4 w-4" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="url">
                <LinkIcon className="mr-2 h-4 w-4" />
                URL
              </TabsTrigger>
            </TabsList>
            <TabsContent value="file" className="mt-4">
              {!uploadComplete ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isUploading ? "bg-muted/50" : "hover:bg-muted/50"
                  } transition-colors`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="rounded-full bg-muted p-4">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Drag and drop your files here</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supports PDF, Word, Excel, PowerPoint, and image files
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                        Browse Files
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg p-8 text-center bg-muted/30">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="rounded-full bg-green-100 p-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Upload Complete!</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your documents have been successfully uploaded.
                      </p>
                    </div>
                    <Button onClick={resetUpload}>Upload More</Button>
                  </div>
                </div>
              )}

              {selectedFiles.length > 0 && !uploadComplete && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-medium">Selected Files ({selectedFiles.length})</h3>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                        <div className="flex items-center gap-3">
                          <File className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px] md:max-w-[500px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(index)} disabled={isUploading}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove file</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </TabsContent>
            <TabsContent value="url" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Document URL</Label>
                  <Input id="url" placeholder="https://example.com/document.pdf" type="url" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the URL of a document to add it to your library. We'll fetch and process it for you.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Details</CardTitle>
          <CardDescription>Add metadata to help organize and find your documents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a description for your document"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Processing Options</CardTitle>
          <CardDescription>Configure how AI should process your documents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ocr">Optical Character Recognition (OCR)</Label>
              <p className="text-sm text-muted-foreground">Extract text from scanned documents and images</p>
            </div>
            <Switch id="ocr" checked={enableOcr} onCheckedChange={setEnableOcr} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="classification">Automatic Classification</Label>
              <p className="text-sm text-muted-foreground">AI will suggest categories based on document content</p>
            </div>
            <Switch id="classification" checked={enableClassification} onCheckedChange={setEnableClassification} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={isUploading || uploadComplete}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : uploadComplete ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Uploaded
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
