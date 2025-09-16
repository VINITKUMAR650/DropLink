# DropLink - Universal File Sharing Platform

A modern, scalable file sharing SaaS platform built with Next.js, TypeScript, and Prisma. Share files instantly with unique links - no signup required for downloads.

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
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom auth with bcrypt
- **File Handling**: Node.js file system with multer
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
   # Database
   DATABASE_URL="file:./dev.db"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
   
   # File Upload
   MAX_FILE_SIZE=1073741824
   UPLOAD_DIR="./uploads"
   
   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Create uploads directory**
   ```bash
   mkdir uploads
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
droplink/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── upload/        # File upload endpoint
│   │   └── download/      # File download endpoint
│   ├── dashboard/         # User dashboard
│   ├── download/          # File download pages
│   ├── register/          # User registration
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   └── FileUpload.tsx    # File upload component
├── lib/                  # Utility functions
│   ├── db.ts            # Database connection
│   └── utils.ts         # Helper functions
├── prisma/              # Database schema
│   └── schema.prisma    # Prisma schema
└── uploads/             # File storage directory
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

### Supported File Types
Edit the `isValidFileType` function in `lib/utils.ts` to add/remove file types.

### Database
For production, switch to PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/droplink"
```

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

- Change `NEXTAUTH_SECRET` in production
- Use HTTPS in production
- Implement rate limiting for uploads
- Add file scanning for malware
- Consider cloud storage (AWS S3, Cloudinary)
- Implement proper user authentication

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

- [ ] User authentication with NextAuth.js
- [ ] QR code generation for share links
- [ ] File preview (images, PDFs, videos)
- [ ] Bulk file operations
- [ ] API access for developers
- [ ] Mobile app
- [ ] Cloud storage integration
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] Custom branding for businesses

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
- Database with [Prisma](https://www.prisma.io/)

---

**DropLink** - Share files instantly, securely, and beautifully. ✨

