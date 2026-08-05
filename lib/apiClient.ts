/**
 * Centralized API Client for AcademySphere.
 * Handles:
 * - Request cancellation (AbortController)
 * - Error normalization
 * - Tenant header injection
 * - Deduplication for identical concurrent requests
 */

interface RequestOptions extends RequestInit {
  timeout?: number;
  tenantId?: string;
}

export class ApiClient {
  private static pendingRequests = new Map<string, Promise<any>>();

  /**
   * Helper to construct default headers
   */
  private static getHeaders(options?: RequestOptions): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Inject tenant header if provided (in a real app, this might come from auth context/session)
    if (options?.tenantId) {
      headers['X-Tenant-ID'] = options.tenantId;
    }

    return { ...headers, ...options?.headers };
  }

  /**
   * Core fetch wrapper with timeout, cancellation, and error handling
   */
  static async request<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const { timeout = 8000, ...fetchOptions } = options || {};
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(endpoint, {
        ...fetchOptions,
        headers: this.getHeaders(options),
        signal: fetchOptions.signal || controller.signal,
      });

      clearTimeout(id);

      if (!response.ok) {
        let errorMsg = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {
          // Ignore json parse errors for non-json responses
        }
        throw new Error(errorMsg);
      }

      // 204 No Content handling
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json() as T;
    } catch (error: any) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out or was cancelled');
      }
      throw error;
    }
  }

  /**
   * Deduplicated GET request.
   * If a GET request to the same endpoint is already in flight, returns the existing promise.
   */
  static async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const key = `GET_${endpoint}_${options?.tenantId || 'global'}`;
    
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key) as Promise<T>;
    }

    const promise = this.request<T>(endpoint, { ...options, method: 'GET' })
      .finally(() => {
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  static async post<T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async put<T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}
