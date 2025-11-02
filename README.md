# Cloud Notes

A full-stack note-taking application with authentication using React, Express, and Firebase.

## Project Structure

\`\`\`
cloud-notes/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── contexts/      # React contexts
│   │   └── config/        # Configuration files
│   └── package.json
│
└── server/                # Backend Express application
    ├── src/
    │   ├── routes/        # API route definitions
    │   ├── controllers/   # Request handlers
    │   ├── services/      # Business logic & Firestore communication
    │   ├── middleware/    # Custom middleware
    │   └── config/        # Configuration files
    └── package.json
\`\`\`

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Firebase project with Firestore and Authentication enabled

### Backend Setup

1. Navigate to the server directory:
   \`\`\`bash
   cd server
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file based on `.env.example` and add your Firebase Admin SDK credentials

4. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Frontend Setup

1. Navigate to the client directory:
   \`\`\`bash
   cd client
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Update `src/config/firebase.config.js` with your Firebase project configuration

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Features

- User authentication (login/register) with Firebase Auth
- Create, read, update, and delete notes
- Dark theme with bright blue accents
- Secure API with JWT token verification
- Firestore database integration

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify user token

### Notes
- `GET /api/notes` - Get all user notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS, Firebase Client SDK
- **Backend**: Express, Firebase Admin SDK, Firestore
- **Authentication**: Google Cloud Identity Platform (Firebase Auth)
