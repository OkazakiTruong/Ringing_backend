export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[] | K,
): Omit<T, K> {
  const keysToOmit = Array.isArray(keys) ? keys : [keys];
  const result = { ...obj };

  for (const key of keysToOmit) {
    delete result[key];
  }

  return result;
}
