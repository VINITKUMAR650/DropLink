import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  ArrowLeft,
  Users,
  Target,
  Heart,
  Shield,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Sparkles,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security First",
      description: "Bank-level encryption and zero-trust architecture protect every file.",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Speed",
      description: "Global CDN, optimized infrastructure, and cutting-edge technology deliver instant results.",
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-50 to-orange-50"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Access",
      description: "Works everywhere, on every device, for everyone - breaking down digital barriers.",
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "User-Centric",
      description: "Every feature, every design decision, every line of code is crafted with users in mind.",
      color: "from-pink-500 to-red-600",
      bgColor: "from-pink-50 to-red-50"
    }
  ]



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center px-4 py-2 mb-8 text-sm bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-900 rounded-full border border-gray-200 transition-all">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-8 text-sm bg-blue-100 text-blue-800 rounded-full">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="font-medium">Founded in 2024, Trusted by 100K+ users</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Revolutionizing
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2"> File Sharing</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              We're building the future of file sharing - making it instant, secure, and accessible to everyone, everywhere.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
                <div className="text-gray-600 text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
                <div className="text-gray-600 text-sm">Files Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-600 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm bg-blue-100 text-blue-800 rounded-full">
                <Target className="h-4 w-4 mr-2" />
                <span className="font-medium">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Making File Sharing
                <span className="text-blue-600"> Effortless</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p className="leading-relaxed">
                  In today's digital-first world, sharing files should be as simple as sending a text message. 
                  Yet millions of people struggle with email attachment limits, complex cloud storage setups, 
                  and security concerns every single day.
                </p>
                <p className="leading-relaxed">
                  DropLink was born from a simple yet powerful vision: what if file sharing could be instant, 
                  secure, and accessible to everyone? No mandatory signups for recipients, no complicated workflows, 
                  just drag, drop, and share.
                </p>
                <p className="leading-relaxed">
                  We're not just building another file sharing tool - we're crafting the future of digital collaboration, 
                  one upload at a time.
                </p>
              </div>
              
              {/* Mission Points */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Zero friction file sharing for everyone</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Enterprise-grade security without complexity</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Global accessibility across all devices</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Vision Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 shadow-xl border border-blue-100">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To become the world's most trusted platform for instant file sharing, 
                    empowering billions of people to share knowledge and collaborate seamlessly 
                    across all boundaries.
                  </p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full"></div>
                <div className="absolute top-1/2 -right-2 w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm bg-purple-100 text-purple-800 rounded-full">
              <Award className="h-4 w-4 mr-2" />
              <span className="font-medium">Our Core Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Principles That
              <span className="text-purple-600"> Drive Us</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These fundamental beliefs guide every decision we make and every product we build
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className={`relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-gradient-to-br ${value.bgColor} overflow-hidden`}>
                <div className="text-center p-8">
                  <div className={`w-18 h-18 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-white`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-bl-full"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Stats Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Professionals
              <span className="block text-yellow-400">Worldwide</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our numbers speak for themselves - we're growing fast and serving users globally
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">1M+</div>
                <div className="text-blue-100 font-medium">Files Shared</div>
                <div className="text-blue-200 text-sm mt-1">And counting...</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">100K+</div>
                <div className="text-blue-100 font-medium">Active Users</div>
                <div className="text-blue-200 text-sm mt-1">Growing daily</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">99.9%</div>
                <div className="text-blue-100 font-medium">Uptime SLA</div>
                <div className="text-blue-200 text-sm mt-1">Rock solid</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-blue-100 font-medium">Support</div>
                <div className="text-blue-200 text-sm mt-1">Always here</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-12 md:p-16 text-center border border-gray-200 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Join Our
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Journey?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Be part of the file sharing revolution. Experience the future of digital collaboration 
                with enterprise-grade security and consumer-friendly simplicity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    Start Free Trial
                    <TrendingUp className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-4 border-2 hover:bg-gray-50 group">
                    Get in Touch
                    <Users className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              <p className="text-gray-500 text-sm">
                Join 100,000+ professionals who trust DropLink • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

