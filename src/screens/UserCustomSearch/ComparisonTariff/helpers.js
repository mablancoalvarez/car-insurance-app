const sameValue = (left, right) =>
  JSON.stringify(left) === JSON.stringify(right);

const withoutEqualFields = (source, other) =>
  Object.fromEntries(
    Object.entries(source).filter(
      ([key, value]) => !sameValue(value, other?.[key])
    )
  );

export function diffTariffs(left, right) {
  return [withoutEqualFields(left, right), withoutEqualFields(right, left)];
};
