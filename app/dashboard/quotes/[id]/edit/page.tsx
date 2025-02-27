"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Define the line item type
interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// Mock quote data
const mockQuote = {
  id: "Q-2023-001",
  status: "sent",
  clientName: "Acme Inc.",
  clientEmail: "contact@acmeinc.com",
  clientAddress: "123 Business St, Tech City, 10001",
  quoteNumber: "Q-2023-001",
  issueDate: "2023-05-15",
  dueDate: "2023-06-15",
  subtotal: 2450,
  vatRate: 21,
  vatAmount: 514.5,
  total: 2964.5,
  notes: "Payment is due within 30 days of issue. Please make payment to the bank account details provided.",
  terms: "This quote is valid for 30 days from the issue date.",
  lineItems: [
    {
      description: "Website Design",
      quantity: 1,
      unitPrice: 1200,
      amount: 1200,
    },
    {
      description: "Website Development",
      quantity: 1,
      unitPrice: 1000,
      amount: 1000,
    },
    {
      description: "Content Creation",
      quantity: 5,
      unitPrice: 50,
      amount: 250,
    },
  ],
}

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // For static export, we need to pre-render all possible quote IDs
  // In a real app, you would fetch these from your database
  return [
    { id: "Q-2023-001" },
    { id: "Q-2023-002" },
    { id: "Q-2023-003" },
    { id: "Q-2023-004" },
    { id: "Q-2023-005" },
  ]
}

export default function EditQuotePage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [includeVat, setIncludeVat] = useState(true)
  const [vatRate, setVatRate] = useState(mockQuote.vatRate)
  const [lineItems, setLineItems] = useState<LineItem[]>(mockQuote.lineItems)
  const [quoteData, setQuoteData] = useState({
    clientName: mockQuote.clientName,
    clientEmail: mockQuote.clientEmail,
    clientAddress: mockQuote.clientAddress,
    quoteNumber: mockQuote.quoteNumber,
    issueDate: mockQuote.issueDate,
    dueDate: mockQuote.dueDate,
    notes: mockQuote.notes,
    terms: mockQuote.terms,
  })

  // Calculate subtotal, VAT, and total
  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const vatAmount = includeVat ? subtotal * (vatRate / 100) : 0
  const total = subtotal + vatAmount

  // Add a new line item
  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unitPrice: 0, amount: 0 }])
  }

  // Remove a line item
  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      const newItems = [...lineItems]
      newItems.splice(index, 1)
      setLineItems(newItems)
    }
  }

  // Update a line item
  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const newItems = [...lineItems]
    
    if (field === 'quantity' || field === 'unitPrice') {
      const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value
      newItems[index][field] = numValue
      newItems[index].amount = newItems[index].quantity * newItems[index].unitPrice
    } else if (field === 'description') {
      newItems[index][field] = value as string
    }
    
    setLineItems(newItems)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuoteData({
      ...quoteData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically update the quote in your database
    console.log({
      ...quoteData,
      lineItems,
      subtotal,
      vatRate: includeVat ? vatRate : 0,
      vatAmount,
      total,
    })
    
    toast({
      title: "Quote updated",
      description: "Your quote has been updated successfully.",
    })
    
    // In a real app, you might redirect to the quote view page
    // router.push(`/dashboard/quotes/${params.id}`)
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/quotes/${params.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Quote {params.id}</h1>
        </div>
      </div>
  )
}