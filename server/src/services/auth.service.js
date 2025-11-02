import { auth, db } from "../config/authConfig.js"

const USERS_COLLECTION = "users"

export const registerUser = async (email, password, username) => {
  // Create user in Firebase Auth
  const userRecord = await auth.createUser({
    email,
    password,
    displayName: username,
  })

  // TODO: Implement password encryption here before storing
  // Example: const encryptedPassword = await bcrypt.hash(password, 10);

  // Store user data in Firestore
  const userData = {
    username,
    email,
    password: password, // TODO: Replace with encrypted password
    createdAt: new Date().toISOString(),
  }

  await db.collection(USERS_COLLECTION).doc(userRecord.uid).set(userData)

  return {
    uid: userRecord.uid,
    email: userRecord.email,
    username,
  }
}

export const getUserById = async (userId) => {
  const userRef = db.collection(USERS_COLLECTION).doc(userId)
  const doc = await userRef.get()

  if (!doc.exists) {
    throw new Error("User not found")
  }

  const userData = doc.data()

  // Don't return password
  delete userData.password

  return { uid: userId, ...userData }
}
