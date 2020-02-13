

export function findMinInObject<T, P extends keyof T>(objectArray: T[], key: P): T | undefined {
  if (objectArray.length === 0) {
    return undefined;
  }

  return objectArray.reduce((minObject, current) => current[key] < minObject[key] ? current : minObject, objectArray[0]);
}
