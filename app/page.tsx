export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Cloud Notes Application</h1>
        <p className="mb-4 text-gray-600">This is a full-stack notes application with Firebase authentication.</p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>
            • Client app is located in the <code className="rounded bg-gray-100 px-1 py-0.5">/client</code> directory
          </p>
          <p>
            • Server API is in the <code className="rounded bg-gray-100 px-1 py-0.5">/server</code> directory
          </p>
          <p>
            • Run the client with <code className="rounded bg-gray-100 px-1 py-0.5">npm run dev</code> from the client
            folder
          </p>
        </div>
      </div>
    </div>
  )
}
