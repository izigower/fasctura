"use client"

import { useState } from "react"
import { Check, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Button className="gap-1" onClick={handleSave} disabled={loading}>
          {loading ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  This information will appear on your quotes and invoices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Your Company Name" defaultValue="QuoteCraft Solutions" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Email Address</Label>
                  <Input id="companyEmail" type="email" placeholder="contact@example.com" defaultValue="contact@quotecraft.app" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Phone Number</Label>
                  <Input id="companyPhone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Address</Label>
                  <Textarea id="companyAddress" placeholder="123 Business St, City, Country" defaultValue="123 Business St, Tech City, 10001" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quote Settings</CardTitle>
                <CardDescription>
                  Configure default settings for your quotes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quotePrefix">Quote Number Prefix</Label>
                  <Input id="quotePrefix" placeholder="Q-" defaultValue="Q-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultVat">Default VAT Rate (%)</Label>
                  <Select defaultValue="21">
                    <SelectTrigger id="defaultVat">
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
                <div className="space-y-2">
                  <Label htmlFor="defaultTerms">Default Terms & Conditions</Label>
                  <Textarea 
                    id="defaultTerms" 
                    rows={3}
                    defaultValue="This quote is valid for 30 days from the issue date."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultNotes">Default Notes</Label>
                  <Textarea 
                    id="defaultNotes" 
                    rows={3}
                    defaultValue="Payment is due within 30 days of issue. Please make payment to the bank account details provided."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Your Name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
                <p className="text-xs text-muted-foreground">Leave blank to keep your current password</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup defaultValue="free">
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="flex-1">
                      <div className="font-medium">Free Plan</div>
                      <div className="text-sm text-muted-foreground">3 quotes per month</div>
                    </Label>
                    <div className="font-medium">€0/month</div>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4 border-primary">
                    <RadioGroupItem value="pro" id="pro" />
                    <Label htmlFor="pro" className="flex-1">
                      <div className="font-medium">Pro Plan</div>
                      <div className="text-sm text-muted-foreground">Unlimited quotes, premium features</div>
                    </Label>
                    <div className="font-medium">€9/month</div>
                  </div>
                </RadioGroup>
                
                <div className="flex items-center space-x-2">
                  <Switch id="annual" />
                  <Label htmlFor="annual">Bill annually (save 20%)</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Upgrade Plan</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Update your payment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium">Default</span>
                  </div>
                </div>
                <Button variant="outline">Add Payment Method</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Quote Viewed</Label>
                  <p className="text-sm text-muted-foreground">When a client views your quote</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="quoteViewedEmail" defaultChecked />
                    <Label htmlFor="quoteViewedEmail">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="quoteViewedApp" defaultChecked />
                    <Label htmlFor="quoteViewedApp">App</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Quote Accepted</Label>
                  <p className="text-sm text-muted-foreground">When a client accepts your quote</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="quoteAcceptedEmail" defaultChecked />
                    <Label htmlFor="quoteAcceptedEmail">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="quoteAcceptedApp" defaultChecked />
                    <Label htmlFor="quoteAcceptedApp">App</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Quote Rejected</Label>
                  <p className="text-sm text-muted-foreground">When a client rejects your quote</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="quoteRejectedEmail" defaultChecked />
                    <Label htmlFor="quoteRejectedEmail">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="quoteRejectedApp" defaultChecked />
                    <Label htmlFor="quoteRejectedApp">App</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Marketing Updates</Label>
                  <p className="text-sm text-muted-foreground">New features and product updates</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="marketingEmail" />
                    <Label htmlFor="marketingEmail">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="marketingApp" defaultChecked />
                    <Label htmlFor="marketingApp">App</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}