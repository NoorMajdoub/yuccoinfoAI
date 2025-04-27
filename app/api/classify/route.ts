import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    // In a real application, this would analyze the document content
    // and classify it into appropriate categories

    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "No text content provided" }, { status: 400 })
    }

    // Use AI to classify the document
    const { text: classificationResult } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Classify the following document text into appropriate categories and extract key metadata. The text is: "${text.substring(0, 500)}..."
      
      Return the result as JSON with the following structure:
      {
        "category": "The primary category (e.g., Invoice, Contract, Report, etc.)",
        "tags": ["tag1", "tag2", "tag3"],
        "summary": "A brief summary of the document content",
        "entities": ["List of key entities mentioned"],
        "confidence": 0.95
      }`,
    })

    // Parse the AI response
    let classification
    try {
      classification = JSON.parse(classificationResult)
    } catch (e) {
      // Fallback if parsing fails
      classification = {
        category: "Uncategorized",
        tags: ["unclassified"],
        summary: "Could not generate summary",
        entities: [],
        confidence: 0.5,
      }
    }

    return NextResponse.json({
      success: true,
      classification,
      processedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Document classification error:", error)
    return NextResponse.json({ error: "Failed to classify document" }, { status: 500 })
  }
}
