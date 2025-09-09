export function convertToSerializableObject<T extends object>(leanObject: object): T {
  return JSON.parse(JSON.stringify(leanObject));
}
