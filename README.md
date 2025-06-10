# School Reunion Website - Class of 2022

A comprehensive reunion website built with Next.js, Firebase, and Razorpay integration for the 10th Class Batch of 2022.

## 🚀 Features

- **Beautiful Landing Page**: Hero section with countdown timer and event details
- **Progressive Registration**: Multi-step form with validation
- **Secure Payments**: Razorpay integration for seamless transactions
- **Photo Upload**: Drag-and-drop photo upload for return gifts
- **Admin Dashboard**: Complete management system for registrations
- **WhatsApp Integration**: Direct group joining and sharing
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Payment**: Razorpay integration
- **Validation**: Formik + Yup
- **Security**: reCAPTCHA, input sanitization

## 📋 Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd school-reunion-website
npm install
```

### 2. Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database, Storage, and Authentication
3. Add Email/Password authentication provider
4. Copy your Firebase config and add to `.env.local`

### 3. Razorpay Setup
1. Create account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your API keys and add to `.env.local`
3. Configure webhooks for payment verification

### 4. reCAPTCHA Setup
1. Get keys from [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Add site key and secret to `.env.local`

### 5. Environment Variables
Create `.env.local` file with the following variables:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
```

### 6. Run Development Server
```bash
npm run dev
```

## 🔐 Admin Access

1. Create an admin user in Firebase Authentication
2. Navigate to `/admin`
3. Login with admin credentials
4. Manage all registrations, payments, and photos

## 📱 Features Overview

### Home Page (/)
- Hero section with countdown timer
- Event information cards
- Timeline of event activities
- Food menu carousel
- Dress code information
- Call-to-action buttons

### Registration Flow
- `/register` - Personal details form with validation
- `/payment` - Razorpay payment integration
- `/photo-upload` - Drag-and-drop photo upload
- `/success` - Confirmation with ticket download

### Admin Dashboard (/admin)
- Registration statistics
- Search and filter functionality
- Payment status management
- Photo preview
- CSV export functionality

## 🔒 Security Features

- Input sanitization and validation
- reCAPTCHA spam protection
- Firebase security rules
- HTTPS-only cookies
- XSS protection
- CSRF protection

## 🎨 Design Features

- Modern gradient design
- Responsive layout
- Smooth animations
- Interactive components
- Professional typography
- Accessible color scheme

## 📧 Contact

For any issues or questions regarding the reunion website, please contact the organizing committee.

---

Made with ❤️ for the Class of 2022 Reunion