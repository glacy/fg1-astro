const MOBILE_BREAKPOINT = 1024;

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export function onMobileChange(callback: (isMobile: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

  const onChange = () => {
    callback(window.innerWidth < MOBILE_BREAKPOINT);
  };

  mql.addEventListener('change', onChange);
  callback(window.innerWidth < MOBILE_BREAKPOINT);

  return () => mql.removeEventListener('change', onChange);
}