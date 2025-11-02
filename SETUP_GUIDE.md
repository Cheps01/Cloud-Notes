# Cloud Notes - Complete Setup Guide

## Overview
Cloud Notes is a full-stack note-taking application with authentication using React, Express, Firebase Authentication, and Firestore.

## Prerequisites
- Node.js v18 or higher
- npm or yarn
- A Google Cloud/Firebase account

## Firebase Setup

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Name your project (e.g., "cloud-notes")

### 2. Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Click "Save"

### 3. Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" (we'll add security rules later)
4. Select a location close to your users
5. Click "Enable"

### 4. Add Security Rules (Important!)
In Firestore Database > Rules, replace with:

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only read/write their own notes
    match /notes/{noteId} {
      allow read, write: if request.auth != null && 
                           resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && 
                      request.resource.data.userId == request.auth.uid;
    }
  }
}
\`\`\`

### 5. Get Firebase Client Configuration
1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app with a nickname (e.g., "cloud-notes-web")
5. Copy the firebaseConfig object

### 6. Get Firebase Admin SDK Credentials
1. In Firebase Console, go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely (DO NOT commit to git)

## Backend Setup

### 1. Navigate to Server Directory
\`\`\`bash
cd server
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Configure Environment Variables
Create a \`.env\` file in the server directory:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` and add your Firebase Admin SDK credentials from the JSON file you downloaded:

\`\`\`env
PORT=3001

FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk%40your-project-id.iam.gserviceaccount.com
\`\`\`

**Important:** Make sure to escape newlines in the private key with \`\\n\`

### 4. Start the Server
\`\`\`bash
npm run dev
\`\`\`

The server should start on http://localhost:3001

## Frontend Setup

### 1. Navigate to Client Directory
\`\`\`bash
cd client
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Configure Firebase Client
Edit \`src/config/firebase.config.js\` and replace the placeholder values with your Firebase client configuration:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
\`\`\`

### 4. Start the Development Server
\`\`\`bash
npm run dev
\`\`\`

The app should open at http://localhost:3000

## Testing the Application

### 1. Register a New User
1. Navigate to http://localhost:3000
2. Click "Sign up"
3. Enter username, email, and password
4. Click "Create Account"

### 2. Create Notes
1. After logging in, you'll be redirected to the dashboard
2. Click "New Note" to create a note
3. Edit the title and content
4. Changes are auto-saved on blur

### 3. Manage Notes
- Click on notes in the sidebar to view/edit them
- Click "Delete" to remove a note (with confirmation)
- Click "Logout" to sign out

## Troubleshooting

### CORS Errors
Make sure the backend server is running on port 3001 and the frontend proxy is configured correctly in \`vite.config.js\`.

### Authentication Errors
- Verify Firebase Authentication is enabled in Firebase Console
- Check that your Firebase client config is correct
- Ensure the Firebase Admin SDK credentials are properly set in the backend

### Firestore Permission Errors
- Make sure you've added the security rules in Firestore
- Verify that the \`userId\` field is being set correctly on notes

### Connection Errors
- Ensure both frontend (port 3000) and backend (port 3001) are running
- Check that there are no firewall issues blocking the ports

## Production Deployment

### Backend
1. Set up environment variables on your hosting platform
2. Ensure the Firebase Admin SDK credentials are securely stored
3. Update CORS settings to allow your frontend domain

### Frontend
1. Update the API base URL in \`api.service.js\` to point to your production backend
2. Build the production bundle: \`npm run build\`
3. Deploy the \`dist\` folder to your hosting platform

## Security Notes

- Never commit \`.env\` files or Firebase credentials to version control
- Always use HTTPS in production
- Implement rate limiting on the backend API
- Regularly update dependencies for security patches
- Consider implementing password encryption with bcrypt (see TODO comments in code)

## Additional Features to Consider

- Rich text editing
- Note categories/tags
- Search functionality
- Note sharing
- Dark/light theme toggle
- Mobile responsive design improvements
- Offline support with service workers
\`\`\`
