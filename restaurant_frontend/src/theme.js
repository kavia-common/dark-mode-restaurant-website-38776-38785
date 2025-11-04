//
// Theme utilities for Ocean Professional dark/light mode
//

// PUBLIC_INTERFACE
export const OCEAN_THEME = {
  light: {
    name: 'light',
    // Ocean Professional palette
    primary: '#2563EB', // blue-600
    secondary: '#F59E0B', // amber-500
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    gradientFrom: 'rgba(37, 99, 235, 0.08)', // from blue-500/10
    gradientTo: '#F9FAFB', // to gray-50
    shadow: '0 10px 30px rgba(0,0,0,0.06)',
  },
  dark: {
    name: 'dark',
    primary: '#60A5FA', // lighter blue for dark backgrounds
    secondary: '#FBBF24', // amber-400
    success: '#FBBF24',
    error: '#F87171',
    background: '#0B1220', // deep blue-ish
    surface: '#111827', // gray-900
    text: '#F9FAFB',
    mutedText: '#9CA3AF',
    border: '#1F2937',
    gradientFrom: 'rgba(96, 165, 250, 0.10)',
    gradientTo: '#0B1220',
    shadow: '0 10px 30px rgba(0,0,0,0.35)',
  },
};

// Apply CSS variables to :root for the selected theme
// PUBLIC_INTERFACE
export function applyTheme(mode = 'light') {
  const theme = OCEAN_THEME[mode] || OCEAN_THEME.light;
  const r = document.documentElement;

  r.setAttribute('data-theme', theme.name);

  r.style.setProperty('--clr-primary', theme.primary);
  r.style.setProperty('--clr-secondary', theme.secondary);
  r.style.setProperty('--clr-success', theme.success);
  r.style.setProperty('--clr-error', theme.error);

  r.style.setProperty('--bg', theme.background);
  r.style.setProperty('--surface', theme.surface);
  r.style.setProperty('--text', theme.text);
  r.style.setProperty('--muted-text', theme.mutedText);
  r.style.setProperty('--border', theme.border);

  r.style.setProperty('--gradient-from', theme.gradientFrom);
  r.style.setProperty('--gradient-to', theme.gradientTo);

  r.style.setProperty('--shadow', theme.shadow);
}

// PUBLIC_INTERFACE
export function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (_) {
    // ignore
  }
  // Prefer system preference if no saved theme
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

// PUBLIC_INTERFACE
export function persistTheme(mode) {
  try {
    localStorage.setItem('theme', mode);
  } catch (_) {
    // ignore storage errors
  }
}
