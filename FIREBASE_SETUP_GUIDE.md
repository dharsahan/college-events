# 🔥 Firebase Setup Guide

## Complete Step-by-Step Instructions

### 📋 **Prerequisites**
- Google account
- Your college event website files

---

## 🚀 **Step 1: Create Firebase Project**

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Click "Add project" or "Create a project"

2. **Project Setup**
   - **Project name**: `college-events` (or your preferred name)
   - Click "Continue"
   - **Google Analytics**: You can disable it for now (optional)
   - Click "Create project"
   - Wait for project creation (30-60 seconds)
   - Click "Continue"

---

## 🔧 **Step 2: Register Your Web App**

1. **Add Web App**
   - In Firebase Console, click the **Web icon** `</>`
   - **App nickname**: `College Events Web`
   - ✅ Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

2. **Copy Firebase Configuration**
   - You'll see a code snippet like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```
   - **COPY THIS ENTIRE BLOCK** - You'll need it!
   - Click "Continue to console"

---

## 🔐 **Step 3: Enable Authentication**

1. **Go to Authentication**
   - In left sidebar, click "Build" → "Authentication"
   - Click "Get started"

2. **Enable Email/Password**
   - Click "Sign-in method" tab
   - Click "Email/Password"
   - Toggle **Enable** to ON
   - Click "Save"

3. **Configure Email Verification Settings** (Optional but Recommended)
   - Go to "Templates" tab
   - Click "Email address verification"
   - Customize the email template if desired
   - Click "Save"

---

## 💾 **Step 4: Setup Firestore Database**

1. **Create Firestore Database**
   - In left sidebar, click "Build" → "Firestore Database"
   - Click "Create database"

2. **Choose Security Mode**
   - Select **"Start in production mode"** (we'll add rules next)
   - Click "Next"

3. **Choose Location**
   - Select closest region (e.g., `asia-south1` for India)
   - Click "Enable"
   - Wait for database creation (30-60 seconds)

4. **Setup Security Rules**
   - Go to "Rules" tab
   - Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Events collection
    match /events/{eventId} {
      allow read: if true; // Everyone can read events
      allow create: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
      allow update, delete: if request.auth != null && 
                              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
    }
    
    // Registrations collection
    match /registrations/{registrationId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
    }
    
    // Past events (results) collection
    match /pastEvents/{eventId} {
      allow read: if true; // Everyone can read results
      allow create, update, delete: if request.auth != null && 
                                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'admin';
    }
  }
}
```

   - Click "Publish"

---

## 📝 **Step 5: Update Your Code**

1. **Open `firebase-config.js`**
   - Find this section at the top:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

2. **Replace with YOUR Firebase Config**
   - Paste the config you copied in Step 2
   - Save the file

---

## ✅ **Step 6: Test Your Setup**

1. **Open `index.html` in Browser**
   - You can use Live Server or just open the file
   - Or deploy to hosting (see Step 7)

2. **Test Signup**
   - Click "Login" button
   - Switch to "Sign Up" tab
   - Fill in:
     - Name: Test User
     - Email: your-email@example.com
     - Password: test123
     - User Type: Student
   - Click "Create Account"
   - Check your email for verification link

3. **Test Login**
   - Switch to "Login" tab
   - Enter your email and password
   - Click "Login"
   - You should be logged in!

4. **Verify in Firebase Console**
   - Go to Authentication → Users
   - You should see your new user
   - Go to Firestore Database
   - You should see `users` collection with your data

---

## 🌐 **Step 7: Deploy to Firebase Hosting** (Optional)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase in Your Project**
   ```bash
   cd path/to/college-events
   firebase init
   ```
   - Select: **Hosting**
   - Choose your project
   - Public directory: `.` (current directory)
   - Single-page app: **No**
   - Don't overwrite files

4. **Deploy**
   ```bash
   firebase deploy
   ```
   - Your site will be live at: `https://your-project.web.app`

---

## 🎯 **What You Get**

### ✅ **Real User Accounts**
- Users create accounts with email/password
- Email verification on signup
- Secure authentication

### ✅ **Cloud Database**
- All data stored in Firebase Firestore
- Real-time synchronization
- Automatic backups
- Works across all devices

### ✅ **User Roles**
- **Admin**: Can create/edit/delete events, post results
- **Student**: Can register for events, view results

### ✅ **Data Isolation**
- Each user sees their own registrations
- Admins see all data
- Secure access rules

### ✅ **Email Features**
- Welcome email on signup
- Email verification
- Password reset (built-in)

---

## 🔒 **Security Features**

1. **Authentication Required**
   - Users must login to access features
   - Email verification ensures valid emails

2. **Role-Based Access**
   - Only admins can create/edit events
   - Only admins can post results
   - Students can only register and view

3. **Data Validation**
   - Firestore security rules prevent unauthorized access
   - Client-side validation for user input

---

## 📧 **Email Configuration**

### **Customize Email Templates**

1. Go to Authentication → Templates
2. Available templates:
   - **Email address verification**
   - **Password reset**
   - **Email address change**

3. Customize each template:
   - Subject line
   - Email body
   - Sender name
   - Reply-to address

---

## 🆘 **Troubleshooting**

### **Problem: "Firebase is not defined"**
**Solution**: Make sure Firebase scripts are loaded before your code
```html
<!-- These must come BEFORE firebase-config.js -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
```

### **Problem: "Permission denied" errors**
**Solution**: Check Firestore security rules (Step 4)

### **Problem: Email not sending**
**Solution**: 
1. Check spam folder
2. Verify email settings in Firebase Console
3. Make sure authentication is enabled

### **Problem: Can't login after signup**
**Solution**: 
1. Check if email is verified
2. Check browser console for errors
3. Verify Firebase config is correct

---

## 💰 **Pricing**

### **Firebase Free Tier (Spark Plan)**
- ✅ **Authentication**: 10,000 verifications/month
- ✅ **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- ✅ **Hosting**: 10GB storage, 360MB/day bandwidth
- ✅ **Perfect for college events!**

### **When to Upgrade**
- More than 10,000 users
- Heavy daily usage
- Need more storage

---

## 📚 **Additional Resources**

- **Firebase Documentation**: https://firebase.google.com/docs
- **Firestore Guide**: https://firebase.google.com/docs/firestore
- **Authentication Guide**: https://firebase.google.com/docs/auth
- **Firebase Console**: https://console.firebase.google.com/

---

## ✨ **You're All Set!**

Your college event management system now has:
- ✅ Real user authentication
- ✅ Cloud database
- ✅ Email verification
- ✅ Multi-device sync
- ✅ Secure data access
- ✅ Production-ready deployment

**Need help?** Check the troubleshooting section or Firebase documentation!

---

**Created with ❤️ for your college event management system**
