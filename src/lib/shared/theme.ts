const STORAGE_KEY = 'theme';
const DARK_CLASS = 'dark';

export function getStoredTheme(): 'light' | 'dark' | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return null;
}

export function getPreferredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export function getInitialTheme(): 'light' | 'dark' {
  return getStoredTheme() || getPreferredTheme();
}

export function applyTheme(theme: 'light' | 'dark'): void {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function isDarkMode(): boolean {
  return document.documentElement.classList.contains(DARK_CLASS);
}

export function toggleTheme(): void {
  const current = isDarkMode() ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

export function setupTheme(): void {
  const theme = getInitialTheme();
  applyTheme(theme);
}

export function onThemeChange(callback: (isDark: boolean) => void): () => void {
  const observer = new MutationObserver(() => {
    callback(isDarkMode());
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}