export function getRawEnv() {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  } as Record<string, string | undefined>;
}
