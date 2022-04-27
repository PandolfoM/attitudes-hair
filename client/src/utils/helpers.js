export function firstLetter(name) {
  const letter = name.slice(0, 1);
  return letter;
}

export function capsFirst(str) {
  const capitalStr = str.replace(/^\w/, (c) => c.toUpperCase());
  return capitalStr;
}
