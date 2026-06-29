import type { LogoSettings, LogoOptions } from './types.js';
import { ANIMATED_SVG } from './animated.js';

// Zen logo: ◯ ensō — a brush-drawn circle with a deliberate gap.
// This is the brand-neutral mark. White-label products use their own brand override.
// When no brand is configured, the ensō shows — intentional, clean, not broken.

export const LOGO_SETTINGS: LogoSettings = {
  color: {
    viewBox: '0 0 100 100',
    width: 100,
    height: 100
  },
  mono: {
    strokeWidth: 11
  }
};

// ◯ — the single ensō arc, drawn as a stroked open circle with a gap
const ENSO = 'M66.22 83.26 A37 37 0 1 1 85.57 60.20';

/** Color SVG logo (white ensō stroke on transparent) */
export function getColorSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${ENSO}" fill="none" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
  </svg>`;
}

/** Monochrome SVG logo (ensō in currentColor) */
export function getMonoSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${ENSO}" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round"/>
  </svg>`;
}

/** Tightly cropped color SVG */
export function getColorSVGCropped(): string {
  return getColorSVG();
}

/** White SVG logo (for dark backgrounds) */
export function getWhiteSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${ENSO}" fill="none" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
  </svg>`;
}

/** Menu bar SVG (uses currentColor for OS theme) */
export function getMenuBarSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${ENSO}" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round"/>
  </svg>`;
}

/** Favicon SVG (white ensō on black rounded rect) */
export function getFaviconSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="12" fill="#000000"/>
    <path d="${ENSO}" fill="none" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
  </svg>`;
}

/** Get logo as data URL */
export function getLogoDataUrl(options: LogoOptions = {}): string {
  const svg = getLogo({ ...options, format: 'svg' });
  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
}

/** Get logo as base64 string */
export function getLogoBase64(options: LogoOptions = {}): string {
  const svg = getLogo({ ...options, format: 'svg' });
  return btoa(unescape(encodeURIComponent(svg)));
}

/** Get logo in requested format */
export function getLogo(options: LogoOptions = {}): string {
  const { variant = 'color', format = 'svg' } = options;
  if (variant === 'animated') {
    if (format === 'dataUrl') return getAnimatedDataUrl();
    if (format === 'base64') return btoa(unescape(encodeURIComponent(getAnimatedSVG())));
    return getAnimatedSVG();
  }

  if (format === 'dataUrl') return getLogoDataUrl({ variant });
  if (format === 'base64') return getLogoBase64({ variant });

  switch (variant) {
    case 'mono': return getMonoSVG();
    case 'white': return getWhiteSVG();
    default: return getColorSVG();
  }
}

/** Wordmark SVG — Zen's wordmark is the ensō mark itself (white) */
export function getWordmarkSVG(): string {
  return getWhiteSVG();
}

/** Wordmark with metal gradient stroke */
export function getWordmarkGradientSVG(): string {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#666666"/>
      <stop offset="30%" style="stop-color:#ffffff"/>
      <stop offset="70%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#888888"/>
    </linearGradient>
  </defs>
  <path d="${ENSO}" fill="none" stroke="url(#metalGradient)" stroke-width="11" stroke-linecap="round"/>
</svg>`;
}

// Pre-generated exports
export const logo = getColorSVG();
export const logoMono = getMonoSVG();
export const logoWhite = getWhiteSVG();
export const wordmark = getWordmarkSVG();
export const wordmarkGradient = getWordmarkGradientSVG();
export const logoDataUrl = getLogoDataUrl();
export const logoMonoDataUrl = getLogoDataUrl({ variant: 'mono' });
export const logoWhiteDataUrl = getLogoDataUrl({ variant: 'white' });

// Brand aliases
export const zenLogo = logo;
export const zenLogoMono = logoMono;
export const zenLogoWhite = logoWhite;
export const zenWordmark = wordmark;
export const zenWordmarkGradient = wordmarkGradient;
export const zenLogoDataUrl = logoDataUrl;
export const zenLogoMonoDataUrl = logoMonoDataUrl;
export const zenLogoWhiteDataUrl = logoWhiteDataUrl;

/**
 * Interactive animated mark — load (assemble) → hover (one graceful turn,
 * returns to rest) → press (squash). Pure CSS, no JS. Inline this SVG into
 * the DOM (not <img>) for the hover/press interactions to fire.
 */
export function getAnimatedSVG(): string {
  return ANIMATED_SVG;
}

/** Animated mark as a data: URL (load animation runs even in <img>). */
export function getAnimatedDataUrl(): string {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(ANIMATED_SVG)));
}

export const zenLogoAnimated = ANIMATED_SVG;
export const zenLogoAnimatedDataUrl = getAnimatedDataUrl();
