export const mergeConsideringFirstKey = <T>(
  list1: T[],
  list2: T[],
  key: keyof T,
) => {
  if (!list2.length || !list1.length) return list1 ?? [];

  const hasDuplicatedElements = list1.some((q) => q[key] === list2[0][key]);

  if (hasDuplicatedElements) {
    return list1;
  }

  return [...list1, ...list2];
};
