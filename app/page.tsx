import { Header } from '@/components/Header'
import { SmartButton } from '@/components/ui/SmartButton'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Download, 
  Upload, 
  Link as LinkIcon,
  Star,
  CheckCircle,
  Play,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-8 text-sm bg-blue-100 text-blue-800 rounded-full">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="font-medium">Over 1M+ files shared securely</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Share Files Like a
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2"> Professional</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              The most advanced file sharing platform trusted by professionals worldwide. 
              Upload, share, and track your files with enterprise-grade security.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-500" />
                <span>99.9% Uptime</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <SmartButton href="/register" size="lg" className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </SmartButton>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-gray-50 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
            
            {/* Social Proof */}
            <p className="text-sm text-gray-500 mt-8">
              Trusted by teams at Google, Microsoft, and 10,000+ companies
            </p>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Professionals Choose
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> DropLink</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built for the modern workplace with enterprise-grade features that scale with your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload and share files in seconds with our globally distributed CDN and optimized infrastructure
                </p>
                <div className="mt-6 flex items-center justify-center text-sm text-blue-600 font-medium">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  99.9% faster than email
                </div>
              </div>
            </Card>
            
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  Bank-level encryption and advanced access controls keep your data safe
                </p>
                <div className="mt-6 flex items-center justify-center text-sm text-green-600 font-medium">
                  <Award className="h-4 w-4 mr-2" />
                  Enterprise Security
                </div>
              </div>
            </Card>
            
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Global Access</h3>
                <p className="text-gray-600 leading-relaxed">
                  Works seamlessly across all devices and platforms. No apps to install, no barriers to sharing
                </p>
                <div className="mt-6 flex items-center justify-center text-sm text-purple-600 font-medium">
                  <Globe className="h-4 w-4 mr-2" />
                  Available worldwide
                </div>
              </div>
            </Card>
            
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-orange-50 to-red-50">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Zero Friction</h3>
                <p className="text-gray-600 leading-relaxed">
                  Recipients need zero setup. Just click the link and download - no accounts or apps required
                </p>
                <div className="mt-6 flex items-center justify-center text-sm text-orange-600 font-medium">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  No signup needed
                </div>
              </div>
            </Card>
            
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-indigo-50 to-blue-50">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <LinkIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Links</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant shareable links with advanced options like password protection and expiry dates
                </p>
                <div className="mt-6 flex items-center justify-center text-sm text-indigo-600 font-medium">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Advanced features
                </div>
              </div>
            </Card>
            
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-teal-50 to-cyan-50">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Team Ready</h3>
                <p className="text-gray-600 leading-relaxed">
                  Built for collaboration with team management, analytics, and enterprise-grade admin controls
                </p>
                <div className="mt-6 flex items-center justify-center text-sm text-teal-600 font-medium">
                  <Users className="h-4 w-4 mr-2" />
                  Perfect for teams
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">File Sharing?</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-12 leading-relaxed">
              Join over 100,000+ professionals who trust DropLink for secure, 
              lightning-fast file sharing every day.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <SmartButton 
                href="/register" 
                size="lg" 
                className="text-xl px-12 py-5 bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 font-semibold"
              >
                Start Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </SmartButton>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold"
              >
                <Play className="mr-3 h-6 w-6" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">100K+</div>
                <div className="text-blue-100">Happy Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">1M+</div>
                <div className="text-blue-100">Files Shared</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-blue-100">Uptime SLA</div>
              </div>
            </div>
            
            <p className="text-blue-200 mt-8">
              ✨ No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer */}
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <LinkIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DropLink</span>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                  The world's most trusted file sharing platform. Secure, fast, and reliable file sharing for professionals.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">𝕏</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">in</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    <span className="text-sm font-medium">f</span>
                  </div>
                </div>
              </div>
              
              {/* Product Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Product</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                  <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                  <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
                </ul>
              </div>
              
              {/* Company Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Company</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              {/* Support Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Support</h4>
                <ul className="space-y-4 text-gray-400">
                  <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
                  <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 DropLink, Inc. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Bank-level Security</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span>Enterprise Grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
