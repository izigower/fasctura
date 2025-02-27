"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Download, Edit, Mail, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

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

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [quote] = useState(mockQuote)
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "sent":
        return <Badge variant="secondary">Sent</Badge>
      case "accepted":
        return <Badge variant="success" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Accepted</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://quotecraft.app/quotes/${params.id}`)
    toast({
      title: "Link copied",
      description: "Quote link has been copied to clipboard",
    })
  }

  const handleSendEmail = () => {
    toast({
      title: "Email sent",
      description: `Quote has been sent to ${quote.clientEmail}`,
    })
  }

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Your quote is being downloaded",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Quote {params.id}</h1>
          <StatusBadge status={quote.status} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleCopyLink}>
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleSendEmail}>
            <Mail className="h-4 w-4" /> Email
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" /> Download
          </Button>
          <Link href={`/dashboard/quotes/${params.id}/edit`}>
            <Button size="sm" className="gap-1">
              <Edit className="h-4 w-4" /> Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="font-medium">{quote.clientName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">{quote.clientEmail}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Address</div>
                <div className="font-medium">{quote.clientAddress}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quote Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-sm text-muted-foreground">Quote Number</div>
                <div className="font-medium">{quote.quoteNumber}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Issue Date</div>
                <div className="font-medium">{new Date(quote.issueDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Valid Until</div>
                <div className="font-medium">{new Date(quote.dueDate).toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quote Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">Subtotal</div>
                <div className="font-medium">€{quote.subtotal.toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">VAT ({quote.vatRate}%)</div>
                <div className="font-medium">€{quote.vatAmount.toFixed(2)}</div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <div className="text-sm font-medium">Total</div>
                <div className="text-xl font-bold">€{quote.total.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
          <CardDescription>
            Products and services included in this quote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            
            {quote.lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center border-b last:border-0">
                <div className="col-span-6 font-medium">
                  {item.description}
                </div>
                <div className="col-span-2 text-center">
                  {item.quantity}
                </div>
                <div className="col-span-2 text-center">
                  €{item.unitPrice.toFixed(2)}
                </div>
                <div className="col-span-2 text-right font-medium">
                  €{item.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 space-y-2 text-right">
            <div className="flex justify-end">
              <span className="w-32 text-muted-foreground">Subtotal:</span>
              <span className="w-32 font-medium">€{quote.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-end">
              <span className="w-32 text-muted-foreground">VAT ({quote.vatRate}%):</span>
              <span className="w-32 font-medium">€{quote.vatAmount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-end">
              <span className="w-32 text-muted-foreground">Total:</span>
              <span className="w-32 text-xl font-bold">€{quote.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Notes</h3>
            <p className="text-sm text-muted-foreground">{quote.notes}</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-1">Terms & Conditions</h3>
            <p className="text-sm text-muted-foreground">{quote.terms}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1" onClick={() => {
              toast({
                title: "Quote duplicated",
                description: "A new draft has been created based on this quote",
              })
            }}>
              <Copy className="h-4 w-4" /> Duplicate
            </Button>
            <Button onClick={handleSendEmail}>Send Quote</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}