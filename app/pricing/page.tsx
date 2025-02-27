import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that works best for your business
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-16 max-w-5xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Free Plan</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-5xl font-bold mb-2">€0</div>
            <p className="text-sm text-muted-foreground mb-6">per month</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>3 quotes per month</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Basic quote templates</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Email delivery</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>PDF export</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Basic client management</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary relative">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            POPULAR
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Pro Plan</CardTitle>
            <CardDescription>For growing businesses</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-5xl font-bold mb-2">€9</div>
            <p className="text-sm text-muted-foreground mb-6">per month</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Unlimited quotes</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Premium templates</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Email & link sharing</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Advanced PDF customization</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Advanced client management</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Quote analytics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard">Subscribe Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
            <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens if I exceed my quote limit on the free plan?</h3>
            <p className="text-muted-foreground">You'll be notified when you reach your limit. You can upgrade to the Pro plan for unlimited quotes or wait until the next month when your limit resets.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Do you offer a discount for annual billing?</h3>
            <p className="text-muted-foreground">Yes, we offer a 20% discount when you choose annual billing. Contact our sales team for more information.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is there a trial period for the Pro plan?</h3>
            <p className="text-muted-foreground">Yes, we offer a 14-day free trial of the Pro plan. No credit card required to start your trial.</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Need a custom solution?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We offer custom plans for businesses with specific needs. Contact our sales team to discuss your requirements.
        </p>
        <Button size="lg" variant="default">Contact Sales</Button>
      </div>
    </div>
  )
}