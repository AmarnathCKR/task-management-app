import type { PaletteOptions } from '@mui/material/styles';
import type { ThemeMode } from './themeConfig';

export const getPalette = (mode: ThemeMode): PaletteOptions => ({
  mode,
  ...(mode === 'light'
    ? {
        primary: { main: '#2563eb', light: '#60a5fa', dark: '#1e40af' },
        secondary: { main: '#7c3aed', light: '#a78bfa', dark: '#5b21b6' },
        background: { default: '#f8fafc', paper: '#ffffff' },
        text: { primary: '#1e293b', secondary: '#64748b' },
      }
    : {
        primary: { main: '#60a5fa', light: '#93c5fd', dark: '#3b82f6' },
        secondary: { main: '#a78bfa', light: '#c4b5fd', dark: '#8b5cf6' },
        background: { default: '#0f172a', paper: '#1e293b' },
        text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
      }),
});
