import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://ubuxa.skillzserver.com/api/v1"

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)