import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Upload, 
  Download, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Link as LinkIcon,
  CheckCircle,
  ArrowLeft,
  Star,
  Clock,
  Smartphone,
  Lock
} from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  const features = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Instant File Upload",
      description: "Drag and drop files or click to select. Support for all major file types including images, videos, documents, and archives.",
      highlight: "Lightning Fast"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "No Signup Downloads",
      description: "Anyone can download your files with just a link. No account creation required for recipients.",
      highlight: "Zero Friction"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Files are encrypted and stored securely. Optional password protection and automatic expiry dates.",
      highlight: "Bank-Grade Security"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Optimized infrastructure ensures fast uploads and downloads. Share files in seconds.",
      highlight: "< 3s Upload"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Access",
      description: "Works on any device, anywhere. No app downloads required. Perfect for mobile and desktop.",
      highlight: "Cross-Platform"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Ready",
      description: "Perfect for teams, freelancers, and businesses. Track downloads and manage files easily.",
      highlight: "Business-Grade"
    }
  ]

  const benefits = [
    "Up to 100GB storage per month",
    "Unlimited file transfers",
    "90-day file expiry options",
    "Advanced analytics & insights",
    "Password-protected sharing",
    "API access for developers",
    "Custom branding options",
    "24/7 priority support"
  ]

  const stats = [
    { value: "1M+", label: "Files Shared", icon: <Upload className="h-5 w-5" /> },
    { value: "50K+", label: "Happy Users", icon: <Users className="h-5 w-5" /> },
    { value: "99.9%", label: "Uptime", icon: <Clock className="h-5 w-5" /> },
    { value: "256-bit", label: "Encryption", icon: <Lock className="h-5 w-5" /> }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 50,000+ Users
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Powerful Features for
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Modern File Sharing
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Everything you need to share files quickly, securely, and efficiently. 
              Built for individuals, teams, and businesses of all sizes.
            </p>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-blue-600 mr-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all">
                  Try for Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover:bg-gray-50 transition-all">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Share Files
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built with modern technology and designed for the way you work today
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                <div className="p-8 text-center relative">
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why Choose DropLink?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Join thousands of users who trust DropLink for their file sharing needs. 
                From startups to enterprises, we've got you covered.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/pricing">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                    Get Started Today
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Mobile Optimized</h3>
                  <p className="text-gray-600">Works perfectly on any device</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Upload Speed</span>
                    <span className="text-sm font-semibold text-green-600">Fast</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Security</span>
                    <span className="text-sm font-semibold text-blue-600">256-bit</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Compatibility</span>
                    <span className="text-sm font-semibold text-purple-600">Universal</span>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl transform rotate-6 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your File Sharing?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of users who've made the switch to DropLink. 
            Start sharing files instantly with our modern platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all">
                <Upload className="mr-2 h-5 w-5" />
                Start Free Upload
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all">
                View All Plans
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-blue-100">
            <p className="text-sm">No credit card required • Free forever plan available</p>
          </div>
        </div>
      </section>
    </div>
  )
}