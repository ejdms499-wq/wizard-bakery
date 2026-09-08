const SUB_KEY = "wizardBakerySubscription";

export function getSubscription() {
  try {
    const raw = localStorage.getItem(SUB_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

export function subscribe(name) {
  const data = {
    name,
    subscribedAt: new Date().toISOString(),
  };
  localStorage.setItem(SUB_KEY, JSON.stringify(data));
  return data;
}

export function unsubscribe() {
  localStorage.removeItem(SUB_KEY);
}

export function getNextAssignmentMonthLabel() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return `${next.getMonth() + 1}월`;
}