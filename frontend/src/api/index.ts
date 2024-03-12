import { routesConfig } from "@/config";

interface ApiHelperOptions {
  method?: string;
  headers?: { [key: string]: string };
  body?: any;
}

export const ApiHelper = async <T>(endpoint: string, options: ApiHelperOptions = {}): Promise<T> => {
  const { baseUrl } = routesConfig;
  const response = await fetch(`${baseUrl}/${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  return response.json();
};
