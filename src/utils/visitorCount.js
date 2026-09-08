function seedFromDateString(dateString) {
  let hash = 0;

  for (let i = 0; i < dateString.length; i += 1) {
    hash = (hash * 31 + dateString.charCodeAt(i)) % 100000;
  }

  return hash;
}

export function getTodaySeedNumber(min, max) {
  const today = new Date().toDateString();
  const seed = seedFromDateString(today);
  const range = max - min + 1;
  return min + (seed % range);
}