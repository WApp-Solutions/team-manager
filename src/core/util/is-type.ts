type KeyStructure = { readonly [key: string]: string };

export const isType = <T>(objectToTest: T, keys: KeyStructure): objectToTest is T => {
  let success = false;
  let atLeastOneMissing = false;

  Object.values(keys).forEach((k) => {
    success = objectToTest[k as keyof typeof objectToTest] !== undefined;
    if (!success) atLeastOneMissing = true;
  });

  return success && !atLeastOneMissing;
};
