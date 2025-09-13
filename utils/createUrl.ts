export function createUrl<T extends Record<string, string | number>>(
  template: string,
  params: T,
): string {
  return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    const value = params[key];
    if (value === undefined) {
      throw new Error(`Missing parameter: ${key}`);
    }
    return encodeURIComponent(String(value));
  });
}
