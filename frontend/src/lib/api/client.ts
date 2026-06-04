import { API_BASE } from "../api";
import { useAuthStore } from "../store/auth";

export class ApiError extends Error {
  constructor(public status: number, public message: string, public errors?: any) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiClient {
  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const defaultOptions: RequestInit = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    let response = await fetch(`${API_BASE}${endpoint}`, defaultOptions);

    if (response.status === 401) {
      // Try refresh
      const refreshResponse = await fetch(`${API_BASE}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (refreshResponse.ok) {
        // Retry original request
        response = await fetch(`${API_BASE}${endpoint}`, defaultOptions);
      } else {
        // Refresh failed, logout
        useAuthStore.getState().logout();
      }
    }

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "An unexpected error occurred" };
      }
      throw new ApiError(response.status, errorData.message || "Request failed", errorData.errors);
    }

    // Only attempt to parse JSON if there's content
    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();
    return data.success ? data.data : data;
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: "GET" });
  }

  async post<T>(endpoint: string, body: any, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) });
  }

  async put<T>(endpoint: string, body: any, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = new ApiClient();
