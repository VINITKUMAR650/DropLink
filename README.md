# DropLink - Universal File Sharing Platform

A modern, scalable file sharing SaaS platform built with Next.js, TypeScript, and Supabase. Share files instantly with unique links - no signup required for downloads.

## 🚀 Features

### Core Features
- **Instant File Sharing**: Upload files and get shareable links immediately
- **No Signup Downloads**: Anyone can download files with just a link
- **Drag & Drop Upload**: Modern, intuitive file upload interface
- **File Management**: Dashboard to track uploads, downloads, and manage files
- **Multiple File Types**: Support for images, videos, audio, documents, and archives
- **File Size Limits**: Configurable file size limits (1GB for free users)
- **Download Tracking**: Monitor how many times your files are downloaded

### Security & Privacy
- **Secure File Storage**: Files are stored securely with unique identifiers
- **Password Protection**: Optional password protection for sensitive files
- **Expiry Dates**: Set automatic expiration for temporary file sharing
- **User Authentication**: Secure user registration and login system

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Beautiful, intuitive interface built with Tailwind CSS
- **Real-time Feedback**: Toast notifications and progress indicators
- **Copy to Clipboard**: One-click link copying functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Icons**: Lucide React, Heroicons
- **Notifications**: React Hot Toast

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd droplink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

4. **Set up Supabase database**
   - Go to your Supabase project dashboard
   - Run the SQL schema from `supabase-schema.sql` in the SQL Editor
   - Create a storage bucket named 'uploads' and make it public

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
droplink/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── upload/        # File upload endpoint
│   │   ├── download/      # File download endpoint
│   │   └── files/         # File management endpoints
│   ├── dashboard/         # User dashboard
│   ├── download/          # File download pages
│   ├── login/             # User login
│   ├── register/          # User registration
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   └── FileUpload.tsx    # File upload component
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication utilities
│   ├── supabaseClient.ts # Supabase client configuration
│   └── utils.ts         # Helper functions
└── supabase-schema.sql   # Database schema
```

## 🎯 Usage

### For End Users
1. **Upload Files**: Drag and drop files or click to select
2. **Get Share Link**: Copy the generated link instantly
3. **Share**: Send the link to anyone - no signup required
4. **Track**: Monitor downloads in your dashboard

### For Developers
1. **Customize**: Modify file size limits, supported types
2. **Extend**: Add new features like QR codes, API access
3. **Deploy**: Deploy to Vercel, Netlify, or any hosting platform
4. **Scale**: Upgrade to PostgreSQL for production use

## 🔧 Configuration

### File Size Limits
Modify `MAX_FILE_SIZE` in `.env.local`:
```env
MAX_FILE_SIZE=2147483648  # 2GB
```

### Database
For production, ensure your Supabase project is properly configured with:
- Proper RLS policies
- Storage bucket permissions
- Environment variables set correctly

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- **Netlify**: Similar to Vercel setup
- **Railway**: Great for full-stack apps
- **DigitalOcean**: App Platform or Droplet
- **AWS**: EC2 with RDS

## 🔒 Security Considerations

- Secure Supabase service role key (keep it secret!)
- Use HTTPS in production
- Implement rate limiting for uploads
- Add file scanning for malware
- Review Supabase RLS policies regularly
- Monitor storage usage and costs

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.js`
- Modify logo and branding in components
- Customize email templates

### Features
- Add QR code generation for links
- Implement file preview functionality
- Add bulk upload/download
- Create mobile app with React Native

## 📈 Future Roadmap

- [ ] QR code generation for share links
- [ ] File preview (images, PDFs, videos)
- [ ] Bulk file operations
- [ ] API access for developers
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] Custom branding for businesses
- [ ] File versioning
- [ ] Enhanced security features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: support@droplink.com (example)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Database with [Supabase](https://supabase.com/)

---

**DropLink** - Share files instantly, securely, and beautifully. ✨

