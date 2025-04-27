import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Search, Shield, Upload } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DocuAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Intelligent Document Management</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Upload, organize, and search your documents with AI-powered features for enhanced productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <FeatureCard
                icon={<Upload className="h-10 w-10 text-primary" />}
                title="Easy Document Upload"
                description="Upload documents in PDF, Word, and image formats with a simple drag-and-drop interface."
              />
              <FeatureCard
                icon={<Search className="h-10 w-10 text-primary" />}
                title="Smart Search"
                description="Find any document instantly with our powerful full-text search and AI-powered document classification."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Secure Access Control"
                description="Control who can view, edit, and share your documents with role-based permissions."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <StepCard number={1} title="Upload Documents" description="Upload your documents in various formats." />
              <StepCard
                number={2}
                title="AI Processing"
                description="Our AI extracts text and classifies your documents."
              />
              <StepCard
                number={3}
                title="Organize"
                description="Organize documents into categories or let AI do it for you."
              />
              <StepCard
                number={4}
                title="Search & Retrieve"
                description="Quickly find and access your documents when needed."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of users who are already managing their documents more efficiently.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Sign Up for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-bold">DocuAI</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact Us
              </Link>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © {new Date().getFullYear()} DocuAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
