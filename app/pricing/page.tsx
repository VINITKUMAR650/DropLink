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
  Sparkles,
  ChevronDown,
  Shield,
  Globe,
  Heart,
  Rocket
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
      originalPrice: null,
      description: "Perfect for getting started with secure file sharing",
      icon: <Heart className="h-8 w-8 text-emerald-500" />,
      features: [
        "Up to 1 GB storage per month",
        "10 file transfers monthly",
        "7-day file expiry",
        "Password protection",
        "Basic file sharing",
        "Community support"
      ],
      popular: false,
      cta: "Get Started Free",
      href: "/register",
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      textColor: "text-emerald-600",
      buttonStyle: "bg-emerald-600 hover:bg-emerald-700 text-white"
    },
    {
      name: "Pro",
      price: billingPeriod === 'yearly' ? "9" : "12",
      period: billingPeriod === 'yearly' ? "per month" : "per month",
      originalPrice: billingPeriod === 'yearly' ? "12" : null,
      description: "Unleash the full power of professional file sharing",
      icon: <Rocket className="h-8 w-8 text-blue-500" />,
      features: [
        "Everything in Free, plus:",
        "Up to 100 GB storage per month",
        "Unlimited file transfers",
        "90-day file expiry",
        "Advanced analytics & insights",
        "Priority support",
        "Custom branding options",
        "API access"
      ],
      popular: true,
      cta: "Upgrade to Pro",
      href: "/register",
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-50 to-purple-50",
      textColor: "text-blue-600",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
    }
  ]

  const faqs = [
    {
      question: "What happens after I sign up?",
      answer: "You'll get immediate access to your plan features. Free users can start sharing right away, Pro users get a 14-day trial with full access."
    },
    {
      question: "Do recipients need to create an account?",
      answer: "No! Anyone can download your files using the share link - no account required. This makes sharing incredibly simple."
    },
    {
      question: "What's the difference between Free and Pro?",
      answer: "Pro gives you 100x more storage (100GB vs 1GB), unlimited transfers, longer file expiry, analytics, and priority support."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and PayPal. All payments are processed securely through Stripe with bank-level encryption."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Yes! You can change your plan anytime from your dashboard. Upgrades are instant, and downgrades take effect at your next billing cycle."
    },
    {
      question: "Is my data secure?",
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
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
            <h1 className="relative text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Simple Pricing for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block"> Everyone</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your file sharing needs. Start free, upgrade when you're ready.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">No hidden fees</span>
            </div>
            <div className="flex items-center text-blue-600">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Bank-level security</span>
            </div>
            <div className="flex items-center text-purple-600">
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
          </div>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className="relative group">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                      <Star className="h-4 w-4 mr-2 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <Card className={`relative h-full transition-all duration-500 group-hover:scale-105 ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30' 
                    : 'hover:ring-2 hover:ring-gray-200 shadow-lg hover:shadow-xl bg-gradient-to-br ' + plan.bgGradient
                }`}>
                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-r ${plan.gradient}`}>
                        <div className="bg-white rounded-xl p-2">
                          {plan.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{plan.description}</p>
                      
                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center mb-2">
                          {plan.originalPrice && (
                            <span className="text-lg text-gray-400 line-through mr-2">
                              ${plan.originalPrice}
                            </span>
                          )}
                          <span className="text-5xl font-bold text-gray-900">
                            {plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}
                          </span>
                        </div>
                        <p className="text-gray-500">
                          {plan.period}
                          {billingPeriod === 'yearly' && plan.originalPrice && (
                            <span className="ml-2 text-green-600 font-medium text-sm">
                              Save 25%
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className={`text-gray-700 ${
                            feature.startsWith('Everything in') ? 'font-semibold' : ''
                          }`}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="text-center">
                      <SmartButton 
                        href={plan.href} 
                        className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${plan.buttonStyle} shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                        size="lg"
                      >
                        {plan.cta}
                      </SmartButton>
                      <p className="text-sm text-gray-500 mt-4">
                        {plan.name === 'Free' ? 'No credit card required' : '14-day free trial included'}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Features</h2>
            <p className="text-xl text-gray-600">See what's included in each plan</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
              </div>
              <div className="p-6 text-center bg-emerald-50">
                <h3 className="text-lg font-semibold text-emerald-600 mb-2">Free</h3>
              </div>
              <div className="p-6 text-center bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Pro</h3>
              </div>
            </div>
            
            {[
              { feature: 'Monthly Storage', free: '1 GB', pro: '100 GB' },
              { feature: 'File Transfers', free: '10/month', pro: 'Unlimited' },
              { feature: 'File Expiry', free: '7 days', pro: '90 days' },
              { feature: 'Password Protection', free: '✓', pro: '✓' },
              { feature: 'Download Analytics', free: '✗', pro: '✓' },
              { feature: 'Custom Branding', free: '✗', pro: '✓' },
              { feature: 'API Access', free: '✗', pro: '✓' },
              { feature: 'Priority Support', free: '✗', pro: '✓' }
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200">
                <div className="p-4">
                  <span className="text-gray-900 font-medium">{row.feature}</span>
                </div>
                <div className="p-4 text-center">
                  <span className={`${
                    row.free === '✓' ? 'text-green-600' : 
                    row.free === '✗' ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    {row.free}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <span className={`${
                    row.pro === '✓' ? 'text-green-600' : 
                    row.pro === '✗' ? 'text-gray-400' : 'text-gray-900'
                  } font-medium`}>
                    {row.pro}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DropLink?</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of users worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">14-Day Free Trial</h3>
              <p className="text-gray-600 leading-relaxed">Try Pro features risk-free with our generous trial period</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cancel Anytime</h3>
              <p className="text-gray-600 leading-relaxed">No long-term contracts or hidden fees. Cancel with one click</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
              <div className="text-gray-600">Files Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
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
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Sharing?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who trust DropLink for secure, lightning-fast file sharing
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <SmartButton 
                  href="/register" 
                  size="lg" 
                  className="text-lg px-10 py-4 bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Start Free Forever
                </SmartButton>
                <SmartButton 
                  href="/register" 
                  size="lg" 
                  className="text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Try Pro Free
                </SmartButton>
              </div>
              <p className="text-blue-200 text-sm mt-6">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}