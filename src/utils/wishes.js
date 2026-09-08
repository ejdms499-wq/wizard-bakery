const WISHES_KEY = "wizardBakeryWishes";

export function getWishes() {
  try {
    const raw = localStorage.getItem(WISHES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function isWished(id) {
  return getWishes().includes(id);
}

export function toggleWish(id) {
  const current = getWishes();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];

  localStorage.setItem(WISHES_KEY, JSON.stringify(next));
  return next;
}