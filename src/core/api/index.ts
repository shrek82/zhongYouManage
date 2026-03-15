// API Client Configuration Placeholder
// You can use axios or fetch here to configure your base API client.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

export const fetcher = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
};
