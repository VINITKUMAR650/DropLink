'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { 
  ArrowLeft,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Users,
  Headphones,
  Sparkles,
  Send,
  Globe
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Support",
      value: "hello@droplink.com",
      description: "Get expert help within 2 hours",
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Live Chat",
      value: "Available 24/7",
      description: "Instant support when you need it",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone Support",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri, 8AM-8PM PST",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Office",
      value: "San Francisco, CA",
      description: "Visit us for coffee & collaboration",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50"
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
            <div className="inline-flex items-center px-4 py-2 mb-8 text-sm bg-green-100 text-green-800 rounded-full">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-medium">Our team typically responds within 2 hours</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Let's Start a
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2"> Conversation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Whether you have questions, need support, or want to explore partnerships - 
              we're here to help you succeed with DropLink.
            </p>
            
            {/* Quick Contact Options */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                <span>24/7 Live Chat Support</span>
              </div>
              <div className="flex items-center">
                <Headphones className="h-5 w-5 mr-2 text-green-500" />
                <span>Expert Technical Help</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                <span>Partnership Opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  For urgent matters, use our live chat or call us directly.
                </p>
              </div>
              
              <Card className="border-0 shadow-xl bg-white">
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <Input
                      label="Subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Tell us more about how we can help you..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      loading={loading}
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-600">
                  Choose the best way to reach us. Our team is standing by to provide 
                  exceptional support and answer any questions you might have.
                </p>
              </div>
              
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className={`relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-gradient-to-br ${info.bgColor} overflow-hidden`}>
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mr-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                          <p className="text-lg text-gray-900 font-semibold mb-1">{info.value}</p>
                          <p className="text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-bl-full"></div>
                  </Card>
                ))}
              </div>

              {/* FAQ Link */}
              <Card className="mt-8 border-0 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Need Quick Answers?</h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Check out our comprehensive FAQ section for instant solutions to common questions.
                  </p>
                  <Link href="/help">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3">
                      Browse FAQ
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm bg-orange-100 text-orange-800 rounded-full">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="font-medium">Visit Our Headquarters</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Come Visit Us in
              <span className="text-orange-600"> San Francisco</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our doors are always open for coffee, collaboration, and conversation about the future of file sharing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">DropLink Headquarters</h3>
                  <div className="text-gray-700 text-lg space-y-2 mb-6">
                    <p>123 Innovation Street</p>
                    <p>San Francisco, CA 94105</p>
                    <p>United States</p>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 mb-4">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Monday - Friday, 9:00 AM - 6:00 PM PST</span>
                  </div>
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    Get Directions
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">What to Expect</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <Users className="h-5 w-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span>Meet our passionate team of engineers and designers</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-5 w-5 mr-3 mt-0.5 text-purple-500 flex-shrink-0" />
                    <span>See DropLink technology in action with live demos</span>
                  </li>
                  <li className="flex items-start">
                    <MessageSquare className="h-5 w-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Discuss partnership opportunities and integrations</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Schedule a Visit</h4>
                <p className="text-gray-600 mb-4">
                  Want to schedule a meeting or tour? Send us a message above or call us directly. 
                  We love meeting new people and sharing our passion for file sharing innovation.
                </p>
                <Link href="#contact-form">
                  <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
                    Schedule Meeting
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Experience
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">The Future?</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Don't wait - start sharing files like a professional today. 
              Join thousands of satisfied users who've revolutionized their workflow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="text-xl px-12 py-5 bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 font-semibold">
                  Start Free Trial
                  <Send className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-xl px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
            
            <p className="text-blue-200">
              ✨ No credit card required • Set up in under 60 seconds • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

