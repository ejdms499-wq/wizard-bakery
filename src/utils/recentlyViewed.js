const RECENT_KEY = "wizardBakeryRecentlyViewed";
const MAX_RECENT = 8;

export function getRecentlyViewed() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function addRecentlyViewed(id) {
  const current = getRecentlyViewed().filter((item) => item !== id);
  const next = [id, ...current].slice(0, MAX_RECENT);

  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
}