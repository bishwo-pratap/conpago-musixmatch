const apiUrl = 'http://localhost:3000/v1';

interface ApiHelperOptions {
  method?: string;
  headers?: { [key: string]: string };
  body?: any;
}

export const ApiHelper = async <T>(endpoint: string, options: ApiHelperOptions = {}): Promise<T> => {
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  return response.json();
};
