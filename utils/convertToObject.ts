export function convertToSerializableObject<T>(leanObject: object): T {
  return JSON.parse(JSON.stringify(leanObject));
}
