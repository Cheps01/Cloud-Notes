const API_BASE_URL = "/api"

class ApiService {
  constructor() {
    this.getToken = null
  }

  setTokenGetter(getTokenFn) {
    this.getToken = getTokenFn
  }

  async request(endpoint, options = {}) {
    const token = this.getToken ? await this.getToken() : null

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong")
    }

    return data
  }

  // Notes endpoints
  async getNotes() {
    return this.request("/notes")
  }

  async getNoteById(id) {
    return this.request(`/notes/${id}`)
  }

  async createNote(title, content) {
    return this.request("/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    })
  }

  async updateNote(id, title, content) {
    return this.request(`/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    })
  }

  async deleteNote(id) {
    return this.request(`/notes/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiService = new ApiService()
export default apiService
