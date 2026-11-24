const sameValue = (left: unknown, right: unknown): boolean =>
  JSON.stringify(left) === JSON.stringify(right);

const withoutEqualFields = <T extends object>(
  source: T,
  other: T
): Partial<T> => {
  const otherRecord = other as Record<string, unknown>;
  // Object.fromEntries does not preserve the source property types.
  return Object.fromEntries(
    Object.entries(source).filter(
      ([key, value]) => !sameValue(value, otherRecord[key])
    )
  ) as Partial<T>;
};

export function diffTariffs<T extends object>(
  left: T,
  right: T
): [Partial<T>, Partial<T>] {
  return [withoutEqualFields(left, right), withoutEqualFields(right, left)];
}
