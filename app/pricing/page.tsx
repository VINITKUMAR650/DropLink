'use client'

import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { SmartButton } from '@/components/ui/SmartButton'
import { Card } from '@/components/ui/Card'
import { 
  CheckCircle, 
  ArrowLeft,
  Star,
  Zap,
  Crown,
  Sparkles,
  ChevronDown,
  Users,
  Shield,
  Globe
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly')

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for occasional users or anyone exploring DropLink for the first time.",
      icon: <CheckCircle className="h-6 w-6 text-emerald-500" />,
             features: [
         "Share and receive up to 1 GB per month",
         "10 transfers per month",
         "Transfer expiry up to 7 days",
         "Basic file sharing",
         "Password protection on shared files",
         "Custom expiry date control"
       ],
      popular: false,
      cta: "Create Account",
      href: "/register",
      color: "from-emerald-50 to-emerald-100/50",
      note: "For individual, non-commercial use only"
    },
    {
      name: "Pro",
      price: billingPeriod === 'yearly' ? "9" : "12",
      period: billingPeriod === 'yearly' ? "month, billed yearly" : "month",
      description: "The ultimate choice for power users who share files all day, every day.",
      icon: <Zap className="h-6 w-6 text-blue-500" />,
             features: [
         "Everything in Free, plus:",
         "Share and receive up to 10 GB per month",
         "Unlimited transfers per month",
         "Transfer expiry up to 30 days",
         "Download analytics",
         "Advanced password protection",
         "Extended expiry control (up to 90 days)",
         "File access notifications"
       ],
      popular: true,
      cta: "Continue",
      href: "/register",
      color: "from-blue-50 to-indigo-100/50",
      note: "For individual use only"
    },
    {
      name: "Teams",
      price: billingPeriod === 'yearly' ? "16.58" : "22",
      period: billingPeriod === 'yearly' ? "per user/month, billed yearly" : "per user/month",
      description: "Ideal for small teams that need a powerful and robust file sharing solution.",
      icon: <Users className="h-6 w-6 text-purple-500" />,
             features: [
         "Everything in Pro, plus:",
         "Invite your team members",
         "Up to 25 members in your team",
         "Centralized billing",
         "Team management",
         "Advanced analytics",
         "Team-wide password policies",
         "Bulk expiry management",
         "Access control permissions"
       ],
      popular: false,
      cta: "Continue",
      href: "/contact",
      color: "from-purple-50 to-purple-100/50",
      note: "Up to 25 members"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Price tailored to your business",
      description: "Our most scalable and secure solution, customizable to your needs.",
      icon: <Crown className="h-6 w-6 text-yellow-500" />,
             features: [
         "Everything in Teams, plus:",
         "Unlimited members in your team",
         "Custom transfer rules",
         "Premium support",
         "Single sign-on (SSO)",
         "Advanced access management",
         "Usage and security logs",
         "Enterprise-grade security policies",
         "Advanced expiry automation",
         "Compliance reporting"
       ],
      popular: false,
      cta: "Contact Us",
      href: "/contact",
      color: "from-yellow-50 to-yellow-100/50",
      note: "Unlimited members"
    }
  ]

  const faqs = [
    {
      question: "What happens after I sign up and pay?",
      answer: "You'll get immediate access to your plan features. You can start uploading and sharing files right away with your new limits and capabilities."
    },
    {
      question: "Do my recipients need to sign up?",
      answer: "No! Anyone can download your files using the share link - no account required. This makes it super easy to share with clients, friends, or anyone."
    },
    {
      question: "Can I receive bigger transfers from anyone?",
      answer: "Yes! With Pro and higher plans, you can receive files up to your plan's limit from anyone, even if they're using a free account."
    },
    {
      question: "How do I add (and remove) team members?",
      answer: "In the Teams plan, you can invite members through your dashboard. They'll receive an email invitation and can join your team instantly."
    },
    {
      question: "What payment methods can I use?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe."
    },
    {
      question: "What happens if I go over my storage limit?",
      answer: "You'll receive a notification when you're close to your limit. You can either upgrade your plan or delete some old files to free up space."
    },
    {
      question: "What can I do with a Free plan?",
      answer: "Free users can upload up to 1GB per month, share files for 7 days, and have up to 10 transfers. Perfect for occasional use!"
    },
    {
      question: "How do I cancel?",
      answer: "You can cancel anytime from your account settings. No long-term contracts or hidden fees. Your files remain accessible until the end of your billing period."
    },
    {
      question: "Can I trust DropLink? How safe is it?",
      answer: "Absolutely! We use enterprise-grade encryption, secure data centers, and regular security audits. Your files are protected with bank-level security."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            You've got the ideas, we've got the
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> plans</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Whether you're sharing big files for fun or delivering work for clients — keep creative projects moving forward with DropLink.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
              </button>
            </div>
            {billingPeriod === 'yearly' && (
              <span className="ml-3 text-sm text-green-600 font-medium">Save 25%</span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                {plan.name === 'Teams' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Best for Businesses
                    </span>
                  </div>
                )}
                
                <Card className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 shadow-xl' 
                    : 'hover:ring-2 hover:ring-gray-200'
                }`}>
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mb-3">
                        {plan.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">
                          {plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}
                        </span>
                        <p className="text-gray-500 text-xs mt-1">{plan.period}</p>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-center">
                      <SmartButton 
                        href={plan.href} 
                        className={`w-full ${
                          plan.popular 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                        size="sm"
                      >
                        {plan.cta}
                      </SmartButton>
                      {plan.note && (
                        <p className="text-xs text-gray-500 mt-2">{plan.note}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Plans Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Other plans</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
                         <div className="flex items-center justify-between">
               <div>
                 <h3 className="text-lg font-semibold text-gray-900">Starter</h3>
                 <p className="text-gray-600 text-sm">Share and receive up to 500 GB per month</p>
                 <div className="flex items-center gap-2 mt-1">
                   <span className="inline-flex items-center text-xs text-green-600">
                     <CheckCircle className="h-3 w-3 mr-1" />
                     Password protection
                   </span>
                   <span className="inline-flex items-center text-xs text-blue-600">
                     <Shield className="h-3 w-3 mr-1" />
                     Expiry control
                   </span>
                 </div>
               </div>
               <div className="text-right">
                 <p className="text-2xl font-bold text-green-600">
                   Free
                 </p>
                 <p className="text-sm text-gray-500">
                   Forever
                 </p>
               </div>
               <SmartButton href="/register" variant="outline" size="sm">
                 Get Started
               </SmartButton>
             </div>
             <p className="text-xs text-gray-500 mt-2 text-center">For individual use only</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">14-Day Free Trial</h3>
              <p className="text-sm text-gray-600">Try any paid plan risk-free</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">30-Day Guarantee</h3>
              <p className="text-sm text-gray-600">Money back if not satisfied</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cancel Anytime</h3>
              <p className="text-sm text-gray-600">No long-term commitments</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between cursor-pointer">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-gray-600 mt-3 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust DropLink for secure, fast file sharing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SmartButton href="/register" size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-50">
                Start Free Trial
              </SmartButton>
              <Link href="/features">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

