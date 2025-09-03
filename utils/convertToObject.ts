export function convertToSerializableObject<T extends {}>(
  leanObject: object,
): T {
  return JSON.parse(JSON.stringify(leanObject));
}
