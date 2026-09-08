const NOTIFY_KEY = "wizardBakeryNotifyRequests";

export function getNotifyRequests() {
  try {
    const raw = localStorage.getItem(NOTIFY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function isNotifying(id) {
  return getNotifyRequests().includes(id);
}

export function toggleNotify(id) {
  const current = getNotifyRequests();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];

  localStorage.setItem(NOTIFY_KEY, JSON.stringify(next));
  return next;
}