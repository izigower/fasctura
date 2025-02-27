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

// Initial empty line item
const emptyLineItem: LineItem = {
  description: "",
  quantity: 1,
  unitPrice: 0,
  amount: 0,
}

export default function NewQuotePage() {
  const { toast } = useToast()
  const [includeVat, setIncludeVat] = useState(true)
  const [vatRate, setVatRate] = useState(21)
  const [lineItems, setLineItems] = useState<LineItem[]>([{ ...emptyLineItem }])
  const [quoteData, setQuoteData] = useState({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    quoteNumber: `Q-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: "Payment is due within 30 days of issue. Please make payment to the bank account details provided.",
    terms: "This quote is valid for 30 days from the issue date.",
  })

  // Calculate subtotal, VAT, and total
  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const vatAmount = includeVat ? subtotal * (vatRate / 100) : 0
  const total = subtotal + vatAmount

  // Add a new line item
  const addLineItem = () => {
    setLineItems([...lineItems, { ...emptyLineItem }])
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
    
    // Here you would typically save the quote to your database
    console.log({
      ...quoteData,
      lineItems,
      subtotal,
      vatRate: includeVat ? vatRate : 0,
      vatAmount,
      total,
    })
    
    toast({
      title: "Quote created",
      description: "Your quote has been saved successfully.",
    })
    
    // In a real app, you might redirect to the quote view page
    // router.push(`/dashboard/quotes/${quoteData.quoteNumber}`)
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
          <h1 className="text-3xl font-bold tracking-tight">Create New Quote</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>
                Enter your client's details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input 
                  id="clientName" 
                  name="clientName" 
                  placeholder="Acme Inc." 
                  value={quoteData.clientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input 
                  id="clientEmail" 
                  name="clientEmail" 
                  type="email" 
                  placeholder="client@example.com" 
                  value={quoteData.clientEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Textarea 
                  id="clientAddress" 
                  name="clientAddress" 
                  placeholder="123 Business St, City, Country" 
                  value={quoteData.clientAddress}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quote Details</CardTitle>
              <CardDescription>
                Set your quote information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quoteNumber">Quote Number</Label>
                <Input 
                  id="quoteNumber" 
                  name="quoteNumber" 
                  value={quoteData.quoteNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input 
                  id="issueDate" 
                  name="issueDate" 
                  type="date" 
                  value={quoteData.issueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Valid Until</Label>
                <Input 
                  id="dueDate" 
                  name="dueDate" 
                  type="date" 
                  value={quoteData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>
                Configure tax options for this quote
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="includeVat">Include VAT</Label>
                <Switch 
                  id="includeVat" 
                  checked={includeVat} 
                  onCheckedChange={setIncludeVat} 
                />
              </div>
              {includeVat && (
                <div className="space-y-2">
                  <Label htmlFor="vatRate">VAT Rate (%)</Label>
                  <Select 
                    value={vatRate.toString()} 
                    onValueChange={(value) => setVatRate(parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select VAT rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                      <SelectItem value="21">21%</SelectItem>
                      <SelectItem value="25">25%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Line Items</CardTitle>
            <CardDescription>
              Add the products or services you're quoting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-4 font-medium border-b">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-1 text-right">Amount</div>
                <div className="col-span-1"></div>
              </div>
              
              {lineItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center border-b last:border-0">
                  <div className="col-span-6">
                    <Input 
                      placeholder="Item description" 
                      value={item.description}
                      onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number" 
                      min="1" 
                      value={item.quantity}
                      onChange={(e) => updateLineItem(index, 'quantity', e.target.value)}
                      className="text-center"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Input 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={item.unitPrice}
                      onChange={(e) => updateLineItem(index, 'unitPrice', e.target.value)}
                      className="text-center"
                      required
                    />
                  </div>
                  <div className="col-span-1 text-right font-medium">
                    €{(item.quantity * item.unitPrice).toFixed(2)}
                  </div>
                  <div className="col-span-1 text-right">
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeLineItem(index)}
                      disabled={lineItems.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              type="button"
              variant="outline" 
              size="sm" 
              className="mt-4 gap-1"
              onClick={addLineItem}
            >
              <Plus className="h-4 w-4" /> Add Item
            </Button>
            
            <div className="mt-6 space-y-2 text-right">
              <div className="flex justify-end">
                <span className="w-32 text-muted-foreground">Subtotal:</span>
                <span className="w-32 font-medium">€{subtotal.toFixed(2)}</span>
              </div>
              {includeVat && (
                <div className="flex justify-end">
                  <span className="w-32 text-muted-foreground">VAT ({vatRate}%):</span>
                  <span className="w-32 font-medium">€{vatAmount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-end">
                <span className="w-32 text-muted-foreground">Total:</span>
                <span className="w-32 text-xl font-bold">€{total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>
              Add notes and terms to your quote
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                placeholder="Additional information for your client..." 
                value={quoteData.notes}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms">Terms & Conditions</Label>
              <Textarea 
                id="terms" 
                name="terms" 
                placeholder="Terms and conditions..." 
                value={quoteData.terms}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" type="button">Save as Draft</Button>
              <Button type="submit">Create Quote</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}